import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./mySpace.css";
import { updateUser } from "../Redux/UserSlice";
import { useNavigate, useParams } from "react-router-dom";
import { getUserPosts } from "../Redux/PostSlice";
import Container from "../Components/Container";
import { toast } from "react-toastify";

function MySpace() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const { auth } = useSelector((state) => state);
  const [editUser, setEditUser] = useState({
    firstName: auth?.userLoggedIn?.found?.firstName,
    lastName: auth?.userLoggedIn?.found?.lastName,
  });

  const handleClick = (e) => {
    setOpen(!open);
  };
  const handleChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    handleClick();
    dispatch(updateUser({ editUser, id, navigate, toast }));
  };

  ////////////////////////
  const { posts } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getUserPosts());
  }, [dispatch]);

  ////////////////////////

  return (
    <div className="profile-container">
      <div className="profile">
        <center>
          <h2>
            Welcome {auth?.userLoggedIn?.found?.firstName} ! Add your Posts
          </h2>
        </center>
        <div className="prof-sec">
          <img
            className="prof-img"
            src={auth?.userLoggedIn?.found?.urlImg}
          ></img>
          <div className="prof-infos">
            <div> Your Profile </div>
            <label>
              First Name :
              {open ? (
                auth?.userLoggedIn?.found?.firstName
              ) : (
                <input
                  name="firstName"
                  defaultValue={auth?.userLoggedIn?.found?.firstName}
                  onChange={handleChange}
                ></input>
              )}
            </label>

            <label>
              Last Name :
              {open ? (
                auth?.userLoggedIn?.found?.lastName
              ) : (
                <input
                  name="lastName"
                  defaultValue={auth?.userLoggedIn?.found?.lastName}
                  onChange={handleChange}
                ></input>
              )}
            </label>

            {open ? (
              <button onClick={handleClick}>Edit</button>
            ) : (
              <button type="submit" onClick={handleSubmit}>
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="Prof-post">
        <div>
          <h1>POSTS</h1>
        </div>
        <div>
          all Posts Here
          {posts?.allPosts?.map((el) => {
            return <Container title={el.title} post={el.post} id={el._id} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default MySpace;
