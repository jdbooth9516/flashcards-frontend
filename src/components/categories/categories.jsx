import React, { useState, useEffect } from "react";
import Cards from '../cards/cards';
import axios from "axios";
import './categories.css'

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [id, setId] = useState(0)

  useEffect(() => {
    async function getData() {
      const response = await axios.get("http://127.0.0.1:8000/categories/");
      setCategories(response.data);
      console.log(response.data);
    }
    getData();
  }, []);



  return (
    <div className="main-container">
      <div className='cat-container'>
      {categories.map((category) => (
        console.log(category),
        <h3 className="category-title" onClick={() => (setCardsVisible(
          true
        ), setId(category.id))}>{category.name}</h3>
      ))}
      </div>
      <div className='card-container'>
        {cardsVisible ? (<Cards categoryId={id}/>): null}
      </div>
    </div>
  );
}
