import axios from 'axios';
import { API_URL } from "../../config";
import { subscription_key } from "../../config";

const api = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": subscription_key,
      },
});
export const createkhataentry = (data: any) => api.post(`/createkhataentry`, data);
export const GetKhataEntries = (data: any) => api.post(`/GetKhataEntries`, data);
export const KhataGet = (id: string) => api.get(`/KhataGet?id=${id}`);
export const updateKhataEntry = ( data: any) => api.post(`/updateKhataEntry`, data);
export const KhataDelete = (id: string) => api.post(`/KhataDelete?id=${id}`);

export const GetDistinctPersonNames = (data: any) => api.post(`/GetDistinctPersonNames`, data);
export const GetPersonKhataReport = (data: any) => api.post(`/GetPersonKhataReport`, data);
