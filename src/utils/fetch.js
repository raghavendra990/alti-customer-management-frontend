import axios from "axios";
import config from "./config";

const fetchFunction = {
  post: async (
    url,
    data,
    host = config.host,
    headers = config.headers,
    timeout = 5000
  ) => {
    try {
      const response = await axios({
        method: "post",
        url: `${host}${url}`,
        data: data,
        timeout: timeout,
        headers: headers,
      });
      return response;
    } catch (err) {
        console.log('error', err, `${host}${url}`)
      return err?.response;
    }
  },
  put: async (
    url,
    data,
    host = config.host,
    headers = config.headers,
    timeout = 5000
  ) => {
    try {
      const response = await axios({
        method: "put",
        url: `${host}${url}`,
        data: data,
        timeout: timeout,
        headers: headers,
      });
      return response;
    } catch (err) {
      
      return err?.response;
    }
  },
  patch: async (
    url,
    data,
    host = config.host,
    headers = config.headers,
    timeout = 5000
  ) => {
    try {
      const response = await axios({
        method: "patch",
        url: `${host}${url}`,
        data: data,
        timeout: timeout,
        headers: headers,
      });
      return response;
    } catch (err) {
      
      return err?.response;
    }
  },
  delete: async (
    url,
    data,
    host = config.host,
    headers = config.headers,
    timeout = 5000
  ) => {
    try {
      const response = await axios({
        method: "delete",
        url: `${host}${url}`,
        data: data,
        timeout: timeout,
        headers: headers,
      });
      return response;
    } catch (err) {
      
      return err?.response;
    }
  },
  get: async (url, host = config.host, headers = config.headers) => {
    try {
      const response = await axios.get(`${host}${url}`, { headers });
      return response;
    } catch (error) {
      console.error(error);
      return error?.response;
    }
  }
};
export default fetchFunction;
