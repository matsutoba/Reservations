import React, { useState, useEffect } from 'react';
import { Customer } from '../../types/Customer';
import { getCustomer, patchCustomer } from '../../apis/customers';
import { useQuery, useMutation, useQueryClient } from 'react-query';

type itsPorps = {
    customerId: number,
    handleScreenMode: () => void;
}

const EditCustomer = (props: itsPorps) => {
    const { customerId, handleScreenMode } = props;

    const queryClient = useQueryClient();
    const query = useQuery(['customer', customerId], ()=>getCustomer(customerId));
    const mutation = useMutation(patchCustomer, {
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries('customers');
            handleScreenMode();
        }
    });
    const [customer, setCustomer] = useState<Customer>({
        customerId: -1,
        name: '',
    });

    useEffect(()=>{
        if (query.data) {
            setCustomer(query.data.data);
            console.log(query.data.data);
        }
    },[query.data])

    const handleChange = (e) => {
        setCustomer({
            customerId: customer?.customerId,
            name: e.target.value
        });
    }

    const handleSave = () => {
        if (customer) {
            mutation.mutate(customer);    
        }
    }

    return (
        <div className='reservations'>
            <h2>顧客編集</h2>
            <div className='edit'>
                <table>
                    <tbody>
                        <tr>
                            <th className='item'>顧客名</th>
                            <td>
                                <input 
                                    type="text" 
                                    value={customer.name}
                                    onChange={(e) => handleChange(e)}
                                    />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='btn-group'>
                <button className='btn' onClick={handleScreenMode}>キャンセル</button>
                <button className='btn' onClick={handleSave}>保存</button>
            </div>
        </div>
    );
}

export default EditCustomer;