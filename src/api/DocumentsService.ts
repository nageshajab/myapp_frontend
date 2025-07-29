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
export const DocumentCreate = (data: any) => api.post(`/DocumentCreate`, data);
export const GetDocuments = (data: any) => api.post(`/GetDocuments`, data);
export const DocumentGet = (id: string) => api.get(`/DocumentGet?id=${id}`);
export const DocumentUpdate = ( data: any) => api.post(`/DocumentUpdate`, data);
export const DocumentDelete = (id: string) => api.post(`/DocumentDelete?id=${id}`);
