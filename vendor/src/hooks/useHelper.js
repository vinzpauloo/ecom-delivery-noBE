import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";

export const useHelper = () => {
  const getCountdown = (totalSeconds) => {
    // Get number of full minutes
    const minutes = Math.floor(totalSeconds / 60);

    // Get remainder of seconds
    const seconds = totalSeconds % 60;

    function padTo2Digits(num) {
      return num.toString().padStart(2, "0");
    }

    // Format as MM:SS
    const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;

    return result;
  };

  // const uploadToFirebase = async (imageUpload) => {
  //   if (imageUpload == null) return;
  //   const imageRef = ref(storage, `merchant/menu/${imageUpload.name + v4()}`);
  //   uploadBytes(imageRef, imageUpload).then((snapshot) => {
  //     getDownloadURL(snapshot.ref).then((url) => {
  //       console.log(url);
  //     });
  //   });
  // };

  return { getCountdown };
};
