import { useState } from "react";
import Hero from "./components/Hero";
import Products from "./components/Products";
import AddProductForm from "./components/AddProductForm";
import "./index.css";

function HomePage() {
  const [products, setProducts] = useState([]);

  const handleAddProduct = (product) => {
    setProducts((prev) => [product, ...prev]);
  };

  return (
    <>
      <Hero />
      <Products products={products} setProducts={setProducts} />
      <AddProductForm onAddProduct={handleAddProduct} />
    </>
  );
}

export default HomePage;