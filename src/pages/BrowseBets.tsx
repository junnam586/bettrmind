import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import { toast } from "@/hooks/use-toast";
import { Copy, TrendingUp, Users, DollarSign, Trophy, Filter } from "lucide-react";

interface PublishedBet {
  id: number;
  creator: string;
  creatorId: number;
  sport: string;
  game: string;
  betType: string;
  selections: string[];
  odds: string;
  wager: number;
  potentialPayout: number;
  commission: number;
  copiers: number;
  winRate: number;
  totalEarned: number;
  postedAgo: string;
}

const mockPublishedBets: PublishedBet[] = [
  {
    id: 1,
    creator: "sharp_nfl",
    creatorId: 4,
    sport: "NFL",
    game: "Chiefs vs Bills",
    betType: "3-Leg Parlay",
    selections: ["Chiefs -3.5", "Over 54.5", "Mahomes 2+ TDs"],
    odds: "+650",
    wager: 200,
    potentialPayout: 1300,
    commission: 10,
    copiers: 847,
    winRate: 67,
    totalEarned: 12400,
    postedAgo: "2h ago"
  },
  {
    id: 2,
    creator: "rachel_hoops",
    creatorId: 12,
    sport: "NBA",
    game: "Lakers vs Warriors",
    betType: "Spread",
    selections: ["Lakers -5.5"],
    odds: "-110",
    wager: 110,
    potentialPayout: 210,
    commission: 5,
    copiers: 1243,
    winRate: 65,
    totalEarned: 18900,
    postedAgo: "4h ago"
  },
  {
    id: 3,
    creator: "mike_analytics",
    creatorId: 1,
    sport: "NFL",
    game: "49ers vs Cowboys",
    betType: "2-Leg Parlay",
    selections: ["49ers -7", "Under 48.5"],
    odds: "+260",
    wager: 150,
    potentialPayout: 540,
    commission: 15,
    copiers: 592,
    winRate: 64,
    totalEarned: 15200,
    postedAgo: "5h ago"
  },
  {
    id: 4,
    creator: "stats_sam",
    creatorId: 31,
    sport: "NBA",
    game: "Celtics vs Heat",
    betType: "Moneyline",
    selections: ["Celtics ML"],
    odds: "-165",
    wager: 165,
    potentialPayout: 265,
    commission: 8,
    copiers: 321,
    winRate: 61,
    totalEarned: 8200,
    postedAgo: "1h ago"
  },
  {
    id: 5,
    creator: "david_odds",
    creatorId: 3,
    sport: "Soccer",
    game: "Man City vs Arsenal",
    betType: "Over/Under",
    selections: ["Over 2.5 goals"],
    odds: "+105",
    wager: 100,
    potentialPayout: 205,
    commission: 12,
    copiers: 456,
    winRate: 58,
    totalEarned: 6700,
    postedAgo: "3h ago"
  },
];

const BrowseBets = () => {
  const [sortBy, setSortBy] = useState("copiers");
  const [filterSport, setFilterSport] = useState("all");

  let filteredBets = [...mockPublishedBets];
  
  if (filterSport !== "all") {
    filteredBets = filteredBets.filter(bet => bet.sport.toLowerCase() === filterSport);
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
        return a.id - b.id;
      default:
        return 0;
    }
  });

  const handleCopyBet = (bet: PublishedBet) => {
    toast({
      title: "Bet copied!",
      description: `You've copied @${bet.creator}'s ${bet.betType} bet`,
    });
  };

  const getAvatarUrl = (creatorId: number, username: string) => {
    const avatarStyles = ['bottts', 'identicon', 'shapes', 'avataaars-neutral', 'pixel-art'];
    const style = avatarStyles[creatorId % avatarStyles.length];
    return `https://api.dicebear.com/7.x/${style}/svg?seed=${username}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gradient">Browse & Copy Bets</h1>
          <p className="text-muted-foreground">Discover winning bets from top creators and copy them instantly</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="copiers">Most Copied</SelectItem>
                <SelectItem value="winRate">Best Win Rate</SelectItem>
                <SelectItem value="earnings">Top Earners</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Select value={filterSport} onValueChange={setFilterSport}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Sports" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sports</SelectItem>
              <SelectItem value="nfl">NFL</SelectItem>
              <SelectItem value="nba">NBA</SelectItem>
              <SelectItem value="soccer">Soccer</SelectItem>
              <SelectItem value="mlb">MLB</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bets Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredBets.map(bet => (
            <Card key={bet.id} className="gradient-card border-border hover:border-primary/30 transition-all">
              <CardContent className="p-5">
                {/* Creator Info */}
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                  <Avatar className="w-12 h-12 ring-2 ring-border">
                    <AvatarImage src={getAvatarUrl(bet.creatorId, bet.creator)} alt={bet.creator} />
                    <AvatarFallback>{bet.creator.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Link to={`/bettor/${bet.creator}`} className="font-bold hover:text-primary transition-colors">
                      @{bet.creator}
                    </Link>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {bet.winRate}% win rate
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        ${(bet.totalEarned / 1000).toFixed(1)}K earned
                      </span>
                    </div>
                  </div>
                  <Badge variant="secondary">{bet.sport}</Badge>
                </div>

                {/* Bet Details */}
                <div className="space-y-3 mb-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">{bet.game}</div>
                    <Badge variant="outline" className="mb-2">{bet.betType}</Badge>
                  </div>

                  <div className="space-y-1.5">
                    {bet.selections.map((selection, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded bg-secondary/50">
                        <span className="text-sm font-medium">{selection}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
                    <span className="text-muted-foreground">Odds</span>
                    <span className="font-mono font-bold text-primary">{bet.odds}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4 p-3 rounded-lg bg-primary/5">
                  <div className="text-center">
                    <div className="text-lg font-bold">${bet.wager}</div>
                    <div className="text-xs text-muted-foreground">Wager</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-success">${bet.potentialPayout}</div>
                    <div className="text-xs text-muted-foreground">Payout</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">{bet.commission}%</div>
                    <div className="text-xs text-muted-foreground">Commission</div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {bet.copiers} copiers
                    </span>
                    <span>{bet.postedAgo}</span>
                  </div>
                  <Button
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => handleCopyBet(bet)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Bet
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseBets;
