import React, { createContext, useState } from 'react';
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/firebase.init';
export const authContex=createContext()


const AuthProvider = ({children}) => {

    const[user,setUser]=useState()
    const [loader,setLoader]=useState(true)

    const createUser=(email,password)=>{
        setLoader(true)
       return createUserWithEmailAndPassword(auth,email,password);
    }

    const UserLogin=(email,password)=>{
        setLoader(true)
        return signInWithEmailAndPassword(auth,email,password)
    }





    const authInfo={
        user,
        loader,
        createUser,
        UserLogin
    }
    return (
        <authContex.Provider value={authInfo}>
            {children}
        </authContex.Provider>
    );
};

export default AuthProvider;