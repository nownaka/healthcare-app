import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./components/organisms/useFetchUser";
import AppRoutes from "./routes/Routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,            // 即 stale とする
      refetchOnMount: "always",// どんなときもマウント時に再フェッチ
      refetchOnWindowFocus: true,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
