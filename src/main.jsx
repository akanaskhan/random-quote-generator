import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./Route.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";


const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
   <QueryClientProvider client={queryClient}>
            <AppRouter />
   </QueryClientProvider>
);
