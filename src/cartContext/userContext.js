import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const UsersContext= createContext();

export const UsersContextProvider = ({children})=>{

    const [currentUser , setCurrentUser] = useState({});

    useEffect(()=>{
        const loggedin = onAuthStateChanged(auth, (user) => {
             setCurrentUser(user);
        });

        return()=>{
            loggedin();
        }

        },[]);
       

    return(
        <UsersContext.Provider value={{currentUser}}>
            {children}
        </UsersContext.Provider>
    )
}