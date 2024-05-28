import {v4 as uuid} from  "uuid";
import React from "react";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../firebase";
import {  getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import '../cssFiles/insertproduct.css';
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
          if (!name || !description) {
              throw new Error("Name or description is missing");
          }

          if (files.length > 4) {
              throw new Error("Maximum of 4 images allowed");
          }

          const productId = uuid();
          const storage = getStorage();
          const photoURLs = [];

          const uploadPromises = files.map((file) => {
              const storageRef = ref(storage, `products/${productId}/${file.name}`);
              const uploadTask = uploadBytesResumable(storageRef, file);

              return new Promise((resolve, reject) => {
                  uploadTask.on(
                      'state_changed',
                      (snapshot) => {
                          
                      },
                      (error) => {
                          console.log(error);
                          reject(error);
                      },
                      async () => {
                          try {
                              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                              photoURLs.push(downloadURL);
                              resolve();
                          } catch (error) {
                              console.log(error);
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
              photoURLs: newUploadedFiles, // Store the array of URLs
              rating: 0,
          });

          console.log('Product successfully uploaded with images.');
          navigate('/');

      } catch (error) {
          console.log("Error:", error);
      }
  };

  return (
      <div>
          <h1>InsertProduct</h1>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
              <input type="text" placeholder="Name" />
              <textarea placeholder="Description" />
              <input type="number" placeholder="Price" />
              <input type="text" placeholder="Category" />
              <label htmlFor="uploadImage" 
              style={{ cursor: 'pointer',fontSize:'2rem' ,display: 'flex', alignItems: 'center',columnGap:'1rem' }}>
                Upload Images: 
                <RiFolderUploadLine style={{fontSize:'4rem'}} />
              </label>
              <input id="uploadImage" type="file" multiple onChange={handleFileChange}  style={{display:'none'}}/> {/* Allow multiple file selection */}
              <button>Send</button>
          </form>

          <div style={{display:'flex' , columnGap:'2rem'}}>
            {
                previewURLs.length >0?
                previewURLs.map((pic,index)=>(
                    <div key={index} className="image-preview">
                        <img alt="upload picture" src={pic} />

                        <button onClick={()=>handleRemoveImage(index)}>X</button>
                    </div>  
                )):null
                
            }
          </div>
      </div>
  );
};
export default InsertProduct