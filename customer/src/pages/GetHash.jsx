import React, { useState } from "react";
import { useCalculateHash } from "../hooks/useCalculateHash";

const GetHash = () => {
  const [url, setUrl] = useState();
  const { calculateHash } = useCalculateHash();

  return (
    <div className="page">
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      <p>Endpoint: {url}</p>
      <p>X-Authorization: {calculateHash(url)}</p>
    </div>
  );
};

export default GetHash;
