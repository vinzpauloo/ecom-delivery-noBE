const httpBuildQuery = require("http-build-query");
const md5 = require("md5");

/* Get from ENV on production */
const thisKey = process.env.REACT_APP_API_SECRET_KEY;
// console.log('reading .env "thisKey" =', thisKey);

export const useCalculateHash = () => {
  const calculateHash = (endpoint, body = {}) => {
    // Duplicate current body
    const newBody = { ...body };

    // Remove "photo" key if it exists
    if (newBody && newBody.photo) delete newBody.photo;
    if (newBody && newBody.photos) delete newBody.photos;

    let code = "==";
    code += endpoint;
    code += "?";
    code += httpBuildQuery(newBody);
    code += "&";
    code += thisKey;

    // console.log("newBody", newBody);
    // console.log("md5", code);

    return md5(md5(code));
  };

  return { calculateHash };
};
