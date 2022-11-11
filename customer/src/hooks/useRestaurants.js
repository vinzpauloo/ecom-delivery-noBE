import axios, { AxiosError } from "axios";
import { useCalculateHash } from "./useCalculateHash";

export const useRestaurants = () => {
  const { calculateHash } = useCalculateHash();

  const getRestaurants = async () => {
    console.log("getRestaurants hook ...");

    try {
      // START: Access cuisines API
      const endpoint = "api/restaurants";
      const options = {
        headers: {
          "X-Authorization": calculateHash(endpoint),
        },
        withCredentials: true,
      };

      const response = await axios.get(endpoint, options);
      // END: Access cuisines API

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

  return { getRestaurants };
};
