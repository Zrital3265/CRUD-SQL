import React from "react";
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [book, setBooks] = useState({
    title: "",
    description: "",
    cover: "",
    price: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  const bookId = location.pathname.split("/")[2];
  // console.log(bookId);

  const handleChange = (e) => {
    setBooks((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/books/${bookId}`, book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(book);
  return (
    <div className="form">
      <h2>Update the Book</h2>
      <input
        type="text"
        placeholder="title"
        name="title"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="description"
        name="description"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="price"
        name="price"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="cover"
        name="cover"
        onChange={handleChange}
      />
      <button className="formButton" onClick={handleClick}>
        Update
      </button>
    </div>
  );
};

export default Update;
