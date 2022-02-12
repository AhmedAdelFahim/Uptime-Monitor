import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";

const instance: AxiosInstance = axios.create()


instance.interceptors.request.use(function (config: any) {
  config.metadata = {...config.metadata, requestStartTime: new Date().getTime()}
  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response: any) {
  response.config.metadata = {...response.config.metadata, requestEndTime: new Date().getTime()}
  response.config.metadata.duration = response.config.metadata.requestEndTime - response.config.metadata.requestStartTime
  return response;
}, function (error) {
  error.config.metadata = {...error.config.metadata, requestEndTime: new Date().getTime()}
  error.config.metadata.duration = error.config.metadata.requestEndTime - error.config.metadata.requestStartTime
  return Promise.reject(error);
});

export default instance;