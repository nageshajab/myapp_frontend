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
export const createTransactionentry = (data: any) => api.post(`/createTransactionEntry`, data);
export const GetTransactionEntries = (data: any) => api.post(`/GetTransactionEntries`, data);
export const GetTransaction = (id: string) => api.get(`/getTransaction?id=${id}`);
export const updateTransactionEntry = ( data: any) => api.post(`/updateTransactionEntry`, data);
export const DeleteTransaction = (id: string) => api.post(`/Deletetransaction?id=${id}`);
