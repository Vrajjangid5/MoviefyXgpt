import React from 'react'
import useNowPlayMovie from "../hooks/useMovieTrailer"

import { useSelector } from 'react-redux';

export const VideoBack = ({movieId}) => {

    // const [trailerkey,settrallerKey]=useState(null);
    useNowPlayMovie(movieId);
   
    const trailerVideo=useSelector(store=>store.movies?.trailerVideo);
 

  return (
   <div className='w-screen'>    
        <iframe
          className="w-screen aspect-video"
        src={"https://www.youtube.com/embed/"+trailerVideo?.key +"?&autoplay=1&mute=1"}
        title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay;
         clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>

   </div>
  )
}

