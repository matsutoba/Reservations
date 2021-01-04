import React, { useState, useEffect } from 'react';

import { getCustomers, postReservation } from '../../apis/customers';
import { getFacilities } from '../../apis/facilities';
import { getTimeFrames } from '../../apis/timeframes';

import { useQuery, QueryClient, useMutation } from 'react-query';

type itsPorps = {
    handleScreenMode: () => void;
}

const queryClient = new QueryClient();

const NewReservation = (props: itsPorps) => {
    const { handleScreenMode } = props;

    const [customerId, setCustomerId] = useState(0);
    const [facilityId, setFacilityId] = useState(0);
    const [reservationDate, setReservationDate] = useState('');
    const [timeFrameId, setTimeFrameId] = useState(0);

    const customers = useQuery('customers', getCustomers);
    const facilities = useQuery('facilitiess', getFacilities);
    const timeframes = useQuery(['timeframes', facilityId], ()=>getTimeFrames(facilityId));
    const mutation = useMutation(postReservation, {
        onSuccess: (data, veriables, context) => {
            queryClient.invalidateQueries('reservations');
            handleScreenMode();
        }
    })

    const handleCustomerChange = (e) => {
        console.log(e.target.value);
        setCustomerId(e.target.value);
    }

    const handleFacilityChange = (e) => {
        console.log(e.target.value);
        setFacilityId(e.target.value);
    }

    const handleReservationDateChange = (e) => {
        setReservationDate(e.target.value);
    }

    const handleTimeChange = (e) => {
        setTimeFrameId(e.target.value);
    }

    const handleNewReservation = (e) => {
        const request = {
            customerId: customerId,
            reservationDate: reservationDate,
            timeFrameId: timeFrameId,
        }
        mutation.mutate(request);
    }


    return (
        <div className='content'>
            <div className='edit'>
                <table>
                    <tr>
                        <th>お客様</th>
                        <td>
                            <select id='customer' onChange={handleCustomerChange}>
                                <option>選択してください</option>
                                {
                                    customers.data?.data.map(e => {
                                        return <option value={e.customerId}>{e.name}</option>
                                    })
                                }
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>施設</th>
                        <td>
                            <select id='customer' onChange={handleFacilityChange}>
                                    <option>選択してください</option>
                                    {
                                        facilities.data?.data.map(e => {
                                            return <option value={e.id}>{e.name}</option>
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
                            <select id='customer' onChange={handleTimeChange}>
                                <option>選択してください</option>
                                {
                                    timeframes.data?.data.map(e => {
                                        return <option value={e.frameId}>{e.startTime}</option>
                                    })
                                }
                        </select>
                        </td>
                    </tr>
                </table>
            </div>
            <div className='btn-group'>
                <button className='btn negative' onClick={handleScreenMode}>戻る</button>
                <button className='btn' onClick={handleNewReservation}>保存</button>
            </div>
        </div>
    );
}

export default NewReservation;