import React, { useEffect, useState } from "react";
import axios from "axios";
function FileUploader() {
  const [file, setFile] = useState();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", file);
    axios
      .post("http://localhost:8001/signup/upload", formData)
      .then((res) => {
        console.log(res);
        if (res.data.status === "Success") {
          console.log("Success");
        } else {
          console.log("Fail");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container">
        <input type="file" onChange={handleFile}></input>
        <button onClick={handleUpload}>Upload</button>
      </div>
    </>
  );
}
export default FileUploader;
