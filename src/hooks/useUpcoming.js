import { useDispatch } from "react-redux";
import { API_OPTIONS } from '../utils/constants'
// import { useDispatch } from 'react-redux'
import { addUpcomigMovies } from '../utils/movieSlice'
import { useEffect } from "react";

const useUpcoming =()=>{
    const dispatch=useDispatch();

    const getUpcomingMovies=async()=>{
      const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1',API_OPTIONS);
      const json = await data.json();
    //   console.log(json);
      dispatch(addUpcomigMovies(json.results))
    }
  
    useEffect(()=>{
        getUpcomingMovies();
    },[]);
};

export default useUpcoming;