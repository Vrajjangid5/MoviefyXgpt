import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addTrailerVideo } from '../utils/movieSlice';

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const getMoviesData = async (movieId) => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );
      const json = await data.json();

      const filterData = json.results.filter((video) => video.type === 'Trailer');
      const trailer = filterData.length ? filterData[0] : json.results[0];
      // console.log(trailer);

      dispatch(addTrailerVideo(trailer));
    } catch (error) {
      console.error('Error fetching trailer video:', error);
    }
  };

  useEffect(() => {
    if (movieId) {
      getMoviesData(movieId);
    }
  }, [movieId]); // Added mId to the dependency array

};

export default useMovieTrailer;
