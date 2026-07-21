import { useState, useEffect, useMemo } from "react";
import { getProducts } from "../api/productApi";
import ProductCard from "./ProductCard";
import { useSearchParams } from "react-router";

const Products = ({ products, setProducts }) => {
  const [layout, setLayout] = useState("vertical");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";
  const category = searchParams.get("category") || "";

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, [setProducts]);

  const filtered = useMemo(() => {
    let result = products;

    if (query) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    if (category) {
      result = result.filter((p) => p.category === category);
    }

    return result;
  }, [products, query, category]);

  const maxPage = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(currentPage, maxPage);

  const paginated = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage, pageSize]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-bold text-secondary">Products</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setLayout("vertical")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              layout === "vertical"
                ? "bg-secondary text-accent"
                : "bg-neutral text-secondary border border-neutral"
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setLayout("horizontal")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              layout === "horizontal"
                ? "bg-secondary text-accent"
                : "bg-neutral text-secondary border border-neutral"
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
              : "grid grid-cols-1 gap-4"
        }
      >
        {paginated.length === 0 ? (
          <p className="col-span-full text-center text-secondary/70 py-12 text-lg">No products found for "{query}".</p>
        ) : (
          paginated.map((product) => (
            <ProductCard key={product.id} product={product} layout={layout} />
          ))
        )}
      </div>

      {filtered.length > pageSize && (
        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={safePage <= 1}
            className="px-6 py-2 rounded-lg font-medium bg-secondary text-accent disabled:opacity-40 disabled:cursor-not-allowed hover:bg-secondary/80 transition"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={safePage >= maxPage}
            className="px-6 py-2 rounded-lg font-medium bg-secondary text-accent disabled:opacity-40 disabled:cursor-not-allowed hover:bg-secondary/80 transition"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default Products;