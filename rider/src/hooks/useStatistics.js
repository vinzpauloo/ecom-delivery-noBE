import axios, { AxiosError } from "axios";
import { useCalculateHash } from "./useCalculateHash";
import { useAuthHeader } from "react-auth-kit";

export const useStatistics = () => {
  const { calculateHash } = useCalculateHash();
  const authHeader = useAuthHeader();

  const getDailyStatistics = async (data) => {
    // console.log("getOrderCompleted hook ...");
    // console.log(data);

    try {
      // START: Access completed orders API
      const endpoint = "api/statistics/riders/personal/transactions";
      const options = {
        params: data,
        headers: {
          Authorization: authHeader(),
          "X-Authorization": calculateHash(endpoint, data),
        },
        withCredentials: true,
      };

      const response = await axios.get(endpoint, options);
      // END: Access completed orders API

      if (response.status === 200) {
        const { data } = response.data;

        return data;
      }
    } catch (err) {
      let error;
      if (err && err instanceof AxiosError)
        error = "*" + err.response?.data.message;
      else if (err && err instanceof Error) error = err.message;

      // console.log("Error", err);
      return error;
    }
  };

  const getWeeklyStatistics = async (data) => {
    // console.log("getOrderCompleted hook ...");
    // console.log(data);

    try {
      // START: Access completed orders API
      const endpoint = "api/statistics/riders/personal/transactions";
      const options = {
        params: data,
        headers: {
          Authorization: authHeader(),
          "X-Authorization": calculateHash(endpoint, data),
        },
        withCredentials: true,
      };

      const response = await axios.get(endpoint, options);
      // END: Access completed orders API

      if (response.status === 200) {
        const { data } = response.data;

        return data;
      }
    } catch (err) {
      let error;
      if (err && err instanceof AxiosError)
        error = "*" + err.response?.data.message;
      else if (err && err instanceof Error) error = err.message;

      // console.log("Error", err);
      return error;
    }
  };

  const getMonthlyStatistics = async (data) => {
    // console.log("getOrderCompleted hook ...");
    // console.log(data);

    try {
      // START: Access completed orders API
      const endpoint = "api/statistics/riders/personal/transactions";
      const options = {
        params: data,
        headers: {
          Authorization: authHeader(),
          "X-Authorization": calculateHash(endpoint, data),
        },
        withCredentials: true,
      };

      const response = await axios.get(endpoint, options);
      // END: Access completed orders API

      if (response.status === 200) {
        const { data } = response.data;

        return data;
      }
    } catch (err) {
      let error;
      if (err && err instanceof AxiosError)
        error = "*" + err.response?.data.message;
      else if (err && err instanceof Error) error = err.message;

      // console.log("Error", err);
      return error;
    }
  };

  return {
    getDailyStatistics,
    getWeeklyStatistics,
    getMonthlyStatistics,
  };
};
