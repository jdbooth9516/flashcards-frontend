import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get("http://127.0.0.1:8000/categories/");
      setCategories(response.data);
    }
    getData();
  }, []);

  return (
    <div className="main-container">
      {categories.map((category) => (
        <h3 className="category-title">{category.name}</h3>
      ))}
    </div>
  );
}
