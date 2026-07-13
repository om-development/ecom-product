import { useState } from "react";
import { useSearchParams } from "react-router";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [input, setInput] = useState(searchParams.get("q") || "");

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setSearchParams({ q: input.trim() });
    } else {
      setSearchParams({});
    }
  };

  const clearSearch = () => {
    setInput("");
    setSearchParams({});
  };

  return (
    <header className="sticky top-0 z-50 bg-primary">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <span className="text-white text-xl font-bold tracking-wide shrink-0">Store</span>

        <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md">
          <div className="relative w-full">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-1.5 rounded-lg text-sm text-blue-900 placeholder-blue-400 bg-white focus:outline-none"
            />
            {input && (
              <button type="button" onClick={clearSearch} className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-400 text-sm">&times;</button>
            )}
          </div>
        </form>

        <nav className="hidden md:flex space-x-6 text-white font-medium shrink-0">
          <a href="#" className="hover:opacity-80 transition">Home</a>
          <a href="#" className="hover:opacity-80 transition">Contact</a>
          <a href="#" className="hover:opacity-80 transition">About</a>
        </nav>

        <button className="md:hidden text-white text-2xl" onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-primary px-4 pb-4 space-y-3 text-white font-medium">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-1.5 rounded-lg text-sm text-blue-900 placeholder-blue-400 bg-white focus:outline-none"
            />
          </form>
          <a href="#" className="block hover:opacity-80 transition">Home</a>
          <a href="#" className="block hover:opacity-80 transition">Contact</a>
          <a href="#" className="block hover:opacity-80 transition">About</a>
        </div>
      )}
    </header>
  );
};

export default Header;
