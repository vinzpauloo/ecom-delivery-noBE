import axios, { AxiosError } from "axios";
import { useCalculateHash } from "./useCalculateHash";
import { useAuthHeader } from "react-auth-kit";

export const useFlavors = () => {
  const { calculateHash } = useCalculateHash();
  const authHeader = useAuthHeader();

  const getFlavorById = async (id) => {
    try {
      // START: Get restaurant product API
      const endpoint = `api/flavors/${id}`;
      const options = {
        headers: {
          Authorization: authHeader(),
          "X-Authorization": calculateHash(endpoint),
        },
      };

      const response = await axios.get(endpoint, options);
      // END: Get restaurant product API

      if (response.status === 200) {
        const { data } = response.data;
        console.log(response);

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

  const getFlavors = async () => {
    try {
      // START: Get restaurant product API
      const endpoint = "api/flavors";
      const options = {
        headers: {
          Authorization: authHeader(),
          "X-Authorization": calculateHash(endpoint),
        },
      };

      const response = await axios.get(endpoint, options);
      // END: Get restaurant product API

      if (response.status === 200) {
        const { data } = response.data;
        console.log(response);

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

  const postFlavor = async (data) => {
    try {
      // START: Add product API
      const endpoint = "api/flavors";
      const options = {
        headers: {
          Authorization: authHeader(),
          "X-Authorization": calculateHash(endpoint, data),
        },
      };

      const response = await axios.post(endpoint, data, options);
      // END: Add product API

      if (response.status === 201) {
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

  const updateFlavor = async (id, data) => {
    try {
      // START: Access update user API
      const endpoint = `api/flavors/${id}`;
      const options = {
        headers: {
          Authorization: authHeader(),
          "X-Authorization": calculateHash(endpoint, data),
        },
      };

      const response = await axios.put(endpoint, data, options);
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

  const deleteFlavor = async (id, data) => {
    console.log("getRestaurantProduct hook ...");

    try {
      // START: Delete restaurant product API
      const endpoint = `api/flavors/${id}`;
      const options = {
        params: data,
        headers: {
          Authorization: authHeader(),
          "X-Authorization": calculateHash(endpoint, data),
        },
      };

      const response = await axios.delete(endpoint, options);
      // END: Delete restaurant product API

      if (response.status === 200) {
        const { data } = response.data;
        console.log(response);

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

  return { getFlavors, getFlavorById, updateFlavor, postFlavor, deleteFlavor };
};
