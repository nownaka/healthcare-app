import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import DropdownMenu from "./DropdownMenu";

const HeaderContainer: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    alert("ログアウトしました");
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <Header
        title="健康管理アプリ"
        userName="健康 太郎"
        textColor="white"
        onMenuClick={toggleMenu}
      />
      {isMenuOpen && (
        <DropdownMenu onNavigate={handleNavigation} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default HeaderContainer;
