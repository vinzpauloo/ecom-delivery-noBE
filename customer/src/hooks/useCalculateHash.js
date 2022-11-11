const httpBuildQuery = require("http-build-query");
const md5 = require("md5");

/* Get from ENV on production */
const thisKey = process.env.REACT_APP_API_SECRET_KEY;
console.log('reading .env "thisKey" =', thisKey);

export const useCalculateHash = () => {
  const calculateHash = (endpoint, body = {}) => {
    let code = "==";
    code += endpoint;
    code += "?";
    code += httpBuildQuery(body);
    code += "&";
    code += thisKey;

    // console.log("calculate hash", code);

    return md5(md5(code));
  };

  return { calculateHash };
};
