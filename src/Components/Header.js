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

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/");
    }).catch(() => <Error />);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeaddUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGptSearch = () => {
    dispatch(toggleGptSearchView());
  }

  const handleLanguage = (e) => {
    dispatch(changeLanguage(e.target.value));
  }

  return (
    <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black px-4 py-3 md:px-8 lg:px-16 flex justify-between items-center z-20">
    {/* Logo */}
    <img 
      className="w-28 md:w-36 lg:w-44 transform transition-transform duration-300 hover:scale-105"
      src={LOGO} 
      alt="logo" 
    />
  
    {/* User Menu */}
    {user && (
      <div className="flex items-center space-x-3 md:space-x-4">
        {/* Language Selector */}
        {showGptSearch && (
          <select 
            className="p-1 md:p-2 bg-gray-700 text-white rounded-lg text-sm md:text-base"
            onChange={handleLanguage}
          >
            <option value="en">English</option>
            <option value="hindi">Hindi</option>
            <option value="spanish">Spanish</option>
          </select>
        )}
  
        {/* GPT Search Button */}
        <button 
          className="py-1 px-3 md:py-2 md:px-4 bg-purple-800 text-white rounded-lg hover:bg-purple-700 transition-all text-sm md:text-base"
          onClick={handleGptSearch}
        >
          {showGptSearch ? "Home" : "GPT Search"}
        </button>
  
        {/* User Profile Image */}
        <img 
          className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white" 
          src={user?.photoURL} 
          alt="User" 
        />
  
        {/* Sign Out Button */}
        <button 
          onClick={handleSignOut} 
          className="font-bold text-white px-3 py-1 md:px-4 md:py-2 bg-red-600 rounded-md hover:bg-red-500 transition text-sm md:text-base"
        >
          Sign Out
        </button>
      </div>
    )}
  </div>
  
  )
}

export default Header;
