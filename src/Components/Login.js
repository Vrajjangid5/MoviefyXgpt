import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"; 
import { auth } from "../utils/firebase";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { PHOTO_AVTAR } from '../utils/constants';

const Login = () => {
  const [isSignForm, setIsSignForm] = useState(true); // Toggles between Sign In and Sign Up
  const [errorMessage, setErrorMessage] = useState(null); // Handles error messages
  const dispatch = useDispatch();

  // References for form inputs
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  // Toggles between Sign In and Sign Up forms
  const toggleSignUpForm = () => {
    setIsSignForm(!isSignForm);
  };

  // Handles the Sign In/Sign Up button click
  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    // If there's any error message, stop the process
    if (message) return;

    if (!isSignForm) {
      // Sign Up logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, 
            photoURL: PHOTO_AVTAR
          }).then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({ uid, email, displayName, photoURL }));
            // navigate("/browse");
          }).catch((error) => {
            setErrorMessage(error.message);
          });
        })
        .catch((error) => {
          setErrorMessage(error.code + " - " + error.message);
        });
    } else {
      // Sign In logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          // navigate("/browse");
        })
        .catch((error) => {
          setErrorMessage(error.code + " - " + error.message);
        });
    }
  };

  return (
    <div className="relative h-screen">
      {/* Header Component */}
      <Header />

      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          className="w-full h-full object-cover" 
          src="https://assets.nflxext.com/ffe/siteui/vlv3/dae1f45f-c2c5-4a62-8d58-6e1b0c6b2d8e/6d1fb8a4-5844-42a4-9b01-1c6c128acf19/IN-en-20240827-TRIFECTA-perspective_WEB_c292a608-cdc6-4686-8dc8-405bfcf753af_small.jpg"
          alt="Background"
        />
      </div>

      {/* Login Form */}
      <form 
        onSubmit={(e) => e.preventDefault()} 
        className="absolute w-11/12 md:w-1/3 lg:w-1/4 p-8 bg-black bg-opacity-80 text-white rounded-lg my-40 mx-auto left-0 right-0"
      >
        <h1 className="font-bold text-3xl py-4">{isSignForm ? "Sign In" : "Sign Up"}</h1>

        {!isSignForm && (
          <input 
            type="text" 
            ref={name} 
            placeholder="Full Name" 
            className="p-4 my-4 w-full bg-gray-800 rounded-lg" 
          />
        )}

        <input 
          type="text" 
          ref={email} 
          placeholder="Email Address" 
          className="p-4 my-4 w-full bg-gray-800 rounded-lg" 
        />

        <input 
          type="password" 
          ref={password} 
          placeholder="Password" 
          className="p-4 my-4 w-full bg-gray-800 rounded-lg" 
        />

        {errorMessage && <p className="text-red-600 font-bold text-lg">{errorMessage}</p>}

        <button 
          className="p-4 my-6 w-full bg-red-600 hover:bg-red-500 rounded-lg transition-all" 
          onClick={handleButtonClick}
        >
          {isSignForm ? "Sign In" : "Sign Up"}
        </button>

        <p 
          className="py-4 cursor-pointer" 
          onClick={toggleSignUpForm}
        >
          {isSignForm ? "New to Moviefy? Sign Up Now" : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
