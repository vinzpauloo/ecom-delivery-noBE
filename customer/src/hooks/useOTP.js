import axios, { AxiosError } from "axios";
import { useCalculateHash } from "./useCalculateHash";

export const useOTP = () => {
  const { calculateHash } = useCalculateHash();

  const requestOTP = async (data) => {
    try {
      // START: Access Request OTP API
      const endpoint = "api/request-otp";
      const options = {
        headers: {
          "X-Authorization": calculateHash(endpoint, data),
        },
      };

      const response = await axios.post(endpoint, data, options);
      // END: Access Request OTP API

      if (response.status === 200) {
        const { data } = response.data;

        return data;
      }
    } catch (err) {
      let error = {};
      if (err && err instanceof AxiosError)
        error.message = "*" + err.response?.data.message;
      else if (err && err instanceof Error) error.message = err.message;

      error.status = err.response.status;

      console.log("Error", err);
      return error;
    }
  };

  const verifyOTP = async (data) => {
    try {
      // START: Access Verify OTP API
      const endpoint = "api/verify-otp";
      const options = {
        headers: {
          "X-Authorization": calculateHash(endpoint, data),
        },
      };

      const response = await axios.post(endpoint, data, options);
      // END: Access Verify OTP API

      if (response.status === 200) {
        const { data } = response.data;

        return data;
      }
    } catch (err) {
      let error;
      if (err && err instanceof AxiosError)
        error = "*" + err.response?.data.message;
      else if (err && err instanceof Error) error = err.message;

      console.log("Error", err);
      return { error: error };
    }
  };

  return { requestOTP, verifyOTP };
};
