import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

const App = () => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [uploadedFile, setUploadedFile] = useState({});
  const [loading, setLoading] = useState(false);
  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
  const [inputKey, setInputKey] = useState(Date.now()); // Add this state

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFilename(event.target.files[0].name);
  };

  const handleDeleteImage = async () => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/delete`, {
        data: { productId: uploadedFile.public_id },
      });

      setUploadedFile({});
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "usu19oi8");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      setUploadedFile({
        public_id: response.data.public_id,
        url: response.data.url,
        signature: response.data.signature,
      });
      setFile(null); // Clear the file state
      setFilename(''); // Clear the filename state
      setInputKey(Date.now()); // Reset the key, forcing a re-render of the file input
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {}, [uploadedFile]);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input  key={inputKey} onChange={handleFileChange} type="file" />
        </div>
        <button type="submit" disabled={loading}>
          Upload
        </button>
      </form>
      {loading ? (
        <p>Processing...</p>
      ) : (
        uploadedFile.public_id && (
          <div>
            <h3>Uploaded File:</h3>
            <label>{filename}</label>
            <img
              src={uploadedFile.url}
              width={400}
              height={400}
              alt="uploaded image"
            />
            <button onClick={handleDeleteImage}>Delete</button>
          </div>
        )
      )}
    </div>
  );
};

export default App;
