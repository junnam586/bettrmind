import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navigation from "@/components/Navigation";
import { Users, DollarSign, TrendingUp, Trophy, Calendar } from "lucide-react";

interface CopiedBet {
  id: number;
  copier: string;
  copierId: number;
  betDescription: string;
  wagerAmount: number;
  potentialPayout: number;
  yourCommission: number;
  commissionRate: number;
  status: "pending" | "won" | "lost";
  copiedAt: string;
}

const mockCopiedBets: CopiedBet[] = [
  {
    id: 1,
    copier: "john_bettor",
    copierId: 101,
    betDescription: "3-Leg Parlay: Chiefs -3.5, Over 54.5, Mahomes 2+ TDs",
    wagerAmount: 200,
    potentialPayout: 1300,
    yourCommission: 130,
    commissionRate: 10,
    status: "pending",
    copiedAt: "2h ago"
  },
  {
    id: 2,
    copier: "sarah_wins",
    copierId: 102,
    betDescription: "3-Leg Parlay: Chiefs -3.5, Over 54.5, Mahomes 2+ TDs",
    wagerAmount: 150,
    potentialPayout: 975,
    yourCommission: 97.50,
    commissionRate: 10,
    status: "won",
    copiedAt: "1d ago"
  },
  {
    id: 3,
    copier: "mike_sports",
    copierId: 103,
    betDescription: "2-Leg Parlay: 49ers -7, Under 48.5",
    wagerAmount: 100,
    potentialPayout: 360,
    yourCommission: 54,
    commissionRate: 15,
    status: "won",
    copiedAt: "2d ago"
  },
  {
    id: 4,
    copier: "betting_pro",
    copierId: 104,
    betDescription: "Spread: Lakers -5.5",
    wagerAmount: 220,
    potentialPayout: 420,
    yourCommission: 21,
    commissionRate: 5,
    status: "lost",
    copiedAt: "3d ago"
  },
  {
    id: 5,
    copier: "sports_king",
    copierId: 105,
    betDescription: "3-Leg Parlay: Chiefs -3.5, Over 54.5, Mahomes 2+ TDs",
    wagerAmount: 300,
    potentialPayout: 1950,
    yourCommission: 195,
    commissionRate: 10,
    status: "pending",
    copiedAt: "4h ago"
  },
];

const MyCopiers = () => {
  const totalCopiers = new Set(mockCopiedBets.map(b => b.copier)).size;
  const totalEarned = mockCopiedBets
    .filter(b => b.status === "won")
    .reduce((sum, b) => sum + b.yourCommission, 0);
  const activeBets = mockCopiedBets.filter(b => b.status === "pending").length;
  const winRate = (mockCopiedBets.filter(b => b.status === "won").length / mockCopiedBets.filter(b => b.status !== "pending").length * 100).toFixed(1);

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
          <h1 className="text-4xl font-bold mb-2 text-gradient">My Copiers Dashboard</h1>
          <p className="text-muted-foreground">Track who's copying your bets and your earnings</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="gradient-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-1">{totalCopiers}</div>
              <div className="text-sm text-muted-foreground">Total Copiers</div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-5 h-5 text-success" />
              </div>
              <div className="text-3xl font-bold mb-1 text-success">${totalEarned.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">Total Earned</div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Trophy className="w-5 h-5 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-1">{activeBets}</div>
              <div className="text-sm text-muted-foreground">Active Copied Bets</div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div className="text-3xl font-bold mb-1">{winRate}%</div>
              <div className="text-sm text-muted-foreground">Win Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Copied Bets List */}
        <Card className="gradient-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Recent Copied Bets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockCopiedBets.map(bet => (
                <div
                  key={bet.id}
                  className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-all"
                >
                  {/* Copier Info */}
                  <div className="flex items-center gap-3 md:w-56">
                    <Avatar className="w-10 h-10 ring-2 ring-border">
                      <AvatarImage src={getAvatarUrl(bet.copierId, bet.copier)} alt={bet.copier} />
                      <AvatarFallback>{bet.copier.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">@{bet.copier}</div>
                      <div className="text-xs text-muted-foreground">{bet.copiedAt}</div>
                    </div>
                  </div>

                  {/* Bet Description */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium line-clamp-1">{bet.betDescription}</div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>Wager: ${bet.wagerAmount}</span>
                      <span>•</span>
                      <span>Potential: ${bet.potentialPayout}</span>
                    </div>
                  </div>

                  {/* Commission */}
                  <div className="text-center md:w-32">
                    <div className={`text-lg font-bold ${bet.status === "won" ? "text-success" : bet.status === "lost" ? "text-destructive" : ""}`}>
                      {bet.status === "won" ? "+" : bet.status === "lost" ? "" : ""}${bet.yourCommission.toFixed(2)}
                    </div>
                    <div className="text-xs text-muted-foreground">{bet.commissionRate}% commission</div>
                  </div>

                  {/* Status */}
                  <div className="md:w-24">
                    <Badge
                      variant={
                        bet.status === "won" ? "outline" :
                        bet.status === "lost" ? "destructive" :
                        "secondary"
                      }
                      className={
                        bet.status === "won" ? "bg-success/10 text-success border-success/50" :
                        bet.status === "pending" ? "border-primary/50 text-primary" :
                        ""
                      }
                    >
                      {bet.status === "won" ? "Won" : bet.status === "lost" ? "Lost" : "Pending"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyCopiers;
