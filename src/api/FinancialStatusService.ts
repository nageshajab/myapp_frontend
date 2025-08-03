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
export const updateFinancialStatus = ( data: any) => api.post(`/updateFinancialStatus`, data);
export const GetFinancialStatus=  (data:any) => api.post(`/GetFinancialStatus`,data);

