import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { getProduct } from "../api/productApi";
import { Link } from "react-router";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct(id).then(setProduct).catch(console.error);
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center flex-1 py-32">
        <p className="text-xl text-primary">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-5xl mx-auto px-4 py-12 w-full">
      <Link to="/" className="text-primary font-medium hover:text-primary/80 mb-6 inline-block transition">&larr; Back to Products</Link>
      <div className="bg-surface rounded-2xl shadow-xl border border-neutral overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-80 md:h-full object-cover"
            />
          </div>
          <div className="p-8 md:w-1/2 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-secondary">{product.title}</h1>
            <p className="text-primary text-3xl font-bold mt-3">${product.price}</p>
            <p className="text-secondary/70 mt-4 leading-relaxed">{product.description}</p>
            {product.brand && (
              <p className="mt-4 text-sm text-secondary/70"><span className="font-semibold text-secondary">Brand:</span> {product.brand}</p>
            )}
            {product.category && (
              <p className="mt-1 text-sm text-secondary/70"><span className="font-semibold text-secondary">Category:</span> {product.category}</p>
            )}
            {product.rating && (
              <p className="mt-1 text-sm text-secondary/70"><span className="font-semibold text-secondary">Rating:</span> {product.rating} / 5</p>
            )}
            {product.stock && (
              <p className="mt-1 text-sm text-secondary/70"><span className="font-semibold text-secondary">Stock:</span> {product.stock} units</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;