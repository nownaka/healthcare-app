import { Routes, Route } from "react-router-dom";
import App from "../App";
import Home from "../components/pages/HomePage";
import SignUpPage from "../components/pages/SignUpPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/Home' element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
