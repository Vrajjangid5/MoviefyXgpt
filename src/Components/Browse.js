
import Header from './Header'
import useNowPlayMovie from '../hooks/useMovies'
import MainConatiner from './MainConatiner';
import SecondContainer from './SecondContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRated';
import useUpcoming from '../hooks/useUpcoming';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';

const Browse = () => {
  useNowPlayMovie();
  usePopularMovies();
  useTopRatedMovies();
  useUpcoming();
  const showGptSearchh = useSelector(store => store.gpt.showGptSearch);
 
  return (
    <div>
      <Header/>
      {
        showGptSearchh?( <GptSearch/>):(<><MainConatiner/>
      <SecondContainer/></>)
      }
     
      
    </div>
  )
}

export default Browse