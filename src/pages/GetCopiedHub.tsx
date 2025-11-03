import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Plus, Search, Users, TrendingUp } from "lucide-react";

const GetCopiedHub = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gradient">Get Copied</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create winning bets, share them with the community, and earn commission when others copy your picks
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Link to="/create-bet">
            <Card className="gradient-card border-border hover:border-primary/50 transition-all cursor-pointer h-full group hover:glow-premium">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Plus className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Create Bet</h3>
                <p className="text-muted-foreground mb-4">
                  Build custom bets and set your commission rate. Share publicly or keep it private.
                </p>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Start Creating
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link to="/my-copiers">
            <Card className="gradient-card border-border hover:border-primary/50 transition-all cursor-pointer h-full group hover:glow-premium">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">My Copiers</h3>
                <p className="text-muted-foreground mb-4">
                  Track who's copying your bets and monitor your earnings
                </p>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  View Dashboard
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* How It Works */}
        <Card className="gradient-card border-border">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  1
                </div>
                <h3 className="font-bold mb-2">Create Your Bet</h3>
                <p className="text-sm text-muted-foreground">
                  Build your bet across NFL, NBA, MLB, NHL, UFC, Soccer. Set your tip percentage (5-20%).
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  2
                </div>
                <h3 className="font-bold mb-2">Share & Get Copied</h3>
                <p className="text-sm text-muted-foreground">
                  Other users discover your bet and copy it with their own wager amounts
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  3
                </div>
                <h3 className="font-bold mb-2">Earn Commission</h3>
                <p className="text-sm text-muted-foreground">
                  When others copy your bet, they see and pay your required tip percentage upfront.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GetCopiedHub;
