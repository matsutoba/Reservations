import React, { useState, useEffect } from 'react';

import { getReservations } from '../../apis/reservations';
import { useQuery } from 'react-query';
import ListReservations from './ListReservations';
import EditReservation from './EditReservation';
import { ScreenMode } from '../../types/Const';

const Reservation = () => {
    const [mode, setMode] = useState(ScreenMode.List);

    const [reservationDate, setReservationDate] = useState('20201230');
    const [reservationId, setReservationId] = useState(0);
    const reservations = useQuery(['reservations', reservationDate], ()=>getReservations(reservationDate));

    const handleReturn = () => {
        setMode(ScreenMode.List);
    }

    const handleScreenMode = (mode: ScreenMode) => {
        setMode(mode);
    }

    const handleEdit = (reservationId: number) => {
        setReservationId(reservationId);
        setMode(ScreenMode.Edit);
    }

    return (
        <div className='content'>

            <div className='reservations'>
                <h2>予約</h2>
                {(()=>{
                    switch (mode) {
                        case ScreenMode.List:
                            return <ListReservations handleEdit={handleEdit}/>
                        case ScreenMode.Edit:
                            return <EditReservation reservationId={reservationId} handleReturn={() => handleScreenMode(ScreenMode.List) }/>
                        default:
                            return null;
                    }
                })()}
            </div>
        </div>
    );
}

export default Reservation;