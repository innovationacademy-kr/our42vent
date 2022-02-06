const api = axios.create({ timeout: 3000 });

api.interceptors.response.use(
  response => response.data,
  error => {
    if (error?.response?.status === 401) window.location.replace('/login');
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => response,
  error => {
    /**
     * TODO : Timeout이 났을 때인데, Request Time out이면 에러 페이지로 보내는게 좋을 지 고민해보기
     * NOTE : error code가 ECONNABORTED이니 다른 경우에도 이 error code로 터질 수 있음
     */
    if (error?.code === 'ECONNABORTED') console.log(error.message);
    return Promise.reject(error);
  }
);

export default api;
