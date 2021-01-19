import axios, { AxiosPromise } from 'axios';
import { ReservationResponse, ReservationForList } from '../types/Reservation';

export const getReservation = (id: number): AxiosPromise<ReservationResponse> => {
    const url = `https://localhost:44391/api/reservation/${id}`;
    return axios.get<ReservationResponse>(url);
};

export const getReservations = (date: string): AxiosPromise<ReservationForList[]> => {
    const url = `https://localhost:44391/api/reservation/${date.replace(/-/g, '')}/reservations`;
    return axios.get<ReservationForList[]>(url);
};

