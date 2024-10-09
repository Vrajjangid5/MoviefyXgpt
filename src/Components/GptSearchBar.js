import React, { useRef } from 'react'
import lang from '../utils/languageConstant'
import { useDispatch, useSelector } from 'react-redux';
import OPenAi from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {

    const langGpt= useSelector(store =>store.config.lang);
    const searchText=useRef(null)
    const dispatch= useDispatch()


    const searchMovieTmdb=async(movie)=>{
      const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+movie+"include_adult=false&language=en-US&page=1", API_OPTIONS)
      const json= await data.json();
      return json.results;
    }

    const handleGptSearch=async()=>{
      console.log(searchText.current.value)
      const gptQuery= "Act as the movie Recommendation system and suggest some movies for the query"+searchText.current.value+"only give 5 movies name , comma seprated like the exapmle result given ahead EXAMPLE:- Gadar, Sholey, Don, Dhamal, Golmal";
      const gptResult = await OPenAi.chat.completions.create({
        messages: [{ role: 'user', content: gptQuery }],
        model: 'gpt-3.5-turbo',
      });
      console.log(gptResult.choices?.[0]?.message?.content)
      const gptMovies= gptResult.choices?.[0]?.message?.content.split(",");
      const promiseArray = gptMovies.map(movie=>searchMovieTmdb(movie));


      const tmbdResult= Promise.all(promiseArray);
      dispatch(addGptMovieResult({movieNames:gptMovies,tmbdResult}));
    };


  return (
    <div className='pt-[8%] flex justify-center'>
        <form className=' w-1/2 bg-black grid  grid-cols-12' onSubmit={(e)=>e.preventDefault()}>
            <input type='text' ref={searchText} className='p-4 m-4 col-span-9 rounded-lg' placeholder={lang[langGpt].gptSearchPlaceholder}></input>
            <button className='py-2 px-4 col-span-3 m-4 bg-red-700 text-white rounded-lg' onClick={handleGptSearch}>{lang[langGpt].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar