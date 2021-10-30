import axios from 'axios';

const appUrl = 'https://lama-shop-api.vercel.app';
const token = localStorage.getItem('persist:root')
  ? JSON.parse(JSON.parse(localStorage.getItem('persist:root'))?.user)
      ?.currentUser?.token
  : '';

export const publicRequest = axios.create({
  baseURL: `${appUrl}/api`,
});

export const userRequest = axios.create({
  baseURL: `${appUrl}/api`,
  headers: { token: `Bearer ${token}` },
});
