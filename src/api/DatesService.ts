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
export const createDate = (data: any) => api.post(`/createdate`, data);
export const listdates = (data: any) => api.post(`/GetDates`, data);
export const getDate = (id: string) => api.get(`/DateGet?id=${id}`);
export const updateDate = ( data: any) => api.post(`/updateDate`, data);
export const deleteDate = (id: string) => api.post(`/DateDelete?id=${id}`);
