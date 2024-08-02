import "./home.scss";
import Search from "./search/Search";

export default function HomePage() {
  return (
    <div className="home">
      <div className="left-side">
        <div className="title">
          Find your dream place that you can rent or buy
        </div>
        <div className="sub-title">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
          officiis quam commodi labore esse, illum dolores explicabo nam quae
          cumque nihil ratione dolorum, quos illo numquam? Fugit culpa
          consectetur laboriosam.
        </div>
        <Search />
        <div className="stats">
          <div className="stats-details">
            10+
            <span>Years of experience</span>
          </div>
          <div className="stats-details">
            300
            <span>Awards Gained</span>
          </div>
          <div className="stats-details">
            10k+
            <span>Happy Customers</span>
          </div>
        </div>
      </div>
      <div className="right-side">
        <img src="/src/assets/building.jpg" alt="Buildings" />
      </div>
    </div>
  );
}
