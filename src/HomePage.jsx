import { useState } from "react";
import Hero from "./components/Hero";
import Products from "./components/Products";
import "./index.css";

function HomePage() {
  const [products, setProducts] = useState([]);

  const handleAddProduct = (product) => {
    setProducts((prev) => [product, ...prev]);
  };

  return (
    <>
      <Hero onAddProduct={handleAddProduct} />
      <Products products={products} setProducts={setProducts} />
    </>
  );
}

export default HomePage;