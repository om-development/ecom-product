import { Link } from "react-router";

const ProductCard = ({ product, layout = "vertical" }) => {
  const imgSrc = product.image || product.thumbnail || "";

  const card = layout === "horizontal" ? (
    <div className="flex items-center gap-4 bg-white rounded-xl shadow-md p-4 border border-blue-100">
      <img
        src={imgSrc}
        alt={product.title}
        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-blue-900 truncate">{product.title}</h3>
        <p className="text-primary font-bold text-xl mt-1">${product.price}</p>
      </div>
    </div>
  ) : (
    <div className="bg-white rounded-xl shadow-md border border-blue-100 overflow-hidden">
      <img
        src={imgSrc}
        alt={product.title}
        className="w-full h-52 object-cover"
      />
      <div className="p-5">
        <h3 className="text-xl font-semibold text-blue-900">{product.title}</h3>
        <p className="text-primary font-bold text-2xl mt-1">${product.price}</p>
        <p className="text-gray-600 mt-2 text-sm leading-relaxed">{product.description}</p>
      </div>
    </div>
  );

  return (
    <Link to={`/product/${product.id}`} className="block hover:opacity-90 transition">
      {card}
    </Link>
  );
};

export default ProductCard;