import React, { useRef, useState} from 'react'
import Header from './Header'
import {checkValidData} from "../utils/validate"
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword, updateProfile} from "firebase/auth"; 
import {auth} from "../utils/firebase"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {

    const [isSignForm,setisSignForm]=useState(true);
    const [errorMessage,seterrorMessage]=useState(null);
    const navigate=useNavigate();
    const dispatch = useDispatch();


    const togleSignUpForm=()=>{
        setisSignForm(!isSignForm);
    }

    const name=useRef(null)
    const email=useRef(null);
    const password=useRef(null);

    const handleButtonClick=()=>{
        //validation form
        // console.log(email.current.value);
        // console.log(password.current.value);
        const message=checkValidData(email.current.value,password.current.value);
        // console.log(message);
        seterrorMessage(message);
        //if any msg we get then we dont want that any use sign in or sign up
        if(message) return;

        if(!isSignForm){
                //sign up logic
                createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
                .then((userCredential) => {
                  // Signed up 
                  const user = userCredential.user;
                  updateProfile(user, {
                    displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/94829041?v=4"
                  }).then(() => {
                    // Profile updated!
                    const {uid,email,displayName,photoURL} = auth.currentUser;
              dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
                    navigate("/browse")
                    // ...
                  }).catch((error) => {
                    // An error occurred
                    seterrorMessage(error.message)
                    // ...
                  });
                  console.log(user);
                 
                  // ...
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  seterrorMessage(errorCode + "-" + errorMessage);
                  // ..
                });


        }else{
            //sign in logic
                            signInWithEmailAndPassword(auth, email.current.value,password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                    navigate("/browse")
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    seterrorMessage(errorCode + "-" + errorMessage);
                });
        }
    }


  return (
    <div>
        <Header/>
        <div className="absolute">
            <img className="size-full" src="https://assets.nflxext.com/ffe/siteui/vlv3/dae1f45f-c2c5-4a62-8d58-6e1b0c6b2d8e/6d1fb8a4-5844-42a4-9b01-1c6c128acf19/IN-en-20240827-TRIFECTA-perspective_WEB_c292a608-cdc6-4686-8dc8-405bfcf753af_small.jpg"
            alt="backGroundING"/>
        </div>
        <form onSubmit={(e)=>e.preventDefault()} className=" w-3/12  absolute p-12 bg-black my-36 mx-auto left-0 right-0 text-white rounded-lg bg-opacity-80">
            <h1 className="font-bold text-3xl py-4 rounded-lg">{isSignForm?"Sign In":"Sign Up"}</h1>
            {!isSignForm && <input type="text" ref={name} placeholder="Full Name" className="p-4 my-4 w-full bg-gray-800 rounded-lg"></input>}
            <input type="text" placeholder="Email Address" ref={email} className="p-4 my-4 w-full bg-gray-800 rounded-lg"></input>
            
            <input type="password" placeholder="Password" ref={password} className="p-4 my-2 w-full bg-gray-800 rounded-lg"></input>
            
            <p className="text-red-600 font-bold text-lg">{errorMessage}</p>
            <button className="p-4 my-6 w-full bg-red-800 rounded-lg" onClick={handleButtonClick}>{isSignForm?"Sign In":"Sign Up"}</button>
            <p className="py-4 cursor-pointer" onClick={togleSignUpForm}>{isSignForm?"New to Moviefy? Sign Up Now":"Already registered? Sign In Now."}</p>
        </form>
    </div>
  )
}

export default Login