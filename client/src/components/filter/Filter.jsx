import { useSearchParams } from "react-router-dom";
import "./filter.scss";
import { useState } from "react";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    minPrice: searchParams.get("minPrice") || Math.max(),
    maxPrice: searchParams.get("maxPrice") || Math.min(),
    property: searchParams.get("property") || "",
    bedroom: searchParams.get("bedroom") || 0,
  })


  const handleChange = (key, value) => {
    setQuery(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div className="filter">
      <h1>
        Search results for <b>{searchParams.get("city")}</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">Location</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City Location"
            onChange={(e) => handleChange("city", e.target.value)}
            defaultValue={query.city}
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select name="type" id="type" onChange={(e) => handleChange("type", e.target.value)} defaultValue={query.type}>
            <option value="">any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="property">Property</label>
          <select name="property" id="property" onChange={(e) => handleChange("property", e.target.value)} defaultValue={query.property}>
            <option value="">any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <input
            onChange={(e) => handleChange("minPrice", e.target.value)}
            defaultValue={query.minPrice}
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="any"
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            onChange={(e) => handleChange("maxPrice", e.target.value)}
            defaultValue={query.maxPrice}
            type="text"
            id="maxPrice"
            name="maxPrice"
            placeholder="any"
          />
        </div>
        <div className="item">
          <label htmlFor="bedroom">Bedroom</label>
          <input
            onChange={(e) => handleChange("bedroom", e.target.value)}
            defaultValue={query.bedroom}
            type="text"
            id="bedroom"
            name="bedroom"
            placeholder="any"
          />
        </div>
        <button onClick={() => setSearchParams(query)}>
          <img src="/search.png" alt="" />
        </button>
      </div>
    </div>
  );
}

export default Filter;
