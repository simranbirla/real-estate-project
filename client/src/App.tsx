import HomePage from "./components/home/HomePage";
import Layout from "./components/layout/Layout";
import List from "./components/list/List";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import SingleProp from "./components/prop/SingleProp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/list" element={<List />} />
          <Route path="/login" element={<Login />} />
          <Route path="/property/:id" element={<SingleProp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
