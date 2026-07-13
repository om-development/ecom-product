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
    <header className="sticky top-0 z-50 bg-page-bg border-b border-neutral">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <span className="text-secondary text-xl font-bold tracking-wide shrink-0">
          Store
        </span>

        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center flex-1 max-w-md"
        >
          <div className="relative w-full">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search From here"
              className="w-full px-4 py-1.5 rounded-lg text-sm text-secondary placeholder-secondary/40 bg-surface focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            {input && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-secondary/50 text-sm"
              >
                &times;
              </button>
            )}
          </div>
        </form>

        <nav className="hidden md:flex space-x-6 text-secondary font-medium shrink-0">
          <a href="#" className="hover:text-secondary transition">
            Home
          </a>
          <a href="#" className="hover:text-secondary transition">
            Contact
          </a>
          <a href="#" className="hover:text-secondary transition">
            About
          </a>
        </nav>

        <button
          className="md:hidden text-secondary text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-page-bg px-4 pb-4 space-y-3 text-secondary font-medium border-t border-neutral">
          <form onSubmit={handleSearch} className="flex pt-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-1.5 rounded-lg text-sm text-secondary placeholder-secondary/40 bg-surface focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </form>
          <a href="#" className="block hover:text-secondary transition">
            Home
          </a>
          <a href="#" className="block hover:text-secondary transition">
            Contact
          </a>
          <a href="#" className="block hover:text-secondary transition">
            About
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
