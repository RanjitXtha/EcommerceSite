import React from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const displayName = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    
    try {
      if (!displayName || !file) {
        throw new Error("Username or file is missing");
      }

      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storage = getStorage();
      const date = new Date().getTime();
      const storageRef = ref(storage, `userprofile/${displayName + date}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
        }, 
        (error) => {
          console.log(error);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userCarts", res.user.uid), {
              cart: [],
              wishcart: []
            });

            navigate("/");
          });
        }
      );
    } catch (error) {
      console.log("error");
    }
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    maxWidth: '400px',
    margin: '2rem auto',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.8rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '2rem',
    outline: 'none',
    transition: 'border-color 0.3s ease'
  };

  const inputFocusStyle = {
    borderColor: '#007BFF'
  };

  return (
    <div style={{margin:'2rem 5rem',height:'100vh'}}>
      <a href="/home" style={{fontSize:'3rem'}}>Back to Home</a>
      <h1>Register page</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input type="email" placeholder="Email" style={inputStyle} />
        <input type="text" placeholder="Username" style={inputStyle} />
        <input type="password" placeholder="Password" style={inputStyle} />
        <input type="file" style={inputStyle} />
        <button style={{marginTop:'2rem'}} className="shop-button">Send</button>
      </form>
      <p style={{textAlign:'center', fontSize:'2rem'}}><a href="/login" >Already have an account?</a></p>
    </div>
  );
};

export default Register;
