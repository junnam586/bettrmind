import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const Dashboard = () => {
  const stats = [
    {
      title: "Total ROI",
      value: "+18.6%",
      change: "+2.4%",
      icon: TrendingUp,
      positive: true,
    },
    {
      title: "Win Rate",
      value: "56.2%",
      change: "+3.1%",
      icon: Target,
      positive: true,
    },
    {
      title: "Net P&L",
      value: "$2,845",
      change: "+$340",
      icon: DollarSign,
      positive: true,
    },
    {
      title: "Active Bets",
      value: "12",
      change: "-3",
      icon: TrendingDown,
      positive: false,
    },
  ];

  const activeBets = [
    {
      event: "Lakers vs Warriors",
      pick: "Lakers ML",
      odds: 2.15,
      stake: 50,
      copiedFrom: "SharpShooter23",
      status: "Open",
    },
    {
      event: "Patriots vs Bills",
      pick: "Over 47.5",
      odds: 1.95,
      stake: 75,
      copiedFrom: "DataDriven",
      status: "Open",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gradient">Dashboard</h1>
          <p className="text-muted-foreground">Track your performance and manage your bets</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="gradient-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{stat.title}</span>
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className={`text-sm ${stat.positive ? 'text-success' : 'text-muted-foreground'}`}>
                    {stat.change} this week
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="gradient-card border-border mb-8">
          <CardHeader>
            <CardTitle>Active Bets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Event</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Pick</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Odds</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Stake</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Copied From</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {activeBets.map((bet, index) => (
                    <tr key={index} className="border-b border-border/50">
                      <td className="py-3 px-4">{bet.event}</td>
                      <td className="py-3 px-4 font-medium">{bet.pick}</td>
                      <td className="py-3 px-4 text-primary">{bet.odds}</td>
                      <td className="py-3 px-4">${bet.stake}</td>
                      <td className="py-3 px-4 text-muted-foreground">@{bet.copiedFrom}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                          {bet.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-border">
          <CardHeader>
            <CardTitle>ROI Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Performance chart coming soon
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
