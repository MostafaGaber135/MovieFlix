import './App.css';
import Nav from './Components/Nav/Nav';
import HeroBanner from './Components/HeroBanner/HeroBanner';
import Movies from './Components/Movies/Movies';
import Favorites from './Components/Favorites/Favorites';
import Search from './Components/Search/Search';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import MovieDetails from './Components/MovieDetails/MovieDetails';
function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroBanner />
              <Movies />
            </>
          }
        />
        <Route path="/search" element={<Search />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </>
  );
}

export default App;
