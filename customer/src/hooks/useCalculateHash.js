const httpBuildQuery = require("http-build-query");
const md5 = require("md5");

/* Get from ENV on production */
const thisKey = process.env.REACT_APP_API_SECRET_KEY;

export const useCalculateHash = () => {
  const calculateHash = (endpoint, body = {}) => {
    // Remove "photo" key if it exists
    body.photo && delete body.photo;
    body.photos && delete body.photos;

    let code = "==";
    code += endpoint;
    code += "?";
    code += httpBuildQuery(body);
    code += "&";
    code += thisKey;

    return md5(md5(code));
  };

  return { calculateHash };
};
