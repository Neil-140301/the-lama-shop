import axios from 'axios';

const appUrl = process.env.NEXT_PUBLIC_APP_URL;
// const token = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
//   .currentUser.token || '';

export const publicRequest = axios.create({
  baseURL: `${appUrl}/api`,
});

// export const userRequest = axios.create({
//   baseURL: `${appUrl}/api`,
//   headers: { token: `Bearer ${token}` },
// });
