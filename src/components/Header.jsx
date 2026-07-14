import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import { getCategories } from "../api/productApi";

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [input, setInput] = useState(searchParams.get("q") || "");
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const dropdownRef = useRef(null);

  const selectedCategory = searchParams.get("category") || "";

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowCategories(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (input.trim()) {
      params.set("q", input.trim());
    } else {
      params.delete("q");
    }
    setSearchParams(params);
  };

  const clearSearch = () => {
    setInput("");
    setSearchParams({});
  };

  const handleCategoryChange = (cat) => {
    setShowCategories(false);
    const params = new URLSearchParams(searchParams);
    if (cat) {
      params.set("category", cat);
    } else {
      params.delete("category");
    }
    setSearchParams(params);
  };

  return (
    <header className="sticky top-0 z-50 bg-page-bg border-b border-neutral">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <span className="text-secondary text-xl font-bold tracking-wide shrink-0">
          Store
        </span>

        <form onSubmit={handleSearch} className="flex-1 max-w-md">
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

        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setShowCategories(!showCategories)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium bg-surface text-secondary border border-neutral hover:ring-2 hover:ring-secondary transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z" clipRule="evenodd" />
            </svg>
            {selectedCategory || "Category"}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </button>

          {showCategories && (
            <div className="absolute top-full right-0 mt-2 w-64 max-h-80 overflow-y-auto bg-surface border border-neutral rounded-xl shadow-xl p-3 z-50">
              <label className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-neutral transition text-sm">
                <input
                  type="radio"
                  name="category"
                  value=""
                  checked={!selectedCategory}
                  onChange={() => handleCategoryChange("")}
                  className="accent-secondary"
                />
                <span className="text-secondary font-medium">All</span>
              </label>
              <hr className="my-1 border-neutral" />
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-neutral transition text-sm"
                >
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={selectedCategory === cat}
                    onChange={() => handleCategoryChange(cat)}
                    className="accent-secondary"
                  />
                  <span className="text-secondary capitalize">
                    {cat.replace(/-/g, " ")}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
