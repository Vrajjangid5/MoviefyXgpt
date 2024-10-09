import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from '../utils/constants'
// import { useDispatch } from 'react-redux'
import { addNowPopularMovies } from '../utils/movieSlice'
import { useEffect } from "react";

const usePopularMovies =()=>{
    const dispatch=useDispatch();
    const nowPopularMovies = useSelector((store)=>store.movies.nowPopularMovies)

    const getPopularMovies=async()=>{
      const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1',API_OPTIONS);
      const json = await data.json();
    //   console.log(json);
      dispatch(addNowPopularMovies(json.results))
    }
  
    useEffect(()=>{
       !nowPopularMovies && getPopularMovies();
    },[]);
};

export default usePopularMovies;