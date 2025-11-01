import { useState } from "react";
import { TrendingUp, Users, Trophy, ArrowUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";

const mockTipsters = [
  {
    id: 1,
    username: "SharpShooter23",
    avatar: "🧠",
    roi: 32.5,
    winRate: 58,
    followers: 1900,
    totalBets: 284,
    avgOdds: 2.15,
    sports: ["NBA", "NFL", "NHL"],
    verified: true,
    earnings: 12400,
  },
  {
    id: 2,
    username: "DataDriven",
    avatar: "📊",
    roi: 28.3,
    winRate: 62,
    followers: 2400,
    totalBets: 312,
    avgOdds: 1.95,
    sports: ["MLB", "NBA", "Soccer"],
    verified: true,
    earnings: 18200,
  },
  {
    id: 3,
    username: "TheAnalyst",
    avatar: "🎯",
    roi: 24.7,
    winRate: 55,
    followers: 1200,
    totalBets: 198,
    avgOdds: 2.30,
    sports: ["NFL", "Soccer"],
    verified: true,
    earnings: 8900,
  },
];

const Leaderboard = () => {
  const [selectedSport, setSelectedSport] = useState("All");
  const sports = ["All", "NBA", "NFL", "MLB", "NHL", "Soccer"];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gradient">Top Tipsters</h1>
          <p className="text-muted-foreground">Discover and copy verified sports bettors</p>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {sports.map((sport) => (
            <Button
              key={sport}
              variant={selectedSport === sport ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSport(sport)}
              className={selectedSport === sport ? "bg-primary text-primary-foreground" : ""}
            >
              {sport}
            </Button>
          ))}
        </div>

        <div className="grid gap-4">
          {mockTipsters.map((tipster, index) => (
            <Card 
              key={tipster.id} 
              className="gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:glow-gray"
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{tipster.avatar}</span>
                      <div className="text-3xl font-bold text-muted-foreground">#{index + 1}</div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold">@{tipster.username}</h3>
                        {tipster.verified && (
                          <Badge variant="outline" className="border-primary text-primary">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {tipster.sports.map((sport) => (
                          <Badge key={sport} variant="secondary" className="text-xs">
                            {sport}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                    <div className="text-center p-3 rounded-lg bg-success/10 border border-success/20">
                      <div className="flex items-center justify-center gap-1 text-success font-bold text-xl mb-1">
                        <ArrowUp className="w-4 h-4" />
                        +{tipster.roi}%
                      </div>
                      <div className="text-xs text-muted-foreground">ROI (90d)</div>
                    </div>

                    <div className="text-center p-3 rounded-lg bg-secondary">
                      <div className="font-bold text-xl mb-1">{tipster.winRate}%</div>
                      <div className="text-xs text-muted-foreground">Win Rate</div>
                    </div>

                    <div className="text-center p-3 rounded-lg bg-secondary">
                      <div className="flex items-center justify-center gap-1 font-bold text-xl mb-1">
                        <Users className="w-4 h-4" />
                        {(tipster.followers / 1000).toFixed(1)}K
                      </div>
                      <div className="text-xs text-muted-foreground">Followers</div>
                    </div>

                    <div className="text-center p-3 rounded-lg bg-secondary">
                      <div className="font-bold text-xl mb-1">{tipster.totalBets}</div>
                      <div className="text-xs text-muted-foreground">Total Bets</div>
                    </div>
                  </div>

                  <div className="md:w-32">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Follow & Copy
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
