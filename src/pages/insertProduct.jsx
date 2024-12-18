import { v4 as uuid } from "uuid";
import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { RiFolderUploadLine } from "react-icons/ri";

const InsertProduct = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

    const newPreviewURLs = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewURLs((prevURLs) => [...prevURLs, ...newPreviewURLs]);
  };

  const handleRemoveImage = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setPreviewURLs((prevURLs) => prevURLs.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const description = e.target[1].value;
    const price = e.target[2].value;
    const category = e.target[3].value;

    try {
      if (!name || !description) throw new Error("Name or description is missing");
      if (files.length > 4) throw new Error("Maximum of 4 images allowed");

      const productId = uuid();
      const storage = getStorage();
      const photoURLs = [];

      const uploadPromises = files.map((file) => {
        const storageRef = ref(storage, `products/${productId}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {},
            (error) => reject(error),
            async () => {
              try {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                photoURLs.push(downloadURL);
                resolve();
              } catch (error) {
                reject(error);
              }
            }
          );
        });
      });

      await Promise.all(uploadPromises);

      const newUploadedFiles = [...uploadedFiles, ...photoURLs];
      setUploadedFiles(newUploadedFiles);

      await setDoc(doc(db, "products", productId), {
        productId,
        name,
        description,
        category,
        price,
        photoURLs: newUploadedFiles,
        rating: 0,
      });

      console.log('Product successfully uploaded with images.');
      navigate('/');

    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#f4f4f9', 
      padding: '20px' 
    }}>
      <div style={{ 
        width: '500px', 
        backgroundColor: 'white', 
        padding: '30px', 
        borderRadius: '8px', 
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)' 
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: '20px', 
          color: '#333' 
        }}>Insert Product</h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="text" 
            placeholder="Name" 
            style={{
              padding: '10px',
              fontSize: '16px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              outline: 'none',
              transition: 'all 0.3s ease'
            }} 
          />
          <textarea 
            placeholder="Description" 
            style={{
              padding: '10px',
              fontSize: '16px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              outline: 'none',
              height: '80px',
              resize: 'none',
              transition: 'all 0.3s ease'
            }} 
          />
          <input 
            type="number" 
            placeholder="Price" 
            style={{
              padding: '10px',
              fontSize: '16px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              outline: 'none',
              transition: 'all 0.3s ease'
            }} 
          />
          <input 
            type="text" 
            placeholder="Category" 
            style={{
              padding: '10px',
              fontSize: '16px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              outline: 'none',
              transition: 'all 0.3s ease'
            }} 
          />
          <label 
            htmlFor="uploadImage" 
            style={{ 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              columnGap: '10px', 
              color: '#555',
              fontSize: '18px' 
            }}>
            Upload Images: 
            <RiFolderUploadLine style={{ fontSize: '32px' }} />
          </label>
          <input 
            id="uploadImage" 
            type="file" 
            multiple 
            onChange={handleFileChange} 
            style={{ display: 'none' }} 
          />
          <button 
            type="submit" 
           className="shop-button "
           style={{backgroundColor:'black', color:'white'}}
          
          >
            Submit
          </button>
        </form>

        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          marginTop: '20px', 
          gap: '15px' 
        }}>
          {previewURLs.map((pic, index) => (
            <div key={index} style={{ 
              position: 'relative', 
              width: '80px', 
              height: '80px', 
              borderRadius: '8px', 
              overflow: 'hidden', 
              border: '2px solid #ddd' 
            }}>
              <img 
                alt="upload preview" 
                src={pic} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover' 
                }} 
              />
              <button 
                onClick={() => handleRemoveImage(index)} 
                style={{ 
                  position: 'absolute', 
                  top: '5px', 
                  right: '5px', 
                  backgroundColor: 'red', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '50%', 
                  width: '24px', 
                  height: '24px', 
                  cursor: 'pointer',
                  fontSize: '14px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsertProduct;
