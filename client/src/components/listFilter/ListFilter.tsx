import { CiSearch } from "react-icons/ci";
import "./listFilter.scss";

export default function ListFilter() {
  return (
    <div className="filter">
      <h1>
        Search Results for <b>India</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="location">Location</label>
          <input
            name="location"
            id="location"
            title="Location"
            type="text"
            placeholder="Search for location"
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="location">Property</label>
          <select name="property" id="property" title="property">
            <option value={"any"}>Any</option>
            <option value={"apartment"}>Apartment</option>
            <option value={"house"}>House</option>
            <option value={"condo"}>Condo</option>
            <option value={"land"}>Land</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="min">Min Price</label>
          <input
            type="number"
            name="min"
            id="min"
            placeholder="Enter Min Price"
            title="Min Price"
          />
        </div>
        <div className="item">
          <label htmlFor="max">Max Price</label>
          <input
            type="number"
            name="max"
            id="max"
            placeholder="Enter Max Price"
            title="Max Price"
          />
        </div>
        <div className="item">
          <label htmlFor="bedroom">Bedroom</label>
          <input
            type="number"
            name="bedroom"
            id="bedroom"
            placeholder="Bedroom Number"
            title="Bedroom"
          />
        </div>
        <div className="item">
          <button type="submit">
            <CiSearch />
          </button>
        </div>
      </div>
    </div>
  );
}
