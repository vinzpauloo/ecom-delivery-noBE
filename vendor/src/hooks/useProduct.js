import axios, { AxiosError } from "axios";
import { useCalculateHash } from "./useCalculateHash";
import { useAuthHeader } from "react-auth-kit";

export const useProduct = () => {
  const { calculateHash } = useCalculateHash();
  const authHeader = useAuthHeader();

  const postProduct = async (data) => {
    try {
      // START: Add product API
      const endpoint = "api/products";
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

  const getProductById = async (id) => {
    try {
      // START: Access user API
      const endpoint = `api/products/${id}`;
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

  const getProduct = async (data) => {
    console.log("getRestaurantProduct hook ...");

    try {
      // START: Get restaurant product API
      const endpoint = "api/products/merchant/all";
      const options = {
        params: data,
        headers: {
          Authorization: authHeader(),
          "X-Authorization": calculateHash(endpoint, data),
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

  const deleteProduct = async (id, data) => {
    console.log("getRestaurantProduct hook ...");

    try {
      // START: Delete restaurant product API
      const endpoint = `api/products/${id}`;
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

  const updateProductAvailability = async (id, data) => {
    try {
      // START: Access update user API
      const endpoint = `api/products/${id}/available`;
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

  const getProductInformation = async (id) => {
    try {
      // START: Access user API
      const endpoint = `api/products/${id}`;
      const options = {
        params: {with: "categories,cuisines,restaurant"},
        headers: {
          Authorization: authHeader(),
          "X-Authorization": calculateHash(endpoint, {with: "categories,cuisines,restaurant"}),
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

  const editProduct = async (id, data) => {
    try {
      // START: Access update user API
      const endpoint = `api/products/${id}`;
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

  return { postProduct, getProduct, deleteProduct, updateProductAvailability, getProductInformation, editProduct };
};
