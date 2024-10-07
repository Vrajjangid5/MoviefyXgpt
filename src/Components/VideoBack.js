import React from 'react'
import useNowPlayMovie from "../hooks/useMovieTrailer"

import { useSelector } from 'react-redux';

export const VideoBack = ({movieId}) => {

    // const [trailerkey,settrallerKey]=useState(null);
    useNowPlayMovie(movieId);
   
    const trailerVideo=useSelector(store=>store.movies?.trailerVideo);
 

  return (
   <div className='w-full relative'>
  <iframe
    className="w-full h-[250px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-lg border-4 border-gray-800"
    src={"https://www.youtube.com/embed/"+trailerVideo?.key +"?&autoplay=1&mute=1"}
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  ></iframe>
</div>

  )
}

