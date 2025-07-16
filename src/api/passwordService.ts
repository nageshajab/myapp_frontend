import axios from 'axios';
import { API_URL } from "../../config";
import { subscription_key } from "../../config";

const API_BASE = API_URL;
const api = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": subscription_key,
      },
});
export const createPassword = (data: any) => api.post(`${API_BASE}/PasswordCreate`, data);
export const listPasswords = (data: any) => api.post(`${API_BASE}/GetPasswords`, data);
export const getPassword = (id: string) => api.get(`${API_BASE}/PasswordGet?id=${id}`);
export const updatePassword = (id: string, data: any) => api.post(`${API_BASE}/PasswordUpdate`, data);
export const deletePassword = (id: string) => api.post(`${API_BASE}/PasswordDelete?id=${id}`);
