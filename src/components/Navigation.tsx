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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">BettrMind</span>
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
                      ? "bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
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
              <Button size="sm" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold shadow-lg">
                <Target className="w-4 h-4 mr-2" />
                Get Copied
              </Button>
            </Link>
            <Link to="/make-bets">
              <Button size="sm" className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-white font-semibold shadow-lg">
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
