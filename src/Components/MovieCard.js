import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Rating from "@mui/material/Rating";

function MovieCard({ title, descreption, urlImg, rating }) {
  const [showMore, setShowMore] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setShowMore(!showMore);
  };

  return (
    <div style={{ width: "20rem" }}>
      <Card style={{ width: "20rem", height: "55rem" }}>
        <Card.Img style={{ marginTop: "2rem" }} src={urlImg} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text style={{ color: "gray" }}>{descreption}</Card.Text>
          <Rating name="read-only" value={rating} readOnly max={10} />
        </Card.Body>
      </Card>
    </div>
  );
}

export default MovieCard;
