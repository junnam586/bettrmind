import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import { TrendingUp, Users, Trophy, Copy, Filter, Circle, Dribbble } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface CreatorBet {
  id: number;
  creator: string;
  creatorId: number;
  sport: string;
  sportIcon: any;
  game: string;
  betType: string;
  description: string;
  odds: string;
  copiers: number;
  tipPercentage: number;
  winRate: number;
  totalEarned: number;
}

const mockCreatorBets: CreatorBet[] = [
  {
    id: 1,
    creator: "SharpShooter23",
    creatorId: 1,
    sport: "NFL",
    sportIcon: Circle,
    game: "Chiefs vs Bills",
    betType: "Spread",
    description: "Chiefs -3.5",
    odds: "1.90",
    copiers: 156,
    tipPercentage: 10,
    winRate: 67,
    totalEarned: 12400,
  },
  {
    id: 2,
    creator: "DataDriven",
    creatorId: 2,
    sport: "NBA",
    sportIcon: Dribbble,
    game: "Lakers vs Warriors",
    betType: "Player Prop",
    description: "LeBron James Over 25.5 Points",
    odds: "1.85",
    copiers: 203,
    tipPercentage: 12,
    winRate: 62,
    totalEarned: 18900,
  },
  {
    id: 3,
    creator: "TheAnalyst",
    creatorId: 3,
    sport: "NFL",
    sportIcon: Circle,
    game: "Ravens vs 49ers",
    betType: "Parlay",
    description: "Ravens ML + Over 48.5",
    odds: "3.50",
    copiers: 89,
    tipPercentage: 8,
    winRate: 64,
    totalEarned: 15200,
  },
  {
    id: 4,
    creator: "SoccerPro",
    creatorId: 4,
    sport: "Soccer",
    sportIcon: Circle,
    game: "Man City vs Liverpool",
    betType: "Over/Under",
    description: "Over 2.5 Goals",
    odds: "1.80",
    copiers: 142,
    tipPercentage: 10,
    winRate: 58,
    totalEarned: 8900,
  },
  {
    id: 5,
    creator: "PropMaster",
    creatorId: 5,
    sport: "NBA",
    sportIcon: Dribbble,
    game: "Celtics vs Heat",
    betType: "Spread",
    description: "Celtics -5.5",
    odds: "1.95",
    copiers: 178,
    tipPercentage: 15,
    winRate: 65,
    totalEarned: 21300,
  },
  {
    id: 6,
    creator: "MLBKing",
    creatorId: 6,
    sport: "MLB",
    sportIcon: Circle,
    game: "Yankees vs Red Sox",
    betType: "Moneyline",
    description: "Yankees ML",
    odds: "1.70",
    copiers: 95,
    tipPercentage: 7,
    winRate: 61,
    totalEarned: 7200,
  },
  {
    id: 7,
    creator: "HockeySharp",
    creatorId: 7,
    sport: "NHL",
    sportIcon: Circle,
    game: "Maple Leafs vs Bruins",
    betType: "Spread",
    description: "Maple Leafs -1.5",
    odds: "2.60",
    copiers: 67,
    tipPercentage: 9,
    winRate: 59,
    totalEarned: 5800,
  },
  {
    id: 8,
    creator: "FightPicks",
    creatorId: 8,
    sport: "UFC",
    sportIcon: Circle,
    game: "UFC 300 Main Event",
    betType: "Moneyline",
    description: "Fighter A ML",
    odds: "1.70",
    copiers: 123,
    tipPercentage: 10,
    winRate: 63,
    totalEarned: 9400,
  },
];

const BrowseBets = () => {
  const { toast } = useToast();
  const [sportFilter, setSportFilter] = useState("all");
  const [sortBy, setSortBy] = useState("copiers");

  let filteredBets = [...mockCreatorBets];
  
  if (sportFilter !== "all") {
    filteredBets = filteredBets.filter(bet => bet.sport.toLowerCase() === sportFilter);
  }

  filteredBets.sort((a, b) => {
    switch (sortBy) {
      case "copiers":
        return b.copiers - a.copiers;
      case "winRate":
        return b.winRate - a.winRate;
      case "earnings":
        return b.totalEarned - a.totalEarned;
      case "recent":
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const handleCopyBet = (bet: CreatorBet) => {
    toast({
      title: "Bet Copied!",
      description: `Copied ${bet.creator}'s ${bet.sport} bet with ${bet.tipPercentage}% tip requirement`,
    });
  };

  const getAvatarUrl = (id: number, username: string) => {
    const avatarStyles = ['bottts', 'identicon', 'shapes', 'avataaars-neutral', 'pixel-art'];
    const style = avatarStyles[id % avatarStyles.length];
    return `https://api.dicebear.com/7.x/${style}/svg?seed=${username}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gradient">Browse & Copy Bets</h1>
          <p className="text-muted-foreground">Discover top bettors across all sports and copy their winning bets</p>
        </div>

        {/* Filters */}
        <Card className="bg-card border-border mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filter & Sort:</span>
              </div>
              <div className="flex gap-3">
                <Select value={sportFilter} onValueChange={setSportFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Sports" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sports</SelectItem>
                    <SelectItem value="nfl">NFL</SelectItem>
                    <SelectItem value="nba">NBA</SelectItem>
                    <SelectItem value="mlb">MLB</SelectItem>
                    <SelectItem value="nhl">NHL</SelectItem>
                    <SelectItem value="ufc">UFC</SelectItem>
                    <SelectItem value="soccer">Soccer</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="copiers">Most Copied</SelectItem>
                    <SelectItem value="winRate">Best Win Rate</SelectItem>
                    <SelectItem value="earnings">Top Earners</SelectItem>
                    <SelectItem value="recent">Most Recent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bets Grid */}
        <div className="grid grid-cols-1 gap-4">
          {filteredBets.map(bet => {
            const SportIcon = bet.sportIcon;
            return (
              <Card key={bet.id} className="bg-card border-border hover:border-primary/50 transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Creator Info */}
                    <div className="flex items-center gap-3 md:w-64">
                      <Avatar className="w-12 h-12 ring-2 ring-border">
                        <AvatarImage src={getAvatarUrl(bet.creatorId, bet.creator)} alt={bet.creator} />
                        <AvatarFallback>{bet.creator.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">@{bet.creator}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Trophy className="w-3 h-3 text-primary" />
                          {bet.winRate}% Win Rate
                        </div>
                      </div>
                    </div>

                    {/* Bet Details */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <SportIcon className="w-3 h-3" />
                          {bet.sport}
                        </Badge>
                        <Badge variant="secondary">{bet.betType}</Badge>
                      </div>
                      <div className="font-semibold mb-1">{bet.game}</div>
                      <div className="text-sm text-muted-foreground">{bet.description}</div>
                      <div className="flex items-center gap-4 mt-3 text-sm">
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">Odds:</span>
                          <span className="font-semibold">{bet.odds}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{bet.copiers} copiers</span>
                        </div>
                      </div>
                      
                      {/* Mandatory Tip - Prominent Display */}
                      <div className="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-amber-500" />
                          <span className="font-bold text-amber-500">Mandatory Tip: {bet.tipPercentage}%</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          You must pay {bet.tipPercentage}% of your wager to copy this bet
                        </p>
                      </div>
                    </div>

                    {/* Copy Button */}
                    <div className="flex items-center">
                      <Button onClick={() => handleCopyBet(bet)} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Bet
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BrowseBets;
