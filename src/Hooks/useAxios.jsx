import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://track-force-server.vercel.app`,
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;