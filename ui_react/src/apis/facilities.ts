import axios, { AxiosPromise } from 'axios';
import { Facility } from '../types/Facility';

export const getFacilities = (): AxiosPromise<Facility[]> => {
    const url = `https://localhost:44391/api/facility`;
    return axios.get<Facility[]>(url);
}

export const getFacility = (id: number): AxiosPromise<Facility> => {
    const url = `https://localhost:44391/api/facility/${id}`;
    return axios.get<Facility>(url);
}

export const postFacility = (data:Facility): AxiosPromise => {
    const url = `https://localhost:44391/api/facility/${data.id}`;
    return axios.post(url, {
        id: data.id, 
        name: data.name
    });
}