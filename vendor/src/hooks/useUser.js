import axios, { AxiosError } from "axios";
import { useCalculateHash } from "./useCalculateHash";
import { useAuthHeader } from "react-auth-kit";

export const useUser = () => {
  const { calculateHash } = useCalculateHash();
  const authHeader = useAuthHeader();

  const createUser = async (data) => {
    try {
      // START: Access register API
      const endpoint = "api/merchant/register";
      const options = {
        headers: {
          "X-Authorization": calculateHash(endpoint, data),
        },
        withCredentials: true,
      };

      const response = await axios.post(endpoint, data, options);
      // END: Access register API

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
      return error;
    }
  };

  const getUser = async () => {
    try {
      // START: Access user API
      const endpoint = "api/user/profile";
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
      return { error };
    }
  };

  const updateUser = async (data) => {
    try {
      // START: Access update user API
      const endpoint = "api/user";
      const options = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: authHeader(),
          "X-Authorization": calculateHash(endpoint, data, true),
        },
      };

      const response = await axios.post(endpoint, data, options);
      // END: Access update user API

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

  const changePassword = async (data) => {
    try {
      // START: Access change password API
      const endpoint = "api/change-password";
      const options = {
        headers: {
          Authorization: authHeader(),
          "X-Authorization": calculateHash(endpoint, data),
        },
      };

      const response = await axios.put(endpoint, data, options);
      // END: Access change password API

      if (response.status === 201) {
        // *console.log(response);
        const { data, message } = response.data;

        return { token: data.token, message };
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

  return { createUser, getUser, updateUser, changePassword };
};
