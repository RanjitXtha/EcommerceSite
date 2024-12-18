import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { doc, setDoc, deleteDoc, updateDoc, getDoc } from "firebase/firestore"; 
import { db } from "../firebase";
import { getStorage, deleteObject, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { RiFolderUploadLine } from "react-icons/ri";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [files, setFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        photoURLs: []
    });
    const [previewURLs, setPreviewURLs] = useState([]);

    useEffect(() => {
        const getProduct = async () => {
            const document = await getDoc(doc(db, "products", id));
            if (document.exists()) {
                const productData = document.data();
                setProduct(productData);
                setPreviewURLs(productData.photoURLs || []);
            } else {
                console.log("Product not found");
            }
        };
        getProduct();
    }, [id]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

        const newPreviewURLs = selectedFiles.map((file) => URL.createObjectURL(file));
        setPreviewURLs((prevURLs) => [...prevURLs, ...newPreviewURLs]);
    };

    const deleteImageFromStorage = async (url) => {
        const storage = getStorage();
        const storageRef = ref(storage, url);

        try {
            await deleteObject(storageRef);
            console.log('File deleted successfully');
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    const handleRemoveImage = async (index) => {
        const urlToRemove = previewURLs[index];

        if (product.photoURLs && product.photoURLs.includes(urlToRemove)) {
            await deleteImageFromStorage(urlToRemove);
        }

        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
        setPreviewURLs((prevURLs) => prevURLs.filter((_, i) => i !== index));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, description, price, category } = product;

        try {
            if (!name || !description) {
                throw new Error("Name or description is missing");
            }

            if (files.length > 4) {
                throw new Error("Maximum of 4 images allowed");
            }

            const productId = id;
            const storage = getStorage();
            const photoURLs = [];

            const uploadPromises = files.map((file) => {
                const storageRef = ref(storage, `products/${productId}/${file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);

                return new Promise((resolve, reject) => {
                    uploadTask.on(
                        'state_changed',
                        (snapshot) => {},
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

            const newUploadedFiles = [...product.photoURLs, ...photoURLs];
            setUploadedFiles(newUploadedFiles);

            await updateDoc(doc(db, "products", productId), {
                ...product,
                photoURLs: newUploadedFiles,
            });

            console.log('Product successfully updated with images.');
            navigate(`/product/${productId}`);

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
                }}>Edit Product</h1>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={product.name}
                        onChange={handleChange}
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
                        name="description"
                        placeholder="Description"
                        value={product.description}
                        onChange={handleChange}
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
                        name="price"
                        placeholder="Price"
                        value={product.price}
                        onChange={handleChange}
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
                        name="category"
                        placeholder="Category"
                        value={product.category}
                        onChange={handleChange}
                        style={{
                            padding: '10px',
                            fontSize: '16px',
                            borderRadius: '6px',
                            border: '1px solid #ccc',
                            outline: 'none',
                            transition: 'all 0.3s ease'
                        }}
                    />
                    <label htmlFor="uploadImage" style={{
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
                    <input id="uploadImage" type="file" multiple onChange={handleFileChange} style={{ display: 'none' }} />
                    <button type="submit" style={{
                        backgroundColor: 'black',
                        color: 'white',
                        padding: '10px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        border: 'none',
                        fontSize: '16px'
                    }}>Submit</button>
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
                                X
                            </button>
                        </div>
                    ))}
                </div>

                <button onClick={async () => {
                    await deleteDoc(doc(db, "products", id));
                    navigate("/shop");
                }} style={{
                    backgroundColor: 'red',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    border: 'none',
                    marginTop: '20px',
                    fontSize: '16px'
                }}>Delete this product</button>
            </div>
        </div>
    );
};

export default EditProduct;
