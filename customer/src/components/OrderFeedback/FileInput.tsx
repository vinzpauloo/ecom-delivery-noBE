import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import styles from "./FileInput.module.scss";

interface FileInputProps {
  setImageFiles?: any;
}

const FileInput: React.FC<FileInputProps> = ({ setImageFiles }) => {
  const [previewUrl, setPreviewUrl] = useState<string | Array<string>>("");
  const MAX_IMAGE = 4;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > MAX_IMAGE) {
      alert(`Maximum of ${MAX_IMAGE} images only!`);
      return false;
    }

    setImageFiles(acceptedFiles);
    setPreviewUrl(
      acceptedFiles.map((file) => window.URL.createObjectURL(file))
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    onDrop,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {previewUrl ? (
        <div className={styles.preview}>
          {Array.isArray(previewUrl) ? (
            previewUrl.map((url, index) => (
              <div key={index} className={styles.imgContainer}>
                <img key={url} src={url} alt="Preview" />
              </div>
            ))
          ) : (
            <div className={styles.imgContainer}>
              <img src={previewUrl} alt="Preview" />
            </div>
          )}
        </div>
      ) : (
        <p className={styles.label}>
          {isDragActive ? (
            <>Drop the files here ...</>
          ) : (
            <>Click or drag and drop image files here</>
          )}
        </p>
      )}
    </div>
  );
};

export default FileInput;
