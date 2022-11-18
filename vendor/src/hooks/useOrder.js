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

      console.log("Error", err);
      return { error: error };
    }
  };
  return { updateOrder };
};
