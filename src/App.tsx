import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BasketProvider } from "@/contexts/BasketContext";
import BettingBasket from "@/components/BettingBasket";
import Index from "./pages/Index";
import Leaderboard from "./pages/Leaderboard";
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet";
import MakeBets from "./pages/MakeBets";
import BettrProfile from "./pages/BettrProfile";
import CreateBet from "./pages/CreateBet";
import BrowseBets from "./pages/BrowseBets";
import MyCopiers from "./pages/MyCopiers";
import GetCopiedHub from "./pages/GetCopiedHub";
import ActiveBets from "./pages/ActiveBets";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  console.log('App rendering with BasketProvider');
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BasketProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <BettingBasket />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/make-bets" element={<MakeBets />} />
              <Route path="/bettr/:username" element={<BettrProfile />} />
              <Route path="/get-copied" element={<GetCopiedHub />} />
              <Route path="/create-bet" element={<CreateBet />} />
              <Route path="/browse-bets" element={<BrowseBets />} />
              <Route path="/my-copiers" element={<MyCopiers />} />
              <Route path="/active-bets" element={<ActiveBets />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </BasketProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
