import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from "./MovieList"

const GptMovieSuggsection = () => {
  const gpt = useSelector(store => store.gpt);
  const { movieNames, movieResults } = gpt;
  
  if (!movieNames) {
    return null;
  }
  
  return (
    <div className='p-4 bg-black text-white'>
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
      {movieNames.map((movieName, index) => (
        <MovieList
          key={movieName}
          title={movieName}
          movies={movieResults[index]}
        />
      ))}
    </div>
  </div>
  
  )
}

export default GptMovieSuggsection;
