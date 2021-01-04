import React, { useState, useEffect } from 'react';

import { getReservations } from '../../apis/reservations';
import { useQuery } from 'react-query';
import ListReservations from './ListReservations';
import NewReservation from './NewReservation';

enum ScreenMode {
    List = 0,
    Edit = 1,
}

const Reservation = () => {
    const [mode, setMode] = useState(ScreenMode.List);

    const [reservationDate, setReservationDate] = useState('20201230');
    const reservations = useQuery(['reservations', reservationDate], ()=>getReservations(reservationDate));

    const handleScreenMode = (mode: ScreenMode) => {
        setMode(mode);
    }

    return (
        <div className='content'>

            <div className='reservations'>
                <h2>予約</h2>
                {(()=>{
                    switch (mode) {
                        case ScreenMode.List:
                            return <ListReservations handleScreenMode={() => handleScreenMode(ScreenMode.Edit) }/>
                        case ScreenMode.Edit:
                            return <NewReservation handleScreenMode={() => handleScreenMode(ScreenMode.List) }/>
                        default:
                            return null;
                    }
                })()}
            </div>
        </div>
    );
}

export default Reservation;