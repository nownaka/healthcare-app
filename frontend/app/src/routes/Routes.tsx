import { Routes, Route } from "react-router-dom";
import App from "../App";
import Home from "../components/pages/HomePage";
import SignUpPage from "../components/pages/SignUpPage";
import TermsPage from "../components/pages/TermsPage";
import SettingsPage from "../components/pages/SettingsPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Terms" element={<TermsPage />} />
      <Route path="/Settings" element={<SettingsPage />} />
    </Routes>
  );
};

export default AppRoutes;
