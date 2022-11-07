import React, { useEffect, useState } from "react";
// import useFetch from "react-fetch-hook";
import axios from "axios";

const thisKey = "1bit";
const calculateHash = (request) => {
  /*
    Base sample hash ouput
    2a82e48abcec5374b6ec31960371f7d3
  */
  const md5 = require("md5");
  let code = "==";
  code += "api/restaurants"; // $request->path();
  code += "?";
  code += ""; // http_build_query($request->all())
  /*
  encodeURIComponent()
  spaces 
    = + in php
    = %20 in JavaScript
  */
  code += "&";
  code += thisKey;

  return md5(md5(code));
};

const TestApi = () => {
  const url = "http://192.168.50.170/api/restaurants";
  const options = {
    headers: { "X-Authorization": calculateHash(url) },
  };

  // START: Fetch via axios
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios(url, options)
      .then((response) => {
        setData(response.data);

        console.log("Sample fetch from /api/restaurants");
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  // END: Fetch via axios

  // START: Fetch via useFetch hook
  // const { isLoading, data, error } = useFetch(url, options);
  // END: Fetch via useFetch hook

  return (
    <div className="page">
      <h1 className="">
        {isLoading && "Loading"}
        {error && "Error"}
        {!isLoading && !error && "API fetch success! No error."}
      </h1>
    </div>
  );
};

export default TestApi;
