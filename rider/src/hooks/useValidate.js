import axios, { AxiosError } from "axios";
import { useCalculateHash } from "./useCalculateHash";

export const useValidate = () => {
  const { calculateHash } = useCalculateHash();

  const validateFields = async (data) => {
    try {
      // START: Access customer validate API
      const endpoint = "api/rider/validate";
      const options = {
        headers: {
          "X-Authorization": calculateHash(endpoint, data),
        },
      };

      const response = await axios.post(endpoint, data, options);
      // END: Access customer validate API

      if (response.status === 200) {
        console.log(response);
        const { data } = response.data;

        return data;
      }
    } catch (err) {
      let error, status;
      status = err.response.status;

      if (err && err instanceof AxiosError) {
        error = err.response?.data.errors;
      } else if (err && err instanceof Error) error = err.message;

      console.log("Error", err);
      return { errors: error, status: status };
    }
  };

  return { validateFields };
};
