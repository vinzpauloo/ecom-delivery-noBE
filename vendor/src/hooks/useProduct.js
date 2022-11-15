import { useCalculateHash } from "./useCalculateHash";
import { useAuthHeader } from "react-auth-kit";

export const useProduct = () => {
  const { calculateHash } = useCalculateHash();
  const authHeader = useAuthHeader();

  const postProduct = async () => {
    try {
      // START: Add product API
      const endpoint = "api/products/";
      const options = {
        headers: {
          Authorization: authHeader(),
          "X-Authorization": calculateHash(endpoint),
        },
      };

      const response = await axios.post(endpoint, options);
      // END: Add product API

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

  return { postProduct };
};
