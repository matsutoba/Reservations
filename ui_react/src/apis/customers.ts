import axios, { AxiosPromise } from 'axios';
import { Customer } from '../types/Customer';
import { Reservation } from '../types/Reservation';

export const getCustomers = (): AxiosPromise<Customer[]> => {
    const url = 'https://localhost:44391/api/customer';
    return axios.get<Customer[]>(url);
}

export const getCustomer = (id: number): AxiosPromise<Customer> => {
    const url = `https://localhost:44391/api/customer/${id}`;
    return axios.get<Customer>(url);
}

export const postCustomer = (customer: Customer): AxiosPromise => {
    const url = 'https://localhost:44391/api/customer';
    return axios.post(url, {
        name: customer.name
    });
}

export const patchCustomer = (customer: Customer): AxiosPromise => {
    const url = `https://localhost:44391/api/customer/${customer.customerId}`;
    return axios.patch(url, {
        customerId: customer.customerId,
        name: customer.name
    });
}

type PostReservationRequest {
    customerId: number,
    reservationDate: string,
    timeFrameId: number
};

export const postReservation = (request: PostReservationRequest): AxiosPromise => {
    const url = `https://localhost:44391/api/customer/${request.customerId}/reservation`;
    return axios.post(url, {
        customerId: request.customerId,
        reservationDate: request.reservationDate.replace(/-/g,''),
        reservationTimeFrameId: request.timeFrameId,
    });
}