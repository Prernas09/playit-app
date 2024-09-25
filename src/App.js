import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [videoUrl, setVideoUrl] = useState(null)

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return alert('Please select a file to upload.');

    const formData = new FormData();
    formData.append('video', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setVideoUrl(response.data.videoUrl);
    } catch (error) {
      console.error('Error uploading the file:', error);
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <h2>Playit-app</h2>
        <form onSubmit={handleUpload}>
          <input type='file' accept='video/*' onChange={handleFileChange}></input>
          <button type='submit'>Submit</button>
        </form>

        {videoUrl && (
          <div>
            <h2>Uploaded Video:</h2>
            <video controls width="600">
              <source src={videoUrl} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
