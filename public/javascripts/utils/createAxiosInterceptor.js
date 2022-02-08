const api = axios.create({ timeout: 10000 });

api.interceptors.response.use(
  response => response.data,
  error => {
    if (error?.code === 'ECONNABORTED') window.location.replace('/error/timeout');
    if (error?.response?.status === 404) window.location.replace('/error/404');
    if (error?.response?.status === 401) window.location.replace('/login');
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  async request => request,
  error => {
    if (error?.code === 'ECONNABORTED') console.log(error.message);
    return Promise.reject(error);
  }
);

export default api;
