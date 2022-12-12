import axios, { AxiosError } from "axios";
import { useCalculateHash } from "./useCalculateHash";
import { useAuthHeader } from "react-auth-kit";

export const useChat = () => {
  const { calculateHash } = useCalculateHash();
  const authHeader = useAuthHeader();

  /*
  Chat API (Revisions)

  Chat Auth
    Api: POST: api/chat
    Param: order_id, to_user_type, message

    Api: GET: api/chat
    Param: order_id, channel_name,

  Chat Guest
    Api: POST: api/chat/guest
    Param: order_id, to_user_type, message

    Api: GET: api/chat/guest
    Param: order_id, channel_name 
  */

  const getMessages = async (data) => {
    try {
      // START: Access get message API
      const endpoint = `api/chat`;
      const options = {
        params: data,
        headers: {
          Authorization: authHeader(),
          "X-Authorization": calculateHash(endpoint, data),
        },
      };

      const response = await axios.get(endpoint, options);
      // END: Access get message API

      if (response.status === 200) {
        const data = response.data;

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

  const getMessagesGuest = async (data) => {
    try {
      // START: Access get message guest API
      const endpoint = `api/chat/guest`;
      const options = {
        params: data,
        headers: {
          "X-Guest-Session": localStorage.getItem("guestSession"),
          "X-Authorization": calculateHash(endpoint, data),
        },
      };

      const response = await axios.get(endpoint, options);
      // END: Access get message API

      if (response.status === 200) {
        const data = response.data;

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

  const createMessage = async (data) => {
    try {
      // START: Access create message API
      const endpoint = `api/chat`;
      const options = {
        headers: {
          Authorization: authHeader(),
          "X-Authorization": calculateHash(endpoint, data),
        },
      };

      const response = await axios.post(endpoint, data, options);
      // END: Access create message API

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

  const createMessageGuest = async (data) => {
    try {
      // START: Access create message guest API
      const endpoint = `api/chat/guest`;
      const options = {
        headers: {
          "X-Guest-Session": localStorage.getItem("guestSession"),
          "X-Authorization": calculateHash(endpoint, data),
        },
      };

      const response = await axios.post(endpoint, data, options);
      // END: Access create message guest API

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

  const getMessagesRider = async (data) => {
    try {
      // START: Access get message API
      const endpoint = `api/chat`;
      const options = {
        params: data,
        headers: {
          Authorization: authHeader(),
          "X-Authorization": calculateHash(endpoint, data),
        },
      };

      const response = await axios.get(endpoint, options);
      // END: Access get message API

      if (response.status === 200) {
        const data = response.data;

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
    getMessages,
    getMessagesGuest,
    createMessage,
    createMessageGuest,
    getMessagesRider,
  };
};

//   const getMessagesRestaurant = async (id) => {
//     try {
//       // START: Access get message API
//       const endpoint = `api/chat/customer-merchant/orders/${id}`;
//       const options = {
//         headers: {
//           Authorization: authHeader(),
//           "X-Authorization": calculateHash(endpoint),
//         },
//       };

//       const response = await axios.get(endpoint, options);
//       // END: Access get message API

//       if (response.status === 200) {
//         const data = response.data;

//         return data;
//       }
//     } catch (err) {
//       let error;
//       if (err && err instanceof AxiosError)
//         error = "*" + err.response?.data.message;
//       else if (err && err instanceof Error) error = err.message;

//       console.log("Error", err);
//       return { error: error };
//     }
//   };

//   const getMessagesRestaurantGuest = async (id, guestSession) => {
//     try {
//       // START: Access get message API
//       const endpoint = `api/chat/guest-merchant/orders/${id}`;
//       const options = {
//         headers: {
//           "X-Guest-Session": guestSession,
//           "X-Authorization": calculateHash(endpoint),
//         },
//       };

//       const response = await axios.get(endpoint, options);
//       // END: Access get message API

//       if (response.status === 200) {
//         const data = response.data;

//         return data;
//       }
//     } catch (err) {
//       let error;
//       if (err && err instanceof AxiosError)
//         error = "*" + err.response?.data.message;
//       else if (err && err instanceof Error) error = err.message;

//       console.log("Error", err);
//       return { error: error };
//     }
//   };

//   const getMessagesRider = async (id) => {
//     try {
//       // START: Access get message API
//       const endpoint = `api/chat/customer-rider/orders/${id}`;
//       const options = {
//         headers: {
//           Authorization: authHeader(),
//           "X-Authorization": calculateHash(endpoint),
//         },
//       };

//       const response = await axios.get(endpoint, options);
//       // END: Access get message API

//       if (response.status === 200) {
//         const data = response.data;

//         return data;
//       }
//     } catch (err) {
//       let error;
//       if (err && err instanceof AxiosError)
//         error = "*" + err.response?.data.message;
//       else if (err && err instanceof Error) error = err.message;

//       console.log("Error", err);
//       return { error: error };
//     }
//   };

//   const getMessagesRiderGuest = async (id) => {
//     try {
//       // START: Access get message API
//       const endpoint = `api/chat/guest-rider/orders/${id}`;
//       const options = {
//         headers: {
//           Authorization: authHeader(),
//           "X-Authorization": calculateHash(endpoint),
//         },
//       };

//       const response = await axios.get(endpoint, options);
//       // END: Access get message API

//       if (response.status === 200) {
//         const data = response.data;

//         return data;
//       }
//     } catch (err) {
//       let error;
//       if (err && err instanceof AxiosError)
//         error = "*" + err.response?.data.message;
//       else if (err && err instanceof Error) error = err.message;

//       console.log("Error", err);
//       return { error: error };
//     }
//   };

//   const createMessage = async (id, data) => {
//     try {
//       // START: Access create message API
//       const endpoint = `api/chat/orders/${id}`;
//       const options = {
//         headers: {
//           Authorization: authHeader(),
//           "X-Authorization": calculateHash(endpoint, data),
//         },
//       };

//       const response = await axios.post(endpoint, data, options);
//       // END: Access create message API

//       if (response.status === 200) {
//         const { data } = response.data;

//         return data;
//       }
//     } catch (err) {
//       let error;
//       if (err && err instanceof AxiosError)
//         error = "*" + err.response?.data.message;
//       else if (err && err instanceof Error) error = err.message;

//       console.log("Error", err);
//       return { error: error };
//     }
//   };

//   const createMessageGuest = async (id, data) => {
//     try {
//       // START: Access create message guest API
//       const endpoint = `api/chat/guest/orders/${id}`;
//       const options = {
//         headers: {
//           Authorization: authHeader(),
//           "X-Authorization": calculateHash(endpoint, data),
//         },
//       };

//       const response = await axios.post(endpoint, data, options);
//       // END: Access create message guest API

//       if (response.status === 200) {
//         const { data } = response.data;

//         return data;
//       }
//     } catch (err) {
//       let error;
//       if (err && err instanceof AxiosError)
//         error = "*" + err.response?.data.message;
//       else if (err && err instanceof Error) error = err.message;

//       console.log("Error", err);
//       return { error: error };
//     }
//   };

//   return {
//     getMessagesRestaurant,
//     getMessagesRestaurantGuest,
//     getMessagesRider,
//     getMessagesRiderGuest,
//     createMessage,
//     createMessageGuest,
//   };
// };
