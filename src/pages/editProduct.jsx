import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { doc, setDoc, deleteDoc, updateDoc, getDoc } from "firebase/firestore"; 
import { db } from "../firebase";
import { getStorage, deleteObject, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import '../cssFiles/insertproduct.css';
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

        // Only delete from storage if it's an existing URL
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
        <div>
            <h1>Edit Product</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={product.name}
                    onChange={handleChange}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={product.description}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={product.category}
                    onChange={handleChange}
                />
                <label htmlFor="uploadImage" 
                    style={{ cursor: 'pointer', fontSize: '2rem', display: 'flex', alignItems: 'center', columnGap: '1rem' }}>
                    Upload Images:
                    <RiFolderUploadLine style={{ fontSize: '4rem' }} />
                </label>
                <input id="uploadImage" type="file" multiple onChange={handleFileChange} style={{ display: 'none' }} />
                <button>Send</button>
            </form>

            <div style={{ display: 'flex', columnGap: '2rem' }}>
                {previewURLs.map((pic, index) => (
                    <div key={index} className="image-preview">
                        <img alt="upload picture" src={pic} />
                        <button onClick={() => handleRemoveImage(index)}>X</button>
                    </div>
                ))}
            </div>
            <button 
            onClick={
                async()=>{
                    await deleteDoc(doc(db, "products", id));
                    navigate("/shop")
                }
            }
            >Delete this product</button>
        </div>
    );
};

export default EditProduct;
