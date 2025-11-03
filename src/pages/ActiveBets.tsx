import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navigation from "@/components/Navigation";
import { TrendingUp, DollarSign, Trophy, AlertCircle, Dribbble, Circle } from "lucide-react";

interface ActiveBet {
  id: number;
  sport: string;
  sportIcon: any;
  game: string;
  betType: string;
  description: string;
  wagerAmount: number;
  potentialPayout: number;
  tipAmount: number;
  tipPercentage: number;
  status: "active" | "pending" | "won" | "lost";
  placedAt: string;
  isCopied: boolean;
  originalBettor?: string;
  originalBettorId?: number;
}

const mockActiveBets: ActiveBet[] = [
  {
    id: 1,
    sport: "NFL",
    sportIcon: Circle,
    game: "Chiefs vs Bills",
    betType: "Spread",
    description: "Chiefs -3.5",
    wagerAmount: 200,
    potentialPayout: 380,
    tipAmount: 16,
    tipPercentage: 8,
    status: "active",
    placedAt: "2h ago",
    isCopied: true,
    originalBettor: "SharpShooter23",
    originalBettorId: 1,
  },
  {
    id: 2,
    sport: "NBA",
    sportIcon: Dribbble,
    game: "Lakers vs Warriors",
    betType: "Player Prop",
    description: "LeBron James Over 25.5 Points",
    wagerAmount: 150,
    potentialPayout: 285,
    tipAmount: 18,
    tipPercentage: 12,
    status: "active",
    placedAt: "4h ago",
    isCopied: true,
    originalBettor: "DataDriven",
    originalBettorId: 2,
  },
  {
    id: 3,
    sport: "NFL",
    sportIcon: Circle,
    game: "Ravens vs 49ers",
    betType: "Parlay",
    description: "Ravens ML + Over 48.5",
    wagerAmount: 100,
    potentialPayout: 350,
    tipAmount: 0,
    tipPercentage: 0,
    status: "pending",
    placedAt: "1d ago",
    isCopied: false,
  },
  {
    id: 4,
    sport: "NBA",
    sportIcon: Dribbble,
    game: "Celtics vs Heat",
    betType: "Moneyline",
    description: "Celtics ML",
    wagerAmount: 250,
    potentialPayout: 400,
    tipAmount: 12.50,
    tipPercentage: 5,
    status: "won",
    placedAt: "2d ago",
    isCopied: true,
    originalBettor: "TheAnalyst",
    originalBettorId: 3,
  },
  {
    id: 5,
    sport: "Soccer",
    sportIcon: Circle,
    game: "Man City vs Liverpool",
    betType: "Over/Under",
    description: "Over 2.5 Goals",
    wagerAmount: 180,
    potentialPayout: 324,
    tipAmount: 18,
    tipPercentage: 10,
    status: "lost",
    placedAt: "3d ago",
    isCopied: true,
    originalBettor: "SoccerPro",
    originalBettorId: 4,
  },
  {
    id: 6,
    sport: "NHL",
    sportIcon: Circle,
    game: "Maple Leafs vs Bruins",
    betType: "Spread",
    description: "Maple Leafs -1.5",
    wagerAmount: 120,
    potentialPayout: 312,
    tipAmount: 0,
    tipPercentage: 0,
    status: "active",
    placedAt: "5h ago",
    isCopied: false,
  },
  {
    id: 7,
    sport: "UFC",
    sportIcon: Circle,
    game: "UFC 300 Main Event",
    betType: "Moneyline",
    description: "Fighter A ML",
    wagerAmount: 300,
    potentialPayout: 510,
    tipAmount: 30,
    tipPercentage: 10,
    status: "active",
    placedAt: "6h ago",
    isCopied: true,
    originalBettor: "FightPicks",
    originalBettorId: 5,
  },
];

const getAvatarUrl = (id: number, username: string) => {
  const avatarStyles = ['bottts', 'identicon', 'shapes', 'avataaars-neutral', 'pixel-art'];
  const style = avatarStyles[id % avatarStyles.length];
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${username}`;
};

const ActiveBets = () => {
  const totalActiveBets = mockActiveBets.filter(b => b.status === "active" || b.status === "pending").length;
  const totalPotentialEarnings = mockActiveBets
    .filter(b => b.status === "active" || b.status === "pending")
    .reduce((sum, b) => sum + b.potentialPayout, 0);
  const totalTipsPaid = mockActiveBets.reduce((sum, b) => sum + b.tipAmount, 0);
  const totalWagered = mockActiveBets
    .filter(b => b.status === "active" || b.status === "pending")
    .reduce((sum, b) => sum + b.wagerAmount, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gradient">Active Bets</h1>
          <p className="text-muted-foreground">Track all your ongoing bets and earnings</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Trophy className="w-5 h-5 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-1">{totalActiveBets}</div>
              <div className="text-sm text-muted-foreground">Active Bets</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-1">${totalWagered.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">Total Wagered</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div className="text-3xl font-bold mb-1 text-success">${totalPotentialEarnings.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">Potential Earnings</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <AlertCircle className="w-5 h-5 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-1">${totalTipsPaid.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">Total Tips Paid</div>
            </CardContent>
          </Card>
        </div>

        {/* Active Bets List */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Circle className="w-5 h-5" />
              All Active Bets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockActiveBets.map(bet => {
                const SportIcon = bet.sportIcon;
                return (
                  <div
                    key={bet.id}
                    className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-all bg-card"
                  >
                    {/* Sport Icon & Game */}
                    <div className="flex items-center gap-3 md:w-64">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <SportIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">{bet.sport}</div>
                        <div className="font-semibold text-sm">{bet.game}</div>
                      </div>
                    </div>

                    {/* Bet Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {bet.betType}
                        </Badge>
                        {bet.isCopied && bet.originalBettor && (
                          <div className="flex items-center gap-1">
                            <Avatar className="w-4 h-4 ring-1 ring-border">
                              <AvatarImage src={getAvatarUrl(bet.originalBettorId!, bet.originalBettor)} alt={bet.originalBettor} />
                              <AvatarFallback className="text-[8px]">{bet.originalBettor.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span className="text-[10px] text-muted-foreground">@{bet.originalBettor}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-sm font-medium">{bet.description}</div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span>Wager: ${bet.wagerAmount}</span>
                        {bet.tipAmount > 0 && (
                          <>
                            <span>•</span>
                            <span className="text-primary">Tip: ${bet.tipAmount} ({bet.tipPercentage}%)</span>
                          </>
                        )}
                        <span>•</span>
                        <span>{bet.placedAt}</span>
                      </div>
                    </div>

                    {/* Potential Payout */}
                    <div className="text-center md:w-32">
                      <div className={`text-lg font-bold ${
                        bet.status === "won" ? "text-success" : 
                        bet.status === "lost" ? "text-destructive" : 
                        "text-foreground"
                      }`}>
                        {bet.status === "won" ? "+" : bet.status === "lost" ? "-" : ""}${bet.potentialPayout.toFixed(2)}
                      </div>
                      <div className="text-xs text-muted-foreground">Potential</div>
                    </div>

                    {/* Status */}
                    <div className="md:w-24">
                      <Badge
                        variant={
                          bet.status === "won" ? "outline" :
                          bet.status === "lost" ? "destructive" :
                          bet.status === "active" ? "default" :
                          "secondary"
                        }
                        className={
                          bet.status === "won" ? "bg-success/10 text-success border-success/50" :
                          bet.status === "active" ? "bg-primary/10 text-primary border-primary/50" :
                          bet.status === "pending" ? "border-border" :
                          ""
                        }
                      >
                        {bet.status === "won" ? "Won" : 
                         bet.status === "lost" ? "Lost" : 
                         bet.status === "active" ? "Live" : 
                         "Pending"}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActiveBets;
