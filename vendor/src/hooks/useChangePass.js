import axios, { AxiosError } from "axios";
import { useCalculateHash } from "./useCalculateHash";
import { useAuthHeader } from "react-auth-kit";

export const useChangePass = () => {
  const { calculateHash } = useCalculateHash();
  const authHeader = useAuthHeader();

  const getUser = async () => {
    try {
      // START: Access user API
      const endpoint = "api/change-password";
      const options = {
        headers: {
          Authorization: authHeader(),
          "X-Authorization": calculateHash(endpoint),
        },
      };

      const response = await axios.get(endpoint, options);
      // END: Access user API

      if (response.status === 200) {
        const { data } = response.data;

        return data;
      }
    } catch (err) {
      let error;
      if (err && err instanceof AxiosError)
        error = "*" + err.response?.data.message;
      else if (err && err instanceof Error) error = err.message;

      // *console.log("Error", err);
      return error;
    }
  };

  const updatePassword = async (data) => {
    try {
      // START: Access update user password API
      const endpoint = "api/change-password";
      const options = {
        headers: {
          Authorization: authHeader(),
          "X-Authorization": calculateHash(endpoint, data),
        },
      };

      const response = await axios.put(endpoint, data, options);
      // END: Access update user password API

      if (response.status === 200) {
        const { data } = response.data;

        return data;
      }
    } catch (err) {
      let error;
      if (err && err instanceof AxiosError)
        error = "*" + err.response?.data.message;
      else if (err && err instanceof Error) error = err.message;

      // *console.log("Error", err);
      return { error: error };
    }
  };

  const forgotPassword = async (data) => {
    try {
      // START: Access update user password API
      const endpoint = "api/forgot-password";
      const options = {
        headers: {
          Authorization: authHeader(),
          "X-Authorization": calculateHash(endpoint, data),
        },
      };

      const response = await axios.post(endpoint, data, options);
      // END: Access update user password API

      if (response.status === 200) {
        const { data } = response.data;

        return data;
      }
    } catch (err) {
      let error;
      if (err && err instanceof AxiosError)
        error = "*" + err.response?.data.message;
      else if (err && err instanceof Error) error = err.message;

      // *console.log("Error", err);
      return { error: error };
    }
  };

  const resetPassword = async (data) => {
    try {
      // START: Access update user password API
      const endpoint = "api/reset-password";
      const options = {
        headers: {
          Authorization: authHeader(),
          "X-Authorization": calculateHash(endpoint, data),
        },
      };

      const response = await axios.put(endpoint, data, options);
      // END: Access update user password API

      if (response.status === 201) {
        const { data } = response.data;
        return data;
      }
    } catch (err) {
      let error;
      if (err && err instanceof AxiosError)
        error = "*" + err.response?.data.message;
      else if (err && err instanceof Error) error = err.message;

      // *console.log("Error", err);
      return { error: error };
    }
  };

  return { getUser, updatePassword, forgotPassword, resetPassword };
};
