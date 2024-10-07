import React from 'react'
import { IMG_CDN } from '../utils/constants'

const MovieCard = ({posterPath}) => {
  return ( 
    <div className="w-48 pr-4 group">
  <img 
    className="rounded-lg shadow-lg transition-transform duration-300 transform group-hover:scale-105"
    alt='Movie card' 
    src={IMG_CDN + posterPath} 
  />
</div>

  )
}

export default MovieCard