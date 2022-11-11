import axios, { AxiosError } from "axios";
import { useCalculateHash } from "./useCalculateHash";

export const useCategories = () => {
  const { calculateHash } = useCalculateHash();

  const getCategories = async () => {
    console.log("getCategories hook ...");

    try {
      // START: Access categories API
      const endpoint = "api/categories";
      const options = {
        headers: {
          "X-Authorization": calculateHash(endpoint),
        },
        withCredentials: true,
      };

      const response = await axios.get(endpoint, options);
      // END: Access categories API

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

  return { getCategories };
};
