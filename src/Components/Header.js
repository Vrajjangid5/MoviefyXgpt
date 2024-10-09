import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import Error from './Error';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeaddUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';
// import appStore from '../utils/appStore';



const Header = () => {

  const navigate=useNavigate();
  const user =useSelector(store=>store.user)
  const dispatch=useDispatch();
  const showGptSearch = useSelector((store)=>store.gpt.showGptSearch)
  



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

const handleGptSearch=()=>{
  dispatch(toggleGptSearchView())
}
const handleLanguage=(e)=>{
  dispatch(changeLanguage(e.target.value))
}

  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between items-center md:px-16 lg:px-24">
    <img 
      className="w-36 md:w-44 lg:w-52 transition-transform duration-300 transform hover:scale-105"
      src={LOGO}
      alt="logo"
    />
    {user && (
      <div className="flex items-center p-2 space-x-4">


        {showGptSearch &&(<select className='p-2 m-2 bg-gray-700 text-white' onChange={handleLanguage}>
          <option value="en">Engilsh</option>
          <option value="hindi">Hindi</option>

          <option value="spanish">Spanish</option>

        </select>)}


        <button className='py-2 px-4 m-2 bg-purple-800 text-white'
          onClick={handleGptSearch}
        >{showGptSearch?"Home":"GPT Search"} </button>
        <img
          className="w-10 h-10 rounded-full object-cover border-2 border-white"
          src={user?.photoURL}
          alt="User"
        />
        <button 
          onClick={handleSignOut} 
          className="font-bold text-white px-4 py-2 bg-red-600 rounded-md hover:bg-red-500 transition-all">
          Sign Out
        </button>
      </div>
    )}
  </div>
  
  )
}

export default Header