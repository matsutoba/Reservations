import React, { useState, useEffect } from 'react';

import { getFacilities } from '../../apis/facilities';
import { useQuery } from 'react-query';

type itsPorps = {
    handleDetail: (id: number) => void;
    handleScreenMode: () => void;
}

const ListFacilities = (props: itsPorps) => {
    const { handleDetail, handleScreenMode } = props;

    const reservations = useQuery('facilityies', getFacilities);

    return (
        <div className='list'>
            <button className="btn" onClick={handleScreenMode}>施設追加</button>
            <table>
                <thead>
                    <tr>
                    <th className='item'>施設名</th>
                    <th className='item'></th>
                    </tr>
                </thead>
                <tbody>
                { reservations.data?.data.map(e => {
                    return (
                        <tr>
                            <td>{e.name}</td>
                            <td><button className='btn' onClick={() => handleDetail(e.id)}>詳細</button></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
}

export default ListFacilities;