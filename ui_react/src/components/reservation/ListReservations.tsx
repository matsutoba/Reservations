import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { getReservations } from '../../apis/reservations';
import { useQuery } from 'react-query';

type itsPorps = {
    handleScreenMode: () => void;
}

const ListReservations = (props: itsPorps) => {
    const { handleScreenMode } = props;


    const [reservationDate, setReservationDate] = useState( dayjs().format('YYYY-MM-DD') );
    const reservations = useQuery(['reservations', reservationDate], ()=>getReservations(reservationDate));

    const handleReservationDateChange = (e) => {
        setReservationDate( e.target.value );
    }

    return (
        <div>
            <button className="btn" onClick={handleScreenMode}>新規予約</button>
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
                    { reservations.data?.data.map(e => {
                        return (
                            <tr>
                                <td>{e.name}</td>
                                <td>{e.startTime}</td>
                                <td>{e.facilityName}</td>
                                <td><button className='btn'>詳細</button></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListReservations;