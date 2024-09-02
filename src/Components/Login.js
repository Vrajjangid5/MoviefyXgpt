import React, { useState } from 'react'
import Header from './Header'

const Login = () => {

    const [isSignForm,setisSignForm]=useState(true);

    const togleSignUpForm=()=>{
        setisSignForm(!isSignForm);
    }



  return (
    <div>
        <Header/>
        <div className="absolute">
            <img className="size-full" src="https://assets.nflxext.com/ffe/siteui/vlv3/dae1f45f-c2c5-4a62-8d58-6e1b0c6b2d8e/6d1fb8a4-5844-42a4-9b01-1c6c128acf19/IN-en-20240827-TRIFECTA-perspective_WEB_c292a608-cdc6-4686-8dc8-405bfcf753af_small.jpg"
            alt="backGroundING"/>
        </div>
        <form className=" w-3/12  absolute p-12 bg-black my-36 mx-auto left-0 right-0 text-white rounded-lg bg-opacity-80">
            <h1 className="font-bold text-3xl py-4 rounded-lg">{isSignForm?"Sign In":"Sign Up"}</h1>
            {!isSignForm && <input type="text" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-800 rounded-lg"></input>}
            <input type="text" placeholder="Email Address" className="p-4 my-4 w-full bg-gray-800 rounded-lg"></input>
            <input type="password" placeholder="Password" className="p-4 my-2 w-full bg-gray-800 rounded-lg"></input>
            <button className="p-4 my-6 w-full bg-red-800 rounded-lg">{isSignForm?"Sign In":"Sign Up"}</button>
            <p className="py-4 cursor-pointer" onClick={togleSignUpForm}>{isSignForm?"New to Moviefy? Sign Up Now":"Already registered? Sign In Now."}</p>
        </form>
    </div>
  )
}

export default Login