import axios, { AxiosError } from "axios";
import { useCalculateHash } from "./useCalculateHash";
import { useAuthHeader } from "react-auth-kit";

export const useRiderOTW = () => {
  const { calculateHash } = useCalculateHash();
  const authHeader = useAuthHeader();

  const getForDelivery = async () => {
    try {
      // START: Access For Delivery API
      const endpoint = "api/orders";
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

      console.log("Error", err);
      return error;
    }
  };

  const getForDeliveryOTW = async (data) => {
    console.log("getForDeliveryOTW hook ...");
    console.log(data);

    try {
      // START: Access order for delivery API
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
      // END: Access order for delivery API

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

  return { getForDelivery, getForDeliveryOTW };
};
