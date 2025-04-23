
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Education from "./pages/Education";
import Sports from "./pages/Sports";
import Finance from "./pages/Finance";
import Other from "./pages/Other";
import Lawyers from "./pages/Lawyers";
import About from "./pages/About";
import Auth from "./pages/Auth";
import LawyerProfile from "./pages/LawyerProfile";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import PaymentPage from "./components/PaymentPage";
import { useState } from "react";

// Create query client with better error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      onError: (error) => {
        console.error("Query error:", error);
      },
    },
    mutations: {
      retry: 1,
      onError: (error) => {
        console.error("Mutation error:", error);
      },
    },
  },
});

const App = () => {
  const [queryClientInstance] = useState(() => queryClient);

  return (
    <QueryClientProvider client={queryClientInstance}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/education" element={<Education />} />
                  <Route path="/sports" element={<Sports />} />
                  <Route path="/finance" element={<Finance />} />
                  <Route path="/other" element={<Other />} />
                  <Route path="/lawyers" element={<Lawyers />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/lawyer-profile" element={<LawyerProfile />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="/payment" element={<PaymentPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
