import "./App.css";
import Nav from "./Components/Nav/Nav";
import HeroBanner from "./Components/HeroBanner/HeroBanner";
import Movies from "./Components/Movies/Movies";
import Favorites from "./Components/Favorites/Favorites";
import Search from "./Components/Search/Search";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MovieDetails from "./Components/MovieDetails/MovieDetails";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import NotFound from "./Components/Notfound/Notfound";


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
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
