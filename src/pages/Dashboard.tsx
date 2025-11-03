import { TrendingUp, TrendingDown, DollarSign, Target, Calendar, ArrowUp, ArrowDown, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";

// Generate badge based on criteria
const getBadge = (yearsActive: number, winRate: number, totalInvested: number) => {
  if (totalInvested >= 100000) return { variant: "platinum" as const, label: "💎 Elite Investor" };
  if (totalInvested >= 50000) return { variant: "gold" as const, label: "🏆 Pro Investor" };
  if (winRate >= 70) return { variant: "platinum" as const, label: "💎 Master Bettor" };
  if (winRate >= 65) return { variant: "gold" as const, label: "🏆 Expert" };
  if (totalInvested >= 10000) return { variant: "silver" as const, label: "⭐ High Roller" };
  if (winRate >= 60) return { variant: "silver" as const, label: "⭐ Sharpshooter" };
  if (yearsActive >= 3) return { variant: "gold" as const, label: "🏆 Veteran" };
  if (winRate >= 55) return { variant: "bronze" as const, label: "🥉 Consistent" };
  if (yearsActive >= 1) return { variant: "silver" as const, label: "⭐ Experienced" };
  return { variant: "bronze" as const, label: "🥉 Rookie" };
};

const Dashboard = () => {
  const stats = [
    {
      title: "Total Bets",
      value: "47",
      change: "+12",
      icon: Target,
      positive: true,
    },
    {
      title: "Win Rate",
      value: "61.7%",
      change: "+4.2%",
      icon: TrendingUp,
      positive: true,
    },
    {
      title: "Net P&L",
      value: "$3,285",
      change: "+$540",
      icon: DollarSign,
      positive: true,
    },
    {
      title: "ROI",
      value: "+22.4%",
      change: "+5.1%",
      icon: TrendingUp,
      positive: true,
    },
  ];

  const allBets = [
    // Recent/Active Bets
    { id: 1, date: "2025-11-02", sport: "NFL", event: "Chiefs vs Bills", type: "Spread", pick: "Chiefs -3.5", odds: "-110", amount: 150, status: "Pending", result: 0 },
    { id: 2, date: "2025-11-02", sport: "NBA", event: "Lakers vs Warriors", type: "Moneyline", pick: "Lakers ML", odds: "-165", amount: 100, status: "Pending", result: 0 },
    { id: 3, date: "2025-11-02", sport: "NBA", event: "Celtics vs Heat", type: "Over/Under", pick: "Over 215.5", odds: "-115", amount: 75, status: "Pending", result: 0 },
    { id: 4, date: "2025-11-01", sport: "NFL", event: "49ers vs Cowboys", type: "Spread", pick: "49ers -7", odds: "-110", amount: 200, status: "Won", result: +181.82 },
    { id: 5, date: "2025-11-01", sport: "NBA", event: "Nuggets vs Suns", type: "Moneyline", pick: "Nuggets ML", odds: "-145", amount: 145, status: "Won", result: +100 },
    { id: 6, date: "2025-10-31", sport: "MLB", event: "Yankees vs Red Sox", type: "Over/Under", pick: "Under 8.5", odds: "-110", amount: 110, status: "Won", result: +100 },
    { id: 7, date: "2025-10-31", sport: "NBA", event: "Bucks vs Cavaliers", type: "Spread", pick: "Bucks -6.5", odds: "-110", amount: 110, status: "Lost", result: -110 },
    { id: 8, date: "2025-10-30", sport: "NFL", event: "Patriots vs Jets", type: "Over/Under", pick: "Over 44.5", odds: "-110", amount: 100, status: "Won", result: +90.91 },
    { id: 9, date: "2025-10-30", sport: "NBA", event: "Clippers vs Mavericks", type: "Moneyline", pick: "Clippers ML", odds: "+125", amount: 80, status: "Lost", result: -80 },
    { id: 10, date: "2025-10-29", sport: "Soccer", event: "Man City vs Arsenal", type: "Moneyline", pick: "Man City ML", odds: "-115", amount: 115, status: "Won", result: +100 },
    { id: 11, date: "2025-10-29", sport: "NFL", event: "Dolphins vs Bengals", type: "Spread", pick: "Dolphins -4", odds: "-110", amount: 110, status: "Won", result: +100 },
    { id: 12, date: "2025-10-28", sport: "NBA", event: "Suns vs Jazz", type: "Over/Under", pick: "Over 225.5", odds: "-110", amount: 100, status: "Lost", result: -100 },
    { id: 13, date: "2025-10-28", sport: "MLB", event: "Dodgers vs Giants", type: "Moneyline", pick: "Dodgers ML", odds: "-180", amount: 180, status: "Won", result: +100 },
    { id: 14, date: "2025-10-27", sport: "NFL", event: "Eagles vs Commanders", type: "Spread", pick: "Eagles -9.5", odds: "-110", amount: 110, status: "Won", result: +100 },
    { id: 15, date: "2025-10-27", sport: "NBA", event: "Grizzlies vs Hawks", type: "Moneyline", pick: "Grizzlies ML", odds: "+140", amount: 70, status: "Won", result: +98 },
    { id: 16, date: "2025-10-26", sport: "Soccer", event: "Liverpool vs Chelsea", type: "Over/Under", pick: "Under 2.5", odds: "+105", amount: 100, status: "Lost", result: -100 },
    { id: 17, date: "2025-10-26", sport: "NBA", event: "Nets vs 76ers", type: "Spread", pick: "76ers -5.5", odds: "-110", amount: 110, status: "Won", result: +100 },
    { id: 18, date: "2025-10-25", sport: "NFL", event: "Ravens vs Steelers", type: "Moneyline", pick: "Ravens ML", odds: "-155", amount: 155, status: "Won", result: +100 },
    { id: 19, date: "2025-10-25", sport: "NBA", event: "Kings vs Pelicans", type: "Over/Under", pick: "Over 232.5", odds: "-110", amount: 110, status: "Lost", result: -110 },
    { id: 20, date: "2025-10-24", sport: "MLB", event: "Astros vs Rangers", type: "Spread", pick: "Astros -1.5", odds: "+120", amount: 83, status: "Won", result: +100 },
    { id: 21, date: "2025-10-24", sport: "NBA", event: "Timberwolves vs Thunder", type: "Moneyline", pick: "Thunder ML", odds: "-135", amount: 135, status: "Lost", result: -135 },
    { id: 22, date: "2025-10-23", sport: "NFL", event: "Packers vs Rams", type: "Spread", pick: "Packers -2.5", odds: "-110", amount: 110, status: "Won", result: +100 },
    { id: 23, date: "2025-10-23", sport: "NBA", event: "Hornets vs Wizards", type: "Over/Under", pick: "Under 218.5", odds: "-110", amount: 110, status: "Won", result: +100 },
    { id: 24, date: "2025-10-22", sport: "Soccer", event: "Bayern vs Dortmund", type: "Moneyline", pick: "Bayern ML", odds: "-195", amount: 195, status: "Won", result: +100 },
    { id: 25, date: "2025-10-22", sport: "MLB", event: "Braves vs Phillies", type: "Over/Under", pick: "Over 8", odds: "-110", amount: 110, status: "Lost", result: -110 },
    { id: 26, date: "2025-10-21", sport: "NFL", event: "Broncos vs Chiefs", type: "Spread", pick: "Chiefs -10.5", odds: "-110", amount: 110, status: "Won", result: +100 },
    { id: 27, date: "2025-10-21", sport: "NBA", event: "Blazers vs Rockets", type: "Moneyline", pick: "Rockets ML", odds: "-120", amount: 120, status: "Won", result: +100 },
    { id: 28, date: "2025-10-20", sport: "NBA", event: "Magic vs Raptors", type: "Spread", pick: "Magic -3.5", odds: "-110", amount: 110, status: "Lost", result: -110 },
    { id: 29, date: "2025-10-20", sport: "MLB", event: "Cardinals vs Cubs", type: "Moneyline", pick: "Cardinals ML", odds: "+115", amount: 87, status: "Won", result: +100 },
    { id: 30, date: "2025-10-19", sport: "NFL", event: "Chargers vs Raiders", type: "Over/Under", pick: "Over 47.5", odds: "-110", amount: 110, status: "Won", result: +100 },
    { id: 31, date: "2025-10-19", sport: "NBA", event: "Spurs vs Warriors", type: "Spread", pick: "Warriors -8", odds: "-110", amount: 110, status: "Won", result: +100 },
    { id: 32, date: "2025-10-18", sport: "Soccer", event: "Real Madrid vs Barcelona", type: "Over/Under", pick: "Over 3", odds: "+110", amount: 91, status: "Lost", result: -91 },
    { id: 33, date: "2025-10-18", sport: "NBA", event: "Hawks vs Knicks", type: "Moneyline", pick: "Knicks ML", odds: "-175", amount: 175, status: "Won", result: +100 },
    { id: 34, date: "2025-10-17", sport: "NFL", event: "Seahawks vs Cardinals", type: "Spread", pick: "Seahawks -4", odds: "-110", amount: 110, status: "Won", result: +100 },
    { id: 35, date: "2025-10-17", sport: "MLB", event: "Mets vs Nationals", type: "Moneyline", pick: "Mets ML", odds: "-160", amount: 160, status: "Lost", result: -160 },
    { id: 36, date: "2025-10-16", sport: "NBA", event: "Bulls vs Pacers", type: "Over/Under", pick: "Under 228.5", odds: "-110", amount: 110, status: "Won", result: +100 },
    { id: 37, date: "2025-10-16", sport: "NFL", event: "Vikings vs Bears", type: "Spread", pick: "Vikings -6.5", odds: "-110", amount: 110, status: "Won", result: +100 },
    { id: 38, date: "2025-10-15", sport: "NBA", event: "Heat vs Celtics", type: "Moneyline", pick: "Heat ML", odds: "+195", amount: 51, status: "Lost", result: -51 },
    { id: 39, date: "2025-10-15", sport: "Soccer", event: "PSG vs Lyon", type: "Spread", pick: "PSG -1.5", odds: "-125", amount: 125, status: "Won", result: +100 },
    { id: 40, date: "2025-10-14", sport: "MLB", event: "White Sox vs Twins", type: "Over/Under", pick: "Over 9", odds: "-110", amount: 110, status: "Won", result: +100 },
    { id: 41, date: "2025-10-14", sport: "NBA", event: "Pistons vs Cavaliers", type: "Spread", pick: "Cavaliers -12", odds: "-110", amount: 110, status: "Lost", result: -110 },
    { id: 42, date: "2025-10-13", sport: "NFL", event: "Titans vs Jaguars", type: "Moneyline", pick: "Titans ML", odds: "-130", amount: 130, status: "Won", result: +100 },
    { id: 43, date: "2025-10-13", sport: "NBA", event: "Clippers vs Lakers", type: "Over/Under", pick: "Over 226.5", odds: "-110", amount: 110, status: "Won", result: +100 },
    { id: 44, date: "2025-10-12", sport: "Soccer", event: "Juventus vs AC Milan", type: "Moneyline", pick: "Juventus ML", odds: "-110", amount: 110, status: "Won", result: +100 },
    { id: 45, date: "2025-10-12", sport: "MLB", event: "Blue Jays vs Orioles", type: "Spread", pick: "Blue Jays -1.5", odds: "+130", amount: 77, status: "Lost", result: -77 },
    { id: 46, date: "2025-10-11", sport: "NBA", event: "Warriors vs Suns", type: "Moneyline", pick: "Suns ML", odds: "+125", amount: 80, status: "Won", result: +100 },
    { id: 47, date: "2025-10-11", sport: "NFL", event: "Panthers vs Saints", type: "Spread", pick: "Saints -5.5", odds: "-110", amount: 110, status: "Won", result: +100 },
  ];

  const pendingBets = allBets.filter(bet => bet.status === "Pending");
  const completedBets = allBets.filter(bet => bet.status !== "Pending");

  // Calculate actual stats from bet data
  const wonBets = completedBets.filter(bet => bet.status === "Won");
  const lostBets = completedBets.filter(bet => bet.status === "Lost");
  const totalWagered = allBets.reduce((sum, bet) => sum + bet.amount, 0);
  const totalProfit = completedBets.reduce((sum, bet) => sum + bet.result, 0);
  const winRate = ((wonBets.length / completedBets.length) * 100).toFixed(1);
  const roi = ((totalProfit / totalWagered) * 100).toFixed(1);

  // User profile data
  const userProfile = {
    yearsActive: 2.3,
    totalInvested: 45000,
    leaderboardRank: 23, // Out of ~50 users
    sports: ["NFL", "NBA", "MLB"]
  };

  const userBadge = getBadge(userProfile.yearsActive, parseFloat(winRate), userProfile.totalInvested);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="mb-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-gradient">Dashboard</h1>
              <p className="text-muted-foreground">Track your betting performance and manage your active bets</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                <span className="text-lg font-bold">Rank #{userProfile.leaderboardRank}</span>
              </div>
              <Badge variant={userBadge.variant} className="text-sm">
                {userBadge.label}
              </Badge>
              <div className="flex gap-1">
                {userProfile.sports.map((sport) => (
                  <Badge key={sport} variant="secondary" className="text-xs">
                    {sport}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const isPositive = stat.change.startsWith('+');
            return (
              <Card key={stat.title} className="gradient-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{stat.title}</span>
                    <Icon className={`w-5 h-5 ${isPositive ? 'text-success' : 'text-primary'}`} />
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className={`text-sm flex items-center gap-1 ${isPositive ? 'text-success' : 'text-muted-foreground'}`}>
                    {isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    {stat.change} this month
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Pending Bets */}
        {pendingBets.length > 0 && (
          <Card className="gradient-card border-border mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Pending Bets ({pendingBets.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Sport</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Event</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Pick</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Odds</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Stake</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingBets.map((bet) => (
                      <tr key={bet.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                        <td className="py-3 px-4 text-sm text-muted-foreground">{bet.date}</td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary" className="text-xs">{bet.sport}</Badge>
                        </td>
                        <td className="py-3 px-4 text-sm">{bet.event}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{bet.type}</td>
                        <td className="py-3 px-4 text-sm font-medium">{bet.pick}</td>
                        <td className="py-3 px-4 text-sm text-primary">{bet.odds}</td>
                        <td className="py-3 px-4 text-sm text-right font-medium">${bet.amount}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="text-xs border-primary/50 text-primary">
                            {bet.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bet History */}
        <Card className="gradient-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Bet History ({completedBets.length} completed)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Sport</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Event</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Pick</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Stake</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Result</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Profit/Loss</th>
                  </tr>
                </thead>
                <tbody>
                  {completedBets.map((bet) => (
                    <tr key={bet.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                      <td className="py-3 px-4 text-sm text-muted-foreground">{bet.date}</td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary" className="text-xs">{bet.sport}</Badge>
                      </td>
                      <td className="py-3 px-4 text-sm">{bet.event}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{bet.type}</td>
                      <td className="py-3 px-4 text-sm font-medium">{bet.pick}</td>
                      <td className="py-3 px-4 text-sm text-right">${bet.amount}</td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant={bet.status === "Won" ? "outline" : "destructive"}
                          className={bet.status === "Won" ? "bg-success/10 text-success border-success/50" : ""}
                        >
                          {bet.status}
                        </Badge>
                      </td>
                      <td className={`py-3 px-4 text-sm text-right font-bold ${
                        bet.result > 0 ? 'text-success' : 'text-destructive'
                      }`}>
                        {bet.result > 0 ? '+' : ''}${bet.result.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
