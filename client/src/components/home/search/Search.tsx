import { CiSearch } from "react-icons/ci";
import "./search.scss";
import { useState } from "react";

export default function Search() {
  const [details, setDetails] = useState({
    type: "buy",
    location: "",
    min: "",
    max: "",
  });

  const handleSelectType = (value: string) => {
    setDetails((prev) => ({ ...prev, type: value }));
  };

  return (
    <div className="search">
      <div className="search-types">
        <div
          className={`${details.type === "buy" ? "active" : ""}`}
          onClick={() => handleSelectType("buy")}
        >
          Buy
        </div>
        <div
          className={`${details.type === "rent" ? "active" : ""}`}
          onClick={() => handleSelectType("rent")}
        >
          Rent
        </div>
      </div>
      <form>
        <input type="text" placeholder="City Location" />
        <input type="number" placeholder="Min Price" />
        <input type="number" placeholder="Max Price" />
        <button type="submit">
          <CiSearch />
        </button>
      </form>
    </div>
  );
}
