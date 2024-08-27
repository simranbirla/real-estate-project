import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import "./searchBar.scss";

const types = ["buy", "rent"];

function SearchBar() {
  const navigate = useNavigate()

  const [query, setQuery] = useState({
    type: "buy",
    city: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleChange = (key, value) => {
    setQuery(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/list?type=${query.type}&city=${query.city}&minPrice=${query.maxPrice}&maxPrice=${query.maxPrice}`)
  }

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="city" placeholder="City Location" onChange={(e) => handleChange("city", e.target.value)} />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="Min Price"
          onChange={(e) => handleChange("minPrice", e.target.value)}
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Max Price"
          onChange={(e) => handleChange("maxPrice", e.target.value)}
        />
        <button>
          <img src="/search.png" alt="" />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
