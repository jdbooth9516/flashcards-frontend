import React, { useState, useEffect } from "react";
import Cards from "../cards/cards";
import CreateCard from "../CreateCard/CreateCard";
import axios from "axios";
import "./categories.css";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [active, setActive] = useState(null);
  const [id, setId] = useState(0);

  useEffect(() => {
    async function getData() {
      const response = await axios.get("http://127.0.0.1:8000/categories/");
      setCategories(response.data);
    }
    getData();
  }, []);

  return (
    <div className="main-container">
      <div className="cat-container">
        {categories.map((category, index) => (
          <div>
            {active === index && (
              <h3
                className="category-title"
                onClick={() => (
                  setCardsVisible(true), setId(category.id), setActive(index)
                )}
                style={{ backgroundColor: "lightBlue" }}
              >
                {category.name}
              </h3>
            )}
            {active !== index && (
              <h3
                className="category-title"
                onClick={() => (
                  setCardsVisible(true), setId(category.id), setActive(index)
                )}
              >
                {category.name}
              </h3>
            )}
          </div>
        ))}
      </div>
      <div className="card-container">
        {cardsVisible ? (
          <Cards categoryId={id} total={categories[id - 1].total_cards} />
        ) : null}
      </div>
      <div>
        <button onClick={() => setCreateVisible(true)}>create card</button>
        {createVisible ? <CreateCard categories={categories} /> : null}
      </div>
    </div>
  );
}
