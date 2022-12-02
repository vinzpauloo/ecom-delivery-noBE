import axios, { AxiosError } from "axios";

export const useGoogleAPI = () => {
  const reverseGeocode = async (lat, lng) => {
    try {
      const API_KEY = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;

      // START: Access reverseGeocode API
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;
      const response = await axios.get(url);
      // END: Access reverseGeocode API

      if (response.status === 200) {
        return response.data.results[0].formatted_address;
      }
    } catch (err) {
      let error = {};
      if (err && err instanceof AxiosError)
        error.message = "*" + err.response?.data.message;
      else if (err && err instanceof Error) error.message = err.message;

      error.status = err.response.status;

      console.log("Error", err);
      return error;
    }
  };

  return { reverseGeocode };
};
