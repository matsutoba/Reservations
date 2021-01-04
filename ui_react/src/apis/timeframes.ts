import axios, { AxiosPromise } from 'axios';
import { TimeFrame } from '../types/TimeFrame';

export const getTimeFrames = (facilityId: number): AxiosPromise<TimeFrame[]> => {
    const url = `https://localhost:44391/api/timeframe/${facilityId}`;
    console.log(facilityId);
    
    return axios.get<TimeFrame[]>(url);
}
