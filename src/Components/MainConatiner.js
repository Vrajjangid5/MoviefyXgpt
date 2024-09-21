import React from 'react'
import { useSelector } from 'react-redux';
import { VideoBack } from './VideoBack';
import VideoTitle from './VideoTitle';

const MainConatiner = () => {

    const movies=useSelector(store =>store.movies?.nowPlayingMovies)
    if(movies===null) return null;
    const mainMovie=movies[0];
    console.log(mainMovie);

    const {original_title,overview,id}=mainMovie;

  return (
    <div>

            <VideoTitle 
               title={original_title}
               overview={overview}
            />
            <VideoBack 
             movieId={id}
            />
            

    </div>
  )
}
export default MainConatiner;