import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from "axios";
import MovieUpdateForm from "./components/MovieUpdateForm.js";




const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, [movieList]);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
      <AddMovie />
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
      <MovieUpdateForm movieList={movieList} setMovieList={setMovieList} />
      </Route>

    
      <Route path="/update-movie/:id">
        <Movie addToSavedList={addToSavedList} />
      </Route>
      
    </>

  );
};

export default App;
