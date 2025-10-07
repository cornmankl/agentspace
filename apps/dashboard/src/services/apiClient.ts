import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT_MS ?? 10000);

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
});
