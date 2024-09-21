import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import Error from './Error';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeaddUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';
// import appStore from '../utils/appStore';



const Header = () => {

  const navigate=useNavigate();
  const user =useSelector(store=>store.user)
  const dispatch=useDispatch();

  



const handleSignOut=()=>{
  signOut(auth).then(() => {
    // Sign-out successful.
    navigate("/");
  }).catch((error) => {
    // An error happened.
    <Error/>
  });
}
useEffect(()=>{
  const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid,email,displayName,photoURL} = user;
        dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
        navigate("/browse")
        
        // ...
      } else {
        // User is signed out
        // ...
        dispatch(removeaddUser());
        navigate("/");
      }
    });
    return ()=>unsubscribe();
},[]);


  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between">
        
            <img  className="w-44"
            src={LOGO}
            alt="logo"/>
        
        {user && (<div className="flex p-2">
          <img
          className="w-10 h-12"
          src={user?.photoURL}
          alt="User"/>
          <button onClick={handleSignOut} className="font-bold text-white">(Sign Out)</button>
        </div>)}
    </div>
  )
}

export default Header