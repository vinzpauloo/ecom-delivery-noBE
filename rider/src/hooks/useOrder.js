import axios, { AxiosError } from "axios";
import { useCalculateHash } from "./useCalculateHash";
import { useAuthHeader } from "react-auth-kit";

export const useOrder = () => {
  const { calculateHash } = useCalculateHash();
  const authHeader = useAuthHeader();

  const updateOrder = async (id, status) => {
    try {
      // START: Access update user API
      const endpoint = `api/orders/${id}/${status}`;
      // console.log(endpoint);
      const options = {
        headers: {
          Authorization: authHeader(),
          "X-Authorization": calculateHash(endpoint),
        },
      };

      const response = await axios.put(endpoint, {}, options);
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

      // console.log("Error", err);
      return { error: error };
    }
  };

  const cancelOrder = async (id, status) => {
    try {
      // START: Access update user API
      const endpoint = `api/orders/${id}/${status}/restaurant`;
      const options = {
        headers: {
          Authorization: authHeader(),
          "X-Authorization": calculateHash(endpoint),
        },
      };

      const response = await axios.put(endpoint, {}, options);
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

      // console.log("Error", err);
      return { error: error };
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

      // console.log("Error", err);
      return error;
    }
  };
  //Self Assign Rider
  const acceptOrder = async (id, status) => {
    try {
      // START: Access update user API
      const endpoint = `api/orders/${id}/rider/assign/self`;
      // console.log(endpoint);
      const options = {
        headers: {
          Authorization: authHeader(),
          "X-Authorization": calculateHash(endpoint),
        },
      };

      const response = await axios.put(endpoint, {}, options);
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

      // console.log("Error", err);
      return { error: error };
    }
  };

  return { updateOrder, cancelOrder, getOrdersById, acceptOrder };
};
