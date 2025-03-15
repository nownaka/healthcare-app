import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/organisms/Header";
import { useNavigation } from "../components/organisms/Navigation";
import HomePage from "../components/pages/HomePage";
import SettingsPage from "../components/pages/SettingsPage";
import TermsPage from "../components/pages/TermsPage";
import LoginPage from "../components/pages/LoginPage";

const AppRoutes = () => {
  const { handleNavigation } = useNavigation();

  return (
    <Router>
      <Header
        title="健康管理アプリ"
        userName="健康 太郎"
        textColor="white"
        onMenuClick={handleNavigation}
      />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
