import { useState } from "react";
import { addProduct } from "../api/productApi";

const AddProductForm = ({ onAddProduct }) => {
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
        description: "Added sucessfully",
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
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="bg-surface rounded-2xl p-6 sm:p-8 shadow-xl border border-neutral">
        <h2 className="text-secondary text-xl sm:text-2xl font-semibold mb-6 text-center">
          Add Product
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-secondary text-sm font-medium mb-1">Image URL</label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image Link Here "
                className="w-full px-4 py-2.5 rounded-lg border border-neutral text-secondary placeholder-secondary/40 bg-neutral focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <div>
              <label className="block text-secondary text-sm font-medium mb-1">Product Name</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter product name"
                className="w-full px-4 py-2.5 rounded-lg border border-neutral text-secondary placeholder-secondary/40 bg-neutral focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <div>
              <label className="block text-secondary text-sm font-medium mb-1">Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-2.5 rounded-lg border border-neutral text-secondary placeholder-secondary/40 bg-neutral focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-secondary text-accent font-semibold py-2.5 rounded-lg hover:bg-secondary/80 transition h-[42px]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddProductForm;
