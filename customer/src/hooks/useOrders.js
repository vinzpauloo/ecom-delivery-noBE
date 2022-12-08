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

  const getOrders = async (data) => {
    console.log("getOrders hook ...");

    try {
      // START: Access get orders API
      const endpoint = "api/orders";
      const options = {
        params: data,
        headers: {
          Authorization: authHeader(),
          "X-Authorization": calculateHash(endpoint, data),
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

  const cancelOrderById = async (id) => {
    try {
      // START: Access cancel order by id API
      const endpoint = `api/orders/${id}/cancel/customer`;
      const options = {
        headers: {
          Authorization: authHeader(),
          "X-Authorization": calculateHash(endpoint),
        },
        withCredentials: true,
      };

      const response = await axios.put(endpoint, {}, options);
      // END: Access cancel order by id API

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

  const cancelOrderByIdGuest = async (id, guestSession) => {
    try {
      // START: Access cancel order by id (guest) API
      const endpoint = `api/orders/${id}/cancel/guest`;
      const options = {
        headers: {
          "X-Guest-Session": guestSession,
          "X-Authorization": calculateHash(endpoint),
        },
        withCredentials: true,
      };

      const response = await axios.put(endpoint, {}, options);
      // END: Access cancel order by id (guest) API

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

  return {
    createOrder,
    createOrderGuest,
    getOrders,
    getOrdersById,
    getOrdersByIdGuest,
    cancelOrderById,
    cancelOrderByIdGuest,
  };
};
