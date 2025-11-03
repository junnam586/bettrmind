import { Link, useLocation } from "react-router-dom";
import { Home, TrendingUp, LayoutDashboard, Wallet, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/leaderboard", label: "Leaderboard", icon: TrendingUp },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/active-bets", label: "Active Bets", icon: TrendingUp },
    { path: "/wallet", label: "Wallet", icon: Wallet },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="BettrMind Logo" className="h-8 w-auto opacity-90" />
          </Link>
          
          <div className="hidden md:flex items-center gap-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg transition-all ${
                    isActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium whitespace-nowrap">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <Link to="/get-copied">
              <Button size="sm" variant="outline" className="font-medium">
                <Target className="w-4 h-4 mr-2" />
                Get Copied
              </Button>
            </Link>
            <Link to="/make-bets">
              <Button size="sm" className="font-medium">
                <Target className="w-4 h-4 mr-2" />
                Make Bets
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
