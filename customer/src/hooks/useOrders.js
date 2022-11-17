import axios, { AxiosError } from "axios";
import { useCalculateHash } from "./useCalculateHash";
import { useAuthHeader } from "react-auth-kit";

export const useOrders = () => {
  const { calculateHash } = useCalculateHash();
  const authHeader = useAuthHeader();

  const createOrder = async (data) => {
    try {
      // START: Access create order API
      const endpoint = "api/orders";
      const options = {
        headers: {
          Authorization: authHeader(),
          "X-Authorization": calculateHash(endpoint, data),
        },
      };

      const response = await axios.post(endpoint, data, options);
      // END: Access create order API

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

  const getOrders = async () => {
    console.log("getOrders hook ...");

    try {
      // START: Access get orders API
      const endpoint = "api/orders";
      const options = {
        headers: {
          Authorization: authHeader(),
          "X-Authorization": calculateHash(endpoint),
        },
        withCredentials: true,
      };

      const response = await axios.get(endpoint, options);
      // END: Access get orders API

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
      return error;
    }
  };

  return { createOrder, getOrders };
};
