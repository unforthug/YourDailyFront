import React from "react";
import AddMov from "./AddMov";
import "./search.css";
import { useDispatch, useSelector } from "react-redux";
import { SearchMovieByName } from "../Redux/MovieSlice";

function Search({ setSearch }) {
  const dispatch = useDispatch();

  const { userLoggedIn } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  return (
    <div className="cntSearch">
      <div className="ser-container">
        <h3 style={{ fontFamily: "Times New Roman", fontSize: "3rem" }}>
          Search
        </h3>
        <div>
          <label style={{ fontFamily: "Lucida Handwriting" }}>By name : </label>
          <br />
          <input placeholder="Enter name here" onChange={handleChange}></input>
        </div>
      </div>
      {userLoggedIn?.found?.Role === "admin" ? (
        <div className="ads">
          <AddMov />
        </div>
      ) : null}
    </div>
  );
}

export default Search;
