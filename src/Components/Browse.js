
import Header from './Header'
import useNowPlayMovie from '../hooks/useMovies'
import MainConatiner from './MainConatiner';
import SecondContainer from './SecondContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRated';
import useUpcoming from '../hooks/useUpcoming';


const Browse = () => {
  useNowPlayMovie();
  usePopularMovies();
  useTopRatedMovies();
  useUpcoming();
 
  return (
    <div>
      <Header/>
      <MainConatiner/>
      <SecondContainer/>
    </div>
  )
}

export default Browse