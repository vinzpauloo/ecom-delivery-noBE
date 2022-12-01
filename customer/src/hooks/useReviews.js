import axios, { AxiosError } from "axios";
import { useCalculateHash } from "./useCalculateHash";
import { useAuthHeader } from "react-auth-kit";

export const useReviews = () => {
  const { calculateHash } = useCalculateHash();
  const authHeader = useAuthHeader();

  const reviewRider = async (id, data) => {
    try {
      // START: Access review rider API
      const endpoint = `api/orders/${id}/rider-review`;
      const options = {
        headers: {
          Authorization: authHeader(),
          "X-Authorization": calculateHash(endpoint, data),
        },
        withCredentials: true,
      };

      const response = await axios.put(endpoint, data, options);
      // END: Access review rider API

      if (response.status === 200) {
        console.log("Hook response", response);
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
    reviewRider,
  };
};
