import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { getReservations } from '../../apis/reservations';
import { useQuery } from 'react-query';

type itsPorps = {
    handleEdit: (reservationId: number) => void;
}

const ListReservations = (props: itsPorps) => {
    const { handleEdit } = props;


    const [reservationDate, setReservationDate] = useState( dayjs().format('YYYY-MM-DD') );
    const reservations = useQuery(['reservations', reservationDate], ()=>getReservations(reservationDate));

    const handleReservationDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReservationDate( e.target.value );
    }

    useEffect(()=>{
        console.log(reservations)
    }, [reservations])

    return (
        <div>
            <button className="btn" onClick={() => handleEdit(0)}>新規予約</button>
            <div className='list'>
                <input type='date' value={reservationDate} onChange={handleReservationDateChange} />
                <table>
                    <thead>
                        <tr>
                        <th className='time'>予約時間</th>
                        <th className='item'>お客様名</th>
                        <th className='item'>施設名</th>
                        <th className='item'></th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                    reservations.data?.data.map(e => {
                        return (
                            <tr key={`r${e.reservationId}`}>
                                <td>{e.name}</td>
                                <td>{e.startTime}</td>
                                <td>{e.facilityName}</td>
                                <td><button className='btn' onClick={() => handleEdit(e.reservationId)}>詳細</button></td>
                            </tr>
                        )
                    })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListReservations;