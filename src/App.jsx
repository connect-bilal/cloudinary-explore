import { useState } from 'react';
import axios from 'axios';


import './App.css';


function App() {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('');
  const [uploadedFile, setUploadedFile] = useState({});

  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_SECRET_KEY = import.meta.env.VITE_API_SECRETS_KEY;

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFilename(event.target.files[0].name);
  };

  const generateSHA1 =() => {
    const hash = crypto.createHash("sha1");
    hash.update(data);
    return hash.digest("hex");
}

const generateSignature = (publicId, apiSecret) => {
	const timestamp = new Date().getTime();
	return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};


  const handleDeleteImage = async () => {
    // const signature = generateSHA1(generateSignature(publicId = uploadedFile.public_id, apiSecret=API_SECRET_KEY));
    const timestamp = new Date().getTime();
    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`;

    try {
      const response = await axios.post(url, {
        public_id: uploadedFile.public_id,
        signature: signature,
        api_key: API_KEY,
        timestamp: timestamp,
      });

      console.error(response);

    } catch (error) {
      console.error(error);
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'usu19oi8');

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      setUploadedFile({
        public_id: response.data.public_id,
        url: response.data.url,
        signature: response.data.signature,
      })
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input onChange={handleFileChange} type="file" />
          <label>{filename}</label>
        </div>
        <button type="submit">Upload</button>
      </form>

      <img src={uploadedFile.url} alt="uploaded image"/>
      <button onClick={handleDeleteImage}>Delete</button>
    </>
  );
}

export default App;
