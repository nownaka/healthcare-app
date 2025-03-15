import { useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();

  const handleNavigation = (menu: string) => {
    switch (menu) {
      case "home":
        navigate("/home");
        break;
      case "settings":
        navigate("/settings");
        break;
      case "terms":
        navigate("/terms");
        break;
      case "logout":
        alert("ログアウトしました");
        navigate("/");
        break;
      default:
        break;
    }
  };

  return { handleNavigation };
};
