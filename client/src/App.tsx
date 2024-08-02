import HomePage from "./components/home/HomePage";
import Navbar from "./components/navbar/Navbar";
import "./layout.scss";

function App() {
  return (
    <div className="layout">
      <div className="navigation">
        <Navbar />
      </div>
      <div className="content">
        <HomePage />
      </div>
    </div>
  );
}

export default App;
