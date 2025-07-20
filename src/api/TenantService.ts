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
export const createTenant = (data: any) => api.post(`/createTenant`, data);
export const GetTenants = (data: any) => api.post(`/GetTenants`, data);
export const GetTenant = (id: string) => api.get(`/GetTenant?id=${id}`);
export const updateTenant = ( data: any) => api.post(`/updateTenant`, data);
export const DeleteTenant = (id: string) => api.post(`/DeleteTenant?id=${id}`);
