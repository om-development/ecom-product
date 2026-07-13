import { useState, useEffect, useMemo } from "react";
import { getProducts } from "../api/productApi";
import ProductCard from "./ProductCard";
import { useSearchParams } from "react-router";

const Products = ({ products, setProducts }) => {
  const [layout, setLayout] = useState("vertical");
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  useEffect(() => {
    getProducts(30).then(setProducts).catch(console.error);
  }, [setProducts]);

  const filtered = useMemo(
    () =>
      query
        ? products.filter(
            (p) =>
              p.title.toLowerCase().includes(query) ||
              p.description.toLowerCase().includes(query)
          )
        : products,
    [products, query]
  );

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-bold text-primary">Products</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setLayout("vertical")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              layout === "vertical"
                ? "bg-primary text-accent"
                : "bg-page-bg text-secondary border border-neutral"
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setLayout("horizontal")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              layout === "horizontal"
                ? "bg-primary text-accent"
                : "bg-page-bg text-secondary border border-neutral"
            }`}
          >
            List
          </button>
        </div>
      </div>

      <div
        className={
            layout === "vertical"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        }
      >
        {filtered.length === 0 ? (
          <p className="col-span-full text-center text-secondary/70 py-12 text-lg">No products found for "{query}".</p>
        ) : (
          filtered.map((product) => (
            <ProductCard key={product.id} product={product} layout={layout} />
          ))
        )}
      </div>
    </section>
  );
};

export default Products;