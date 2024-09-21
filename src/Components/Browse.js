
import Header from './Header'
import useNowPlayMovie from '../hooks/useMovies'
import MainConatiner from './MainConatiner';
import SecondContainer from './SecondContainer';


const Browse = () => {
  useNowPlayMovie();
 
  return (
    <div>
      <Header/>
      <MainConatiner/>
      <SecondContainer/>
    </div>
  )
}

export default Browse