import { useEffect, useRef } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axios from "../lib/axios";

// Custom hook to add Authorization header to Axios requests
const useAxiosAuth = () => {
  const authHeader = useAuthHeader();

  const interceptorRef = useRef<number | null>(null);

  useEffect(() => {
    interceptorRef.current = axios.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          // Add the Authorization header from the authHeader hook
          config.headers["Authorization"] = authHeader;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Cleanup function to eject (remove) the interceptor when component unmounts
    return () => {
      if (interceptorRef.current !== null) {
        axios.interceptors.request.eject(interceptorRef.current);
      }
    };
  }, [authHeader]);

  return axios;
};

export default useAxiosAuth;
