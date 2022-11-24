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

  const createOrderGuest = async (data, guestSession) => {
    try {
      // START: Access create order as guest API
      const endpoint = "api/guests/orders";
      const options = {
        headers: {
          "X-Guest-Session": guestSession,
          "X-Authorization": calculateHash(endpoint, data),
        },
      };

      const response = await axios.post(endpoint, data, options);
      // END: Access create order as guest API

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

  const getOrdersById = async (id) => {
    try {
      // START: Access orders by id API
      const endpoint = `api/orders/${id}`;
      const options = {
        headers: {
          Authorization: authHeader(),
          "X-Authorization": calculateHash(endpoint),
        },
        withCredentials: true,
      };

      const response = await axios.get(endpoint, options);
      // END: Access orders by id API

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

  const getOrdersByIdGuest = async (id, guestSession) => {
    try {
      // START: Access guests orders by id API
      const endpoint = `api/guests/orders/${id}`;
      const options = {
        headers: {
          "X-Guest-Session": guestSession,
          "X-Authorization": calculateHash(endpoint),
        },
        withCredentials: true,
      };

      const response = await axios.get(endpoint, options);
      // END: Access guests orders by id API

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

  return {
    createOrder,
    createOrderGuest,
    getOrders,
    getOrdersById,
    getOrdersByIdGuest,
  };
};
