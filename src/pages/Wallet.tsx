import { DollarSign, TrendingUp, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";

const Wallet = () => {
  const balanceStats = [
    { label: "Available Balance", value: "$385.00", icon: DollarSign },
    { label: "Pending Bets", value: "$120.00", icon: TrendingUp },
    { label: "Tipster Earnings", value: "+$212.50", icon: ArrowUpFromLine },
    { label: "Performance Fees Paid", value: "-$45.00", icon: ArrowDownToLine },
  ];

  const transactions = [
    { date: "2025-10-28", type: "Win", description: "Lakers ML - @SharpShooter23", amount: "+$87.50", fee: "-$17.50" },
    { date: "2025-10-27", type: "Deposit", description: "Bank Transfer", amount: "+$200.00", fee: "$0.00" },
    { date: "2025-10-26", type: "Win", description: "Patriots Over 47.5 - @DataDriven", amount: "+$71.25", fee: "-$14.25" },
    { date: "2025-10-25", type: "Loss", description: "Bulls ML - @TheAnalyst", amount: "-$50.00", fee: "$0.00" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-gradient">Wallet</h1>
            <p className="text-muted-foreground">Manage your funds and track earnings</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <ArrowDownToLine className="w-4 h-4 mr-2" />
              Deposit
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <ArrowUpFromLine className="w-4 h-4 mr-2" />
              Withdraw
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {balanceStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="gradient-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="gradient-card border-border">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Description</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, index) => (
                    <tr key={index} className="border-b border-border/50">
                      <td className="py-3 px-4 text-muted-foreground">{tx.date}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          tx.type === 'Win' ? 'bg-success/10 text-success' :
                          tx.type === 'Loss' ? 'bg-destructive/10 text-destructive' :
                          'bg-primary/10 text-primary'
                        }`}>
                          {tx.type}
                        </span>
                      </td>
                      <td className="py-3 px-4">{tx.description}</td>
                      <td className={`py-3 px-4 text-right font-medium ${
                        tx.amount.startsWith('+') ? 'text-success' : 'text-destructive'
                      }`}>
                        {tx.amount}
                      </td>
                      <td className="py-3 px-4 text-right text-muted-foreground">{tx.fee}</td>
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

export default Wallet;
