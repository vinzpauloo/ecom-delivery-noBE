const httpBuildQuery = require("http-build-query");
const md5 = require("md5");

/* Get from ENV on production */
const thisKey = process.env.REACT_APP_API_SECRET_KEY;

export const useCalculateHash = () => {
  const calculateHash = (endpoint, body = {}) => {
    const body2 = { ...body };
    // Remove "photo" key if it exists
    if (body2 && body2.photo2) delete body2.photo2;

    let code = "==";
    code += endpoint;
    code += "?";
    code += httpBuildQuery(body2);
    code += "&";
    code += thisKey;

    console.log(code);

    return md5(md5(code));
  };

  return { calculateHash };
};
