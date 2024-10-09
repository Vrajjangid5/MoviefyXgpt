import React from 'react'

const VideoTitle = ({title ,overview}) => {
  return (
    <div className='w-full aspect-video pt-[15%] px-6 sm:px-12 md:px-24 absolute text-white bg-gradient-to-r from-black via-gray-900 to-transparent'>
  <h1 className='text-4xl md:text-6xl font-bold'>{title}</h1>
  <p className='py-4 text-md md:text-lg lg:text-xl w-full md:w-1/2'>{overview}</p>
  <div className='flex'>
    <button className='bg-white text-black p-2 md:p-3 px-6 md:px-10 text-lg md:text-xl font-bold rounded-md hover:bg-opacity-80 transition-all'>◀️Play</button>
    <button className='bg-white text-black p-2 md:p-3 mx-2 px-6 md:px-9 text-lg md:text-xl font-bold rounded-md hover:bg-opacity-80 transition-all'>🚫More Info</button>
  </div>
</div>


  )
}

export default VideoTitle