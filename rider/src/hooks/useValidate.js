import axios, { AxiosError } from "axios";
import { useCalculateHash } from "./useCalculateHash";

export const useValidate = () => {
  const { calculateHash } = useCalculateHash();

  const validateEmail = async (data) => {
    try {
      // START: Access Validate Email API
      const endpoint = "api/validate-email";
      const options = {
        headers: {
          "X-Authorization": calculateHash(endpoint, data),
        },
      };

      const response = await axios.post(endpoint, data, options);
      // END: Access Validate Email API

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

  const validateMobile = async (data) => {
    try {
      // START: Access Validate Mobile API
      const endpoint = "api/validate-mobile";
      const options = {
        headers: {
          "X-Authorization": calculateHash(endpoint, data),
        },
      };

      const response = await axios.post(endpoint, data, options);
      // END: Access Validate Mobile API

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

  return { validateEmail, validateMobile };
};
