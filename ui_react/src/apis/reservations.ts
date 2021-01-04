import axios, { AxiosPromise } from 'axios';
import { Reservation } from '../types/Reservation';

export const getReservations = (date: string): AxiosPromise<Reservation[]> => {
    const url = `https://localhost:44391/api/reservation/${date.replace(/-/g, '')}/reservations`;
    return axios.get<Reservation[]>(url);
}
