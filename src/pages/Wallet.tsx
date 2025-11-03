import { useState } from "react";
import { DollarSign, TrendingUp, ArrowDownToLine, ArrowUpFromLine, CreditCard, Building2, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { toast } from "@/hooks/use-toast";

const Wallet = () => {
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [balance, setBalance] = useState(2450);

  const balanceStats = [
    { label: "Current Balance", value: `$${balance.toFixed(2)}`, icon: DollarSign, highlight: true },
    { label: "In Pending Bets", value: "$325.00", icon: TrendingUp },
    { label: "Total Deposited", value: "$5,200.00", icon: ArrowDownToLine },
    { label: "Total Withdrawn", value: "$3,075.00", icon: ArrowUpFromLine },
  ];

  const paymentMethods = [
    { id: 1, type: "Visa", last4: "4242", expiry: "12/26", isPrimary: true },
    { id: 2, type: "Mastercard", last4: "8888", expiry: "09/27", isPrimary: false },
  ];

  const bankAccounts = [
    { id: 1, bank: "Chase Bank", accountType: "Checking", last4: "6789", isPrimary: true },
  ];

  const transactions = [
    { id: 1, date: "2025-11-02", type: "Bet Placed", description: "Chiefs vs Bills - Spread", amount: -150, status: "Completed", balance: 2450 },
    { id: 2, date: "2025-11-02", type: "Bet Placed", description: "Lakers vs Warriors - ML", amount: -100, status: "Completed", balance: 2600 },
    { id: 3, date: "2025-11-01", type: "Bet Won", description: "49ers vs Cowboys - Spread", amount: +181.82, status: "Completed", balance: 2700 },
    { id: 4, date: "2025-11-01", type: "Bet Placed", description: "Nuggets vs Suns - ML", amount: -145, status: "Completed", balance: 2518.18 },
    { id: 5, date: "2025-11-01", type: "Bet Won", description: "Nuggets vs Suns - ML", amount: +100, status: "Completed", balance: 2663.18 },
    { id: 6, date: "2025-10-31", type: "Deposit", description: "Visa ••••4242", amount: +500, status: "Completed", balance: 2563.18 },
    { id: 7, date: "2025-10-31", type: "Bet Won", description: "Yankees vs Red Sox - Under", amount: +100, status: "Completed", balance: 2063.18 },
    { id: 8, date: "2025-10-31", type: "Bet Placed", description: "Bucks vs Cavaliers - Spread", amount: -110, status: "Completed", balance: 1963.18 },
    { id: 9, date: "2025-10-31", type: "Bet Lost", description: "Bucks vs Cavaliers - Spread", amount: -110, status: "Completed", balance: 2073.18 },
    { id: 10, date: "2025-10-30", type: "Bet Placed", description: "Patriots vs Jets - Over", amount: -100, status: "Completed", balance: 2183.18 },
    { id: 11, date: "2025-10-30", type: "Bet Won", description: "Patriots vs Jets - Over", amount: +90.91, status: "Completed", balance: 2283.18 },
    { id: 12, date: "2025-10-29", type: "Withdrawal", description: "Bank •••• 6789", amount: -750, status: "Completed", balance: 2192.27 },
    { id: 13, date: "2025-10-28", type: "Deposit", description: "Visa ••••4242", amount: +1000, status: "Completed", balance: 2942.27 },
    { id: 14, date: "2025-10-27", type: "Bet Won", description: "Eagles vs Commanders - Spread", amount: +100, status: "Completed", balance: 1942.27 },
    { id: 15, date: "2025-10-26", type: "Bet Placed", description: "Liverpool vs Chelsea - Under", amount: -100, status: "Completed", balance: 1842.27 },
    { id: 16, date: "2025-10-26", type: "Bet Lost", description: "Liverpool vs Chelsea - Under", amount: -100, status: "Completed", balance: 1942.27 },
    { id: 17, date: "2025-10-25", type: "Bet Won", description: "Ravens vs Steelers - ML", amount: +100, status: "Completed", balance: 2042.27 },
    { id: 18, date: "2025-10-24", type: "Deposit", description: "Mastercard ••••8888", amount: +500, status: "Completed", balance: 1942.27 },
  ];

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (!amount || amount < 10) {
      toast({
        title: "Invalid amount",
        description: "Minimum deposit is $10",
        variant: "destructive"
      });
      return;
    }
    if (amount > 10000) {
      toast({
        title: "Amount too large",
        description: "Maximum deposit is $10,000",
        variant: "destructive"
      });
      return;
    }
    
    setBalance(prev => prev + amount);
    setShowDeposit(false);
    setDepositAmount("");
    toast({
      title: "Deposit successful!",
      description: `$${amount.toFixed(2)} has been added to your balance`,
    });
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    const availableBalance = balance - 325; // Subtract pending bets
    
    if (!amount || amount < 10) {
      toast({
        title: "Invalid amount",
        description: "Minimum withdrawal is $10",
        variant: "destructive"
      });
      return;
    }
    if (amount > availableBalance) {
      toast({
        title: "Insufficient funds",
        description: `You can withdraw up to $${availableBalance.toFixed(2)} (you have $325 in pending bets)`,
        variant: "destructive"
      });
      return;
    }
    
    setBalance(prev => prev - amount);
    setShowWithdraw(false);
    setWithdrawAmount("");
    toast({
      title: "Withdrawal initiated!",
      description: `$${amount.toFixed(2)} will arrive in 3-5 business days`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-gradient">Wallet</h1>
            <p className="text-muted-foreground">Manage your funds and track transactions</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary/10"
              onClick={() => setShowDeposit(true)}
            >
              <ArrowDownToLine className="w-4 h-4 mr-2" />
              Deposit
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => setShowWithdraw(true)}
            >
              <ArrowUpFromLine className="w-4 h-4 mr-2" />
              Withdraw
            </Button>
          </div>
        </div>

        {/* Balance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {balanceStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className={`gradient-card border-border ${stat.highlight ? 'ring-2 ring-primary/20' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className={`text-2xl font-bold mb-1 ${stat.highlight ? 'text-primary' : ''}`}>{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Payment Methods */}
        <Card className="gradient-card border-border mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Methods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {paymentMethods.map((card) => (
                <div key={card.id} className="flex items-center justify-between p-4 rounded-lg glass-card border border-border">
                  <div className="flex items-center gap-4">
                    <CreditCard className="w-6 h-6 text-primary" />
                    <div>
                      <div className="font-medium">{card.type} ending in {card.last4}</div>
                      <div className="text-sm text-muted-foreground">Expires {card.expiry}</div>
                    </div>
                  </div>
                  {card.isPrimary && (
                    <Badge variant="outline" className="border-primary text-primary">Primary</Badge>
                  )}
                </div>
              ))}
              
              {bankAccounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between p-4 rounded-lg glass-card border border-border">
                  <div className="flex items-center gap-4">
                    <Building2 className="w-6 h-6 text-primary" />
                    <div>
                      <div className="font-medium">{account.bank} - {account.accountType}</div>
                      <div className="text-sm text-muted-foreground">Account ending in {account.last4}</div>
                    </div>
                  </div>
                  {account.isPrimary && (
                    <Badge variant="outline" className="border-primary text-primary">Primary</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card className="gradient-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Transaction History
            </CardTitle>
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
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                      <td className="py-3 px-4 text-sm text-muted-foreground">{tx.date}</td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${
                            tx.type === 'Deposit' ? 'bg-success/10 text-success' :
                            tx.type === 'Withdrawal' ? 'bg-primary/10 text-primary' :
                            tx.type === 'Bet Won' ? 'bg-success/10 text-success' :
                            tx.type === 'Bet Lost' ? 'bg-destructive/10 text-destructive' :
                            'bg-secondary'
                          }`}
                        >
                          {tx.type}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm">{tx.description}</td>
                      <td className={`py-3 px-4 text-sm text-right font-bold ${
                        tx.amount > 0 ? 'text-success' : 'text-destructive'
                      }`}>
                        {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="text-xs border-success/50 text-success">
                          {tx.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-right text-muted-foreground">
                        ${tx.balance.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deposit Dialog */}
      <Dialog open={showDeposit} onOpenChange={setShowDeposit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deposit Funds</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="deposit-amount">Amount ($10 - $10,000)</Label>
              <Input
                id="deposit-amount"
                type="number"
                placeholder="Enter amount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                min="10"
                max="10000"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setDepositAmount("50")}>$50</Button>
              <Button variant="outline" size="sm" onClick={() => setDepositAmount("100")}>$100</Button>
              <Button variant="outline" size="sm" onClick={() => setDepositAmount("250")}>$250</Button>
              <Button variant="outline" size="sm" onClick={() => setDepositAmount("500")}>$500</Button>
              <Button variant="outline" size="sm" onClick={() => setDepositAmount("1000")}>$1,000</Button>
            </div>
            <div>
              <Label>Payment Method</Label>
              <div className="mt-2 p-3 rounded-lg glass-card border border-border flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <div className="font-medium">Visa ••••4242</div>
                  <div className="text-xs text-muted-foreground">Primary card</div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeposit(false)}>Cancel</Button>
            <Button onClick={handleDeposit} className="bg-primary hover:bg-primary/90">
              Confirm Deposit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Withdraw Dialog */}
      <Dialog open={showWithdraw} onOpenChange={setShowWithdraw}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Withdraw Funds</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
              <div className="text-sm text-muted-foreground">Available to withdraw</div>
              <div className="text-2xl font-bold text-primary">${(balance - 325).toFixed(2)}</div>
              <div className="text-xs text-muted-foreground mt-1">($325 in pending bets)</div>
            </div>
            <div>
              <Label htmlFor="withdraw-amount">Amount (min $10)</Label>
              <Input
                id="withdraw-amount"
                type="number"
                placeholder="Enter amount"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                min="10"
                max={balance - 325}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setWithdrawAmount(((balance - 325) * 0.25).toFixed(2))}>25%</Button>
              <Button variant="outline" size="sm" onClick={() => setWithdrawAmount(((balance - 325) * 0.5).toFixed(2))}>50%</Button>
              <Button variant="outline" size="sm" onClick={() => setWithdrawAmount(((balance - 325) * 0.75).toFixed(2))}>75%</Button>
              <Button variant="outline" size="sm" onClick={() => setWithdrawAmount((balance - 325).toFixed(2))}>100%</Button>
            </div>
            <div>
              <Label>Withdraw to</Label>
              <div className="mt-2 p-3 rounded-lg glass-card border border-border flex items-center gap-3">
                <Building2 className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <div className="font-medium">Chase Bank - Checking</div>
                  <div className="text-xs text-muted-foreground">•••• 6789 • 3-5 business days</div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowWithdraw(false)}>Cancel</Button>
            <Button onClick={handleWithdraw} className="bg-primary hover:bg-primary/90">
              Confirm Withdrawal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Wallet;
