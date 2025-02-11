import React, { useEffect, useState } from "react";
import "../css/Home.css";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const req = await fetch("https://fakestoreapi.com/products");
      const res = await req.json();
      setProducts(res);
    };
    fetchData();
  }, []);
  return (
    <div className="home-container">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.title} className="product-img" />
          <h3 className="product-title">{product.title}</h3>
          <p className="product-description">{product.description}</p>
          <p className="product-price">${product.price}</p>
          <button className="buy-button">Buy</button>
        </div>
      ))}
    </div>
  );
};

export default Home;
