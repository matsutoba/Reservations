import React, { useState, useEffect, useRef } from 'react';

import { getCustomers, patchReservation, postReservation } from '../../apis/customers';
import { getFacilities } from '../../apis/facilities';
import { getTimeFrames } from '../../apis/timeframes';

import { useQuery, QueryClient, useMutation } from 'react-query';
import { ReservationResponse } from '../../types/Reservation';
import { deleteReservation } from '../../apis/customers';
import { getReservation } from '../../apis/reservations';
import dayjs from 'dayjs';

type itsPorps = {
    reservationId: number;
    handleReturn: () => void;
}

const queryClient = new QueryClient();

const EditReservation = (props: itsPorps) => {
    const { reservationId, handleReturn } = props;

    console.log(props);

    /* customers */
    const refCustomer = useRef<HTMLSelectElement>(null);
    const [customerId, setCustomerId] = useState(0);
    const customers = useQuery('customers', getCustomers);
    const handleCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCustomerId(Number(e.target.value));
    }
    useEffect(()=>{
        if (refCustomer.current && customers.data ) {
            console.log("selected customer")
            refCustomer.current.selectedIndex = customers.data.data.findIndex(e => e.customerId === customerId) + 1;
        }
    },[customerId]);

    /* facilities */
    const refFacility = useRef<HTMLSelectElement>(null);
    const [facilityId, setFacilityId] = useState(0);
    const facilities = useQuery('facilitiess', getFacilities);
    const handleFacilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFacilityId(Number(e.target.value));
    }
    useEffect(()=>{
        if (refFacility.current && facilities.data) {
            refFacility.current.selectedIndex = facilities.data.data.findIndex(e => e.id === facilityId) + 1;
        }
    }, [facilityId]);

    /* reservationDate */
    const [reservationDate, setReservationDate] = useState('');
    const handleReservationDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReservationDate(e.target.value);
    }

    /* timeframes */
    const refTimeFrame = useRef<HTMLSelectElement>(null);
    const [timeFrameId, setTimeFrameId] = useState(0);
    const timeframes = useQuery(['timeframes', facilityId], () => getTimeFrames(facilityId));
    const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTimeFrameId(Number(e.target.value));
    }
    useEffect(()=>{
    }, [timeFrameId]);

    useEffect(()=>{
        if (refTimeFrame.current && timeframes.data) {
            refTimeFrame.current.selectedIndex = timeframes.data.data.findIndex(e => e.timeFrameId === timeFrameId) + 1;
        }
    },[timeframes]);


    /* reservation : 編集時に reservationId から取得 */
    const reservation = useQuery(
        ['reservation', reservationId], 
        () => getReservation(reservationId),
        {
            enabled: reservationId>0   // 編集用にIDが指定されているときは自動でクエリ実行
        });
    useEffect(() => {
        if (reservation.data) {
            const r = reservation.data.data;
            console.log(r);
            setCustomerId(r.customerId);
            setFacilityId(r.timeFrame.frame.facilityId);
            setReservationDate(dayjs(r.reservationDate, 'YYYYMMDD').format('YYYY-MM-DD'));
            setTimeFrameId(r.timeFrameId);
        }
    }, [reservation])

    /* 保存 */
    const mutation = useMutation(
        reservationId > 0 ? patchReservation : postReservation,
        {
            onSuccess: (data, veriables, context) => {
                queryClient.invalidateQueries('reservations');
                handleReturn();
            }
        }
    );
    const handleSaveReservation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const request = {
            reservationId: reservationId,
            customerId: customerId,
            reservationDate: reservationDate,
            timeFrameId: timeFrameId,
        }
        mutation.mutate(request);
    }
    
    /* 削除 */
    const deleteMutation = useMutation(
        deleteReservation,
        {
            onSuccess: (data, veriables, context) => {
                queryClient.invalidateQueries('reservations');
                handleReturn();
            }
        }
    );
    const handleDeleteReservation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const request = {
            reservationId: reservationId,
            customerId: customerId,
            reservationDate: reservationDate,
            timeFrameId: timeFrameId,
        }
        deleteMutation.mutate(request);
    }

    return (
        <div className='content'>
            <div className='edit'>
                <table>
                    <tbody>
                        <tr>
                            <th>お客様</th>
                            <td>
                                <select ref={refCustomer} id='customer' onChange={handleCustomerChange}>
                                    <option>選択してください</option>
                                    {
                                        customers.data?.data.map(e => {
                                            return <option key={`c${e.customerId}`} value={e.customerId}>{e.customerId} - {e.name}</option>
                                        })
                                    }
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>施設</th>
                            <td>
                                <select ref={refFacility} id='facility' onChange={handleFacilityChange}>
                                        <option>選択してください</option>
                                        {
                                            facilities.data?.data.map(e => {
                                                return <option key={`f${e.id}`} value={e.id}>{e.name}</option>
                                            })
                                        }
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>日付</th>
                            <td>
                                <input type='date' onChange={handleReservationDateChange} value={reservationDate}></input>
                            </td>
                        </tr>
                        <tr>
                            <th>時間</th>
                            <td>
                                <select id='customer' ref={refTimeFrame} onChange={handleTimeChange}>
                                    <option>選択してください</option>
                                    {
                                        timeframes.data?.data.map(e => {
                                            return <option key={`t${e.timeFrameId}`} value={e.timeFrameId}>{e.startTime}</option>
                                        })
                                    }
                            </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='btn-group'>
                <button className='btn negative' onClick={handleReturn}>戻る</button>
                <button className='btn' onClick={handleSaveReservation}>保存</button>
                { (()=>{
                    if (reservationId>0) {
                        return <button className='btn' onClick={handleDeleteReservation}>削除</button>
                    }
                })() }
            </div>
        </div>
    );
}

export default EditReservation;