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

export const getReservation = (customerId: number): AxiosPromise<Reservation> => {
    if (customerId === 0) {
        return Promise.reject(null);
    }

    const url = `https://localhost:44391/api/customer/${customerId}/reservation`;
    return axios.get(url);
}

/* 予約保存 */
type ReservationRequest = {
    reservationId: number,
    customerId: number,
    reservationDate: string,
    timeFrameId: number
};
export const postReservation = (request: ReservationRequest): AxiosPromise => {
    const url = `https://localhost:44391/api/customer/${request.customerId}/reservation`;
    return axios.post(url, {
        reservationId: request.reservationId,
        customerId: request.customerId,
        reservationDate: request.reservationDate.replace(/-/g,''),
        reservationTimeFrameId: request.timeFrameId,
    });
}

/* 予約更新 */
export const patchReservation = (request: ReservationRequest): AxiosPromise => {
    const url = `https://localhost:44391/api/customer/${request.customerId}/reservation`;
    return axios.patch(url, {
        reservationId: request.reservationId,
        customerId: request.customerId,
        reservationDate: request.reservationDate.replace(/-/g,''),
        reservationTimeFrameId: request.timeFrameId,
    });
}

/* 予約削除 */
type DeleteReservationRequest = {
    customerId: number,
    reservationId: number,
}
export const deleteReservation = (request: DeleteReservationRequest): AxiosPromise => {
    const url = `https://localhost:44391/api/customer/${request.customerId}/reservation/${request.reservationId}`;
    return axios.delete(url);
}
