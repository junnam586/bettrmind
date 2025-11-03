import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, Users, Target, Trophy, Calendar, DollarSign, ShoppingBasket } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navigation from "@/components/Navigation";
import { LineChart, Line, ResponsiveContainer, YAxis, XAxis } from "recharts";
import { toast } from "@/hooks/use-toast";
import { useBasket } from "@/contexts/BasketContext";

// Sample active bets for demonstration
const generateActiveBets = (sport: string) => {
  const games = {
    NFL: [
      { team1: "Kansas City Chiefs", team2: "Buffalo Bills", spread: "-3.5", ml: "-165", total: "54.5" },
      { team1: "San Francisco 49ers", team2: "Dallas Cowboys", spread: "-7", ml: "-280", total: "48.5" },
      { team1: "Miami Dolphins", team2: "New York Jets", spread: "-4", ml: "-195", total: "44.5" },
      { team1: "Philadelphia Eagles", team2: "Washington Commanders", spread: "-9.5", ml: "-425", total: "46" },
      { team1: "Detroit Lions", team2: "Green Bay Packers", spread: "-2.5", ml: "-145", total: "51" }
    ],
    NBA: [
      { team1: "Los Angeles Lakers", team2: "Golden State Warriors", spread: "-5.5", ml: "-220", total: "228.5" },
      { team1: "Boston Celtics", team2: "Miami Heat", spread: "-8", ml: "-350", total: "215" },
      { team1: "Denver Nuggets", team2: "Phoenix Suns", spread: "-3", ml: "-160", total: "232.5" },
      { team1: "Milwaukee Bucks", team2: "Cleveland Cavaliers", spread: "-6.5", ml: "-265", total: "221" },
      { team1: "Dallas Mavericks", team2: "LA Clippers", spread: "-1.5", ml: "-125", total: "225.5" }
    ],
    Soccer: [
      { team1: "Manchester City", team2: "Arsenal", spread: "-0.5", ml: "-115", total: "2.5" },
      { team1: "Real Madrid", team2: "Barcelona", spread: "0", ml: "+105", total: "3" },
      { team1: "Liverpool", team2: "Chelsea", spread: "-1", ml: "-145", total: "2.5" },
      { team1: "Bayern Munich", team2: "Borussia Dortmund", spread: "-1.5", ml: "-195", total: "3.5" }
    ],
    MLB: [
      { team1: "New York Yankees", team2: "Boston Red Sox", spread: "-1.5", ml: "-165", total: "8.5" },
      { team1: "Los Angeles Dodgers", team2: "San Francisco Giants", spread: "-1.5", ml: "-180", total: "7.5" },
      { team1: "Houston Astros", team2: "Texas Rangers", spread: "-1.5", ml: "-145", total: "9" },
      { team1: "Atlanta Braves", team2: "Philadelphia Phillies", spread: "-1.5", ml: "-155", total: "8" }
    ],
    Other: [
      { team1: "Jon Jones", team2: "Stipe Miocic", spread: "", ml: "-350", total: "" },
      { team1: "Novak Djokovic", team2: "Carlos Alcaraz", spread: "", ml: "-125", total: "" },
      { team1: "Toronto Maple Leafs", team2: "Montreal Canadiens", spread: "-1.5", ml: "-165", total: "6.5" }
    ]
  };

  const betTypes = ["Spread", "Moneyline", "Over/Under", "Prop"];
  const selectedGames = games[sport as keyof typeof games] || games.NFL;
  
  return selectedGames.flatMap((game, idx) => {
    const numBets = Math.floor(1 + Math.random() * 3); // 1-3 bets per game
    return Array.from({ length: numBets }, (_, i) => {
      const betType = betTypes[Math.floor(Math.random() * betTypes.length)];
      let pick = "";
      let odds = "";
      
      if (betType === "Spread") {
        pick = Math.random() > 0.5 ? `${game.team1} ${game.spread}` : `${game.team2} +${game.spread.replace('-', '')}`;
        odds = "-110";
      } else if (betType === "Moneyline") {
        pick = Math.random() > 0.5 ? `${game.team1} ML` : `${game.team2} ML`;
        odds = game.ml;
      } else if (betType === "Over/Under") {
        pick = Math.random() > 0.5 ? `Over ${game.total}` : `Under ${game.total}`;
        odds = "-115";
      } else {
        pick = `${game.team1.split(' ').pop()} special prop`;
        odds = "+145";
      }

      const amount = Math.floor(25 + Math.random() * 275); // $25-$300
      const hoursAgo = Math.floor(1 + Math.random() * 72);
      
      return {
        id: `${idx}-${i}`,
        matchup: `${game.team1} vs ${game.team2}`,
        betType,
        pick,
        odds,
        amount,
        date: new Date(Date.now() + (1 + Math.random() * 5) * 24 * 60 * 60 * 1000).toLocaleDateString(),
        time: `${Math.floor(13 + Math.random() * 8)}:${Math.random() > 0.5 ? '00' : '30'} PM ET`,
        placedAgo: `${hoursAgo}h ago`,
        status: "Pending" as const
      };
    });
  });
};

const BettorProfile = () => {
  const { username } = useParams();
  const { addToBasket, isInBasket } = useBasket();
  const [selectedBets, setSelectedBets] = useState<string[]>([]);
  
  // Mock bettor data - in real app would fetch from API
  const bettor = {
    username: username || "mike_analytics",
    sport: "NFL",
    roi: "+32.5%",
    winRate: 58,
    followers: "1.9K",
    totalBets: 284,
    bio: "Former NCAA analyst with 10+ years experience in game theory and advanced metrics. Specializing in NFL spreads and totals with a focus on divisional matchups.",
    recentPerformance: Array.from({ length: 30 }, () => 
      Math.random() > 0.42 ? (1 + Math.random() * 8) : -(1 + Math.random() * 5)
    ),
    totalProfit: 12400,
    avgBetSize: 185,
    currentStreak: 3,
    bestStreak: 12
  };

  const activeBets = generateActiveBets(bettor.sport);
  const chartData = bettor.recentPerformance.map((value, index) => ({ index, value }));

  // Generate avatar based on username
  const avatarStyles = ['bottts', 'identicon', 'shapes', 'avataaars-neutral', 'pixel-art'];
  const avatarId = bettor.username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const style = avatarStyles[avatarId % avatarStyles.length];
  const avatarUrl = `https://api.dicebear.com/7.x/${style}/svg?seed=${bettor.username}`;

  const toggleBetSelection = (betId: string) => {
    setSelectedBets(prev => 
      prev.includes(betId) ? prev.filter(id => id !== betId) : [...prev, betId]
    );
  };

  const handleAddToBasket = () => {
    if (selectedBets.length === 0) {
      toast({
        title: "No bets selected",
        description: "Please select at least one bet to add to basket",
        variant: "destructive"
      });
      return;
    }
    
    let addedCount = 0;
    selectedBets.forEach(betId => {
      const bet = activeBets.find(b => b.id === betId);
      if (bet && !isInBasket(betId)) {
        // Convert odds to decimal format
        const oddsValue = bet.odds.startsWith('+') 
          ? 1 + (parseInt(bet.odds.substring(1)) / 100)
          : bet.odds.startsWith('-')
          ? 1 + (100 / Math.abs(parseInt(bet.odds)))
          : parseFloat(bet.odds);

        addToBasket({
          id: betId,
          sport: bettor.sport,
          game: bet.matchup,
          betType: bet.betType,
          selection: bet.pick,
          odds: oddsValue,
          tipPercentage: 10, // Default tip percentage
          bettorUsername: bettor.username
        });
        addedCount++;
      }
    });
    
    if (addedCount > 0) {
      toast({
        title: "Added to Basket!",
        description: `${addedCount} bet(s) added to your parlay basket`,
      });
      setSelectedBets([]);
    } else {
      toast({
        title: "Already in basket",
        description: "Selected bets are already in your basket",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <Link to="/make-bets" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Marketplace
        </Link>

        {/* Profile Header */}
        <Card className="gradient-card border-border mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-20 h-20 ring-2 ring-border">
                    <AvatarImage 
                      src={avatarUrl}
                      alt={bettor.username}
                    />
                    <AvatarFallback className="text-lg font-bold">
                      {bettor.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold">@{bettor.username}</h1>
                      <Badge variant="outline" className="border-primary text-primary">Verified</Badge>
                      <Badge variant="secondary">{bettor.sport}</Badge>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{bettor.bio}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 rounded-lg bg-success/10 border border-success/20">
                    <div className="text-success font-bold text-2xl mb-1">{bettor.roi}</div>
                    <div className="text-xs text-muted-foreground">90d ROI</div>
                  </div>
                  <div className="text-center p-3 rounded-lg glass-card">
                    <div className="font-bold text-2xl mb-1">{bettor.winRate}%</div>
                    <div className="text-xs text-muted-foreground">Win Rate</div>
                  </div>
                  <div className="text-center p-3 rounded-lg glass-card">
                    <div className="flex items-center justify-center gap-1 font-bold text-2xl mb-1">
                      <Users className="w-5 h-5" />
                      {bettor.followers}
                    </div>
                    <div className="text-xs text-muted-foreground">Followers</div>
                  </div>
                  <div className="text-center p-3 rounded-lg glass-card">
                    <div className="font-bold text-2xl mb-1">{bettor.totalBets}</div>
                    <div className="text-xs text-muted-foreground">Total Bets</div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-80">
                <div className="glass-card rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-3">30-Day Performance</h3>
                  <div className="h-32 w-full mb-3">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <YAxis hide domain={['auto', 'auto']} />
                        <XAxis hide />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="hsl(142 76% 36%)"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Avg Bet:</span>
                      <span className="ml-1 font-medium">${bettor.avgBetSize}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Streak:</span>
                      <span className="ml-1 font-medium text-success">+{bettor.currentStreak}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Bets Section */}
        <Card className="gradient-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                @{bettor.username}'s Active Bets ({activeBets.length})
              </CardTitle>
              {selectedBets.length > 0 && (
                <Button onClick={handleAddToBasket} className="bg-primary hover:bg-primary/90">
                  <ShoppingBasket className="w-4 h-4 mr-2" />
                  Add {selectedBets.length} to Basket
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeBets.map((bet) => (
                <div
                  key={bet.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                    selectedBets.includes(bet.id)
                      ? 'border-primary bg-primary/5'
                      : 'border-border glass-card hover:border-primary/50'
                  }`}
                >
                  <Checkbox
                    checked={selectedBets.includes(bet.id)}
                    onCheckedChange={() => toggleBetSelection(bet.id)}
                  />
                  
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-3">
                    <div className="md:col-span-2">
                      <div className="text-sm font-medium">{bet.matchup}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                        <Calendar className="w-3 h-3" />
                        {bet.date} at {bet.time}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-xs text-muted-foreground">Bet Type</div>
                      <Badge variant="secondary" className="mt-1">{bet.betType}</Badge>
                    </div>
                    
                    <div>
                      <div className="text-xs text-muted-foreground">Pick</div>
                      <div className="text-sm font-medium mt-1">{bet.pick}</div>
                    </div>
                    
                    <div>
                      <div className="text-xs text-muted-foreground">Odds</div>
                      <div className="text-sm font-medium text-primary mt-1">{bet.odds}</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Their Stake</div>
                      <div className="text-sm font-bold mt-1">${bet.amount}</div>
                      <div className="text-xs text-muted-foreground">{bet.placedAgo}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {activeBets.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No active bets at the moment. Check back later!
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BettorProfile;
