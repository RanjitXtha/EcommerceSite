import React from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../firebase";
import {  getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const Register=()=>{
    const navigate=useNavigate();
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const email = e.target[0].value;
        const displayName = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        
    try{
        if (!displayName || !file) {
          throw new Error("Username or file is missing");
        }
  
          const res =  await createUserWithEmailAndPassword(auth, email, password);
          const storage = getStorage();
          const date= new Date().getTime();
          const storageRef = ref(storage, `userprofile/${displayName+date}`);
  
          const uploadTask = uploadBytesResumable(storageRef, file);
  
          uploadTask.on('state_changed', 
          (snapshot) => {
       
          }, 
            (error) => {
              console.log(error);
            }, 
           () => {
              getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
                await updateProfile(res.user,{
                  displayName,
                  photoURL:downloadURL,
                });

                await setDoc(doc(db,"users",res.user.uid),{
                  uid:res.user.uid,
                  displayName,
                  email,
                  photoURL:downloadURL,
                })

                await setDoc(doc(db,"userCarts",res.user.uid),{
                  cart:[],
                  wishcart:[]
                })
                
                navigate("/");
              });
            }
          );
            }catch(error){
            console.log("error");
          };
  }
  
  
  return(
    <div>
        <h1>Register pages</h1>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="username" />
            <input type="password" placeholder="Password" />
            <input type="file" />
            <button>Send</button>
        </form>

    </div>
  )

}

export default Register;

