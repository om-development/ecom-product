import { Link } from "react-router";

const ProductCard = ({ product, layout = "vertical" }) => {
  const imgSrc = product.image || product.thumbnail || "";

  const card = layout === "horizontal" ? (
    <div className="flex items-center gap-4 bg-surface rounded-xl shadow-md p-4 border border-neutral">
      <img
        src={imgSrc}
        alt={product.title}
        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-secondary truncate">{product.title}</h3>
        <p className="text-primary font-bold text-xl mt-1">${product.price}</p>
      </div>
    </div>
  ) : (
    <div className="bg-surface rounded-xl shadow-md border border-neutral overflow-hidden">
      <img
        src={imgSrc}
        alt={product.title}
        className="w-full h-52 object-cover"
      />
      <div className="p-5">
        <h3 className="text-xl font-semibold text-secondary">{product.title}</h3>
        <p className="text-primary font-bold text-2xl mt-1">${product.price}</p>
        <p className="text-secondary/70 mt-2 text-sm leading-relaxed">{product.description}</p>
      </div>
    </div>
  );

  return (
    <Link to={`/product/${product.id}`} className="block hover:ring-2 hover:ring-primary hover:rounded-xl transition-all">
      {card}
    </Link>
  );
};

export default ProductCard;