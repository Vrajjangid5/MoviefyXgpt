import React, { useRef } from 'react'
import lang from '../utils/languageConstant'
import { useDispatch, useSelector } from 'react-redux';
import OPenAi from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {

  const langGpt = useSelector(store => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTmdb = async (movie) => {
    const data = await fetch("https://api.themoviedb.org/3/search/movie?query=" + movie + "include_adult=false&language=en-US&page=1", API_OPTIONS);
    const json = await data.json();
    return json.results;
  }

  const handleGptSearch = async () => {
    const gptQuery = "Act as the movie Recommendation system and suggest some movies for the query " + searchText.current.value + " only give 5 movie names.";
    const gptResult = await OPenAi.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });
    
    const gptMovies = gptResult.choices?.[0]?.message?.content.split(",");
    const promiseArray = gptMovies.map(movie => searchMovieTmdb(movie));
    
    const tmbdResult = await Promise.all(promiseArray);
    dispatch(addGptMovieResult({ movieNames: gptMovies, tmbdResult }));
  };

  return (
    <div className='pt-16 md:pt-20 flex justify-center'>
      <form className='w-4/5 md:w-2/3 lg:w-1/2 bg-black rounded-lg grid grid-cols-12 shadow-lg' onSubmit={(e) => e.preventDefault()}>
        <input 
          type='text' 
          ref={searchText} 
          className='p-4 m-2 col-span-9 rounded-lg bg-gray-800 text-white focus:outline-none' 
          placeholder={lang[langGpt].gptSearchPlaceholder} 
        />
        <button 
          className='py-2 px-4 col-span-3 m-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition' 
          onClick={handleGptSearch}
        >
          {lang[langGpt].search}
        </button>
      </form>
    </div>
  )
}

export default GptSearchBar;
