import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: TrendingUp,
      title: "Copy Top Bettors",
      description: "Follow verified tipsters with proven track records and copy their bets automatically or manually.",
    },
    {
      icon: Shield,
      title: "Transparent Performance",
      description: "Real-time analytics, ROI tracking, and comprehensive leaderboards show exactly how every bettor performs.",
    },
    {
      icon: Zap,
      title: "Performance Fees",
      description: "Pay tipsters only when they win. Fair compensation based on your net profits.",
    },
  ];

  const topTipsters = [
    { username: "SharpShooter23", roi: "+32.5%", followers: "1.9K" },
    { username: "DataDriven", roi: "+28.3%", followers: "2.4K" },
    { username: "TheAnalyst", roi: "+24.7%", followers: "1.2K" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Copy Winning Bettors.<br />
              <span className="text-gradient">Pay Only When They Win.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Follow verified sports bettors with proven track records. Track your ROI live in a sleek, data-driven dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8">
                Start Copying Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Link to="/leaderboard">
                <Button size="lg" variant="outline" className="text-lg px-8 border-primary text-primary hover:bg-primary/10">
                  View Leaderboard
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {topTipsters.map((tipster) => (
              <Card key={tipster.username} className="gradient-card border-border hover:border-primary/50 transition-all">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-success mb-2">{tipster.roi}</div>
                  <div className="font-medium mb-1">@{tipster.username}</div>
                  <div className="text-sm text-muted-foreground">{tipster.followers} followers</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Simple, transparent, and rewarding</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="gradient-card border-border hover:border-primary/50 transition-all">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Winning?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of smart bettors already copying verified tipsters
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8">
            Get Started Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p className="mb-2">BettrBet enforces strict compliance with all U.S. federal and state betting regulations.</p>
          <p>You must be of legal betting age in your state to participate. Gamble responsibly.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
