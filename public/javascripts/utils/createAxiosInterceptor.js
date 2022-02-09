const api = axios.create({ timeout: 10000 });

api.interceptors.response.use(
  response => response.data,
  error => {
    if (error?.code === 'ECONNABORTED') window.location.replace('/error/408');
    if (error?.response?.status === 404) window.location.replace('/error/404');
    if (error?.response?.status === 401) window.location.replace('/logout');
    return Promise.reject(error);
  }
);

export default api;
