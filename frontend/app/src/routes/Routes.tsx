import { Routes, Route } from "react-router-dom";
import App from "../App";
import Home from "../components/pages/HomePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Home" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
