import React, { useEffect, useState } from "react";
import "./movies.css";
import MovieCard from "../Components/MovieCard";
import Search from "../Components/Search";
import { getAllMovies } from "../Redux/MovieSlice";
import { useDispatch, useSelector } from "react-redux";

function Movies() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);
  const { allMovies } = useSelector((state) => state.movies);
  const { userLoggedIn } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const searchedMovie = allMovies?.filter((el) =>
    el.title.trim().toLowerCase().includes(search.trim().toLowerCase())
  );
  console.log(searchedMovie);
  return (
    <div className="container">
      {userLoggedIn && <Search setSearch={setSearch} />}
      <div className="mov-container">
        {searchedMovie?.map((el) => {
          return (
            <MovieCard
              urlImg={el.urlImg}
              title={el.title}
              descreption={el.descreption}
              rating={el.rating}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Movies;
