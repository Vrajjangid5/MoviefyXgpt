import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({title,movies}) => {
  return (
    <div className='px-4 md:px-8 lg:px-16'>
  <h1 className='text-2xl md:text-3xl lg:text-4xl py-4 text-white'> {title}</h1>
  <div className='flex overflow-x-scroll p-6 space-x-4 scrollbar-thin scrollbar-thumb-gray-700'>
    <div className='flex'>
      {movies?.map(movie => (
        <MovieCard key={movie} posterPath={movie.poster_path} />
      ))}
    </div>
  </div>
</div>

  )
}

export default MovieList