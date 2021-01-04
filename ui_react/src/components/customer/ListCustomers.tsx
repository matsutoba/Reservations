import React, { useState, useEffect } from 'react';

import { getCustomers } from '../../apis/customers';
import { useQuery } from 'react-query';

type itsPorps = {
    handleDetail: (id: number) => void;
    handleScreenMode: () => void;
}

const ListCustomers = (props: itsPorps) => {
    const { handleDetail, handleScreenMode } = props;

    const customers = useQuery('customers', getCustomers);

    return (
        <div className='list'>
            <button className="btn" onClick={handleScreenMode}>顧客追加</button>
            <table>
                <thead>
                    <tr>
                    <th className='item'>顧客名</th>
                    <th className='item'></th>
                    </tr>
                </thead>
                <tbody>
                { customers.data?.data.map(e => {
                    return (
                        <tr>
                            <td>{e.name}</td>
                            <td><button className='btn' onClick={() => handleDetail(e.customerId)}>詳細</button></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
}

export default ListCustomers;