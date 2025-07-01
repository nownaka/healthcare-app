import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Navigate, Outlet } from "react-router-dom";
import { config } from "../../src/config";

const ProtectedPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.post(
          `${config.backendAPIBaseUrl}/api/auth/status/`,
          {},
          {
            withCredentials: true, // Cookie を送信するために必要
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>認証状態を確認中...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedPage;
