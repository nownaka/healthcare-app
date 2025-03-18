import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "../components/organisms/Header";
import Navigation from "../components/organisms/Navigation";
import HomePage from "../components/pages/HomePage";
import SettingsPage from "../components/pages/SettingsPage";
import TermsPage from "../components/pages/TermsPage";
import LoginPage from "../components/pages/LoginPage";
import ProtectedRoute from "../logic/LoginCheck";
import AuthFailure from "../components/pages/AuthFailure";

const AppRoutes = () => {
  const { handleNavigation } = Navigation();
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <>
      {!isLoginPage && (
        <Header
          title="健康管理アプリ"
          userName="健康 太郎"
          textColor="white"
          onMenuClick={handleNavigation}
        />
      )}
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/failure" element={<AuthFailure />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
