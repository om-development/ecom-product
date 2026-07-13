import { useState } from "react";
import { addProduct } from "../api/productApi";

const Hero = ({ onAddProduct }) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !title || !price) return;

    try {
      const product = await addProduct({
        title,
        price: parseFloat(price),
        description: "Added via product form",
        images: [image],
        thumbnail: image,
      });
      onAddProduct({
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        image: product.thumbnail || product.images?.[0],
      });
      setImage("");
      setTitle("");
      setPrice("");
    } catch (err) {
      console.error("Failed to add product", err);
    }
  };

  return (
    <section className="flex items-center justify-center px-4 py-16 md:py-24">
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <div className="text-center md:text-left flex-1">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-primary">
            Welcome User!!
          </h1>
          <p className="mt-4 text-base sm:text-lg text-blue-600 max-w-md">
            Add your favourite products and build your collection.
          </p>
        </div>
        <div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-blue-200">
          <h2 className="text-primary text-xl sm:text-2xl font-semibold mb-6 text-center">
            Add Product
          </h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-blue-700 text-sm font-medium mb-1">Image URL</label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2.5 rounded-lg border border-blue-300 text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-blue-700 text-sm font-medium mb-1">Product Name</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter product name"
                className="w-full px-4 py-2.5 rounded-lg border border-blue-300 text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-blue-700 text-sm font-medium mb-1">Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-2.5 rounded-lg border border-blue-300 text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
