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
export const createTaskentry = (data: any) => api.post(`/createTaskEntry`, data);
export const GetTaskEntries = (data: any) => api.post(`/GetTaskEntries`, data);
export const GetTask = (id: string) => api.get(`/getTask?id=${id}`);
export const updateTaskEntry = ( data: any) => api.post(`/updateTaskEntry`, data);
export const DeleteTask = (id: string) => api.post(`/deleteTask?id=${id}`);
