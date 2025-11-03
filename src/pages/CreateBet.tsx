import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Navigation from "@/components/Navigation";
import { toast } from "@/hooks/use-toast";
import { ArrowRight, Plus, Trash2, DollarSign, Users, Lock, Globe } from "lucide-react";

// Mock upcoming games
const upcomingGames = [
  { id: 1, sport: "NFL", team1: "Kansas City Chiefs", team2: "Buffalo Bills", date: "2025-11-03", time: "8:20 PM ET" },
  { id: 2, sport: "NBA", team1: "Los Angeles Lakers", team2: "Golden State Warriors", date: "2025-11-03", time: "10:00 PM ET" },
  { id: 3, sport: "NFL", team1: "San Francisco 49ers", team2: "Dallas Cowboys", date: "2025-11-04", time: "4:25 PM ET" },
  { id: 4, sport: "NBA", team1: "Boston Celtics", team2: "Miami Heat", date: "2025-11-04", time: "7:30 PM ET" },
  { id: 5, sport: "Soccer", team1: "Manchester City", team2: "Arsenal", date: "2025-11-04", time: "12:30 PM ET" },
];

type BetType = "spread" | "moneyline" | "over_under" | "prop";

interface BetLeg {
  id: string;
  gameId: number;
  betType: BetType;
  selection: string;
  odds: string;
}

const CreateBet = () => {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const [betLegs, setBetLegs] = useState<BetLeg[]>([]);
  const [wagerAmount, setWagerAmount] = useState("");
  const [commission, setCommission] = useState("10");
  const [isPublic, setIsPublic] = useState(true);
  const [currentBetType, setCurrentBetType] = useState<BetType>("spread");

  const game = upcomingGames.find(g => g.id === selectedGame);

  const getBetOptions = (type: BetType) => {
    if (!game) return [];
    
    switch (type) {
      case "spread":
        return [
          { label: `${game.team1} -3.5`, odds: "-110" },
          { label: `${game.team2} +3.5`, odds: "-110" },
        ];
      case "moneyline":
        return [
          { label: `${game.team1} ML`, odds: "-165" },
          { label: `${game.team2} ML`, odds: "+145" },
        ];
      case "over_under":
        return [
          { label: "Over 54.5", odds: "-115" },
          { label: "Under 54.5", odds: "-105" },
        ];
      case "prop":
        return [
          { label: "Player to score first TD", odds: "+450" },
          { label: "Total rushing yards Over 125.5", odds: "-110" },
        ];
      default:
        return [];
    }
  };

  const addBetLeg = (selection: string, odds: string) => {
    if (!selectedGame || !currentBetType) return;

    const newLeg: BetLeg = {
      id: Math.random().toString(),
      gameId: selectedGame,
      betType: currentBetType,
      selection,
      odds,
    };

    setBetLegs([...betLegs, newLeg]);
  };

  const removeBetLeg = (id: string) => {
    setBetLegs(betLegs.filter(leg => leg.id !== id));
  };

  const calculatePotentialPayout = () => {
    const wager = parseFloat(wagerAmount) || 0;
    if (wager === 0 || betLegs.length === 0) return 0;

    // Simplified odds calculation (would be more complex in reality)
    const multiplier = betLegs.length > 1 ? 2.5 * betLegs.length : 1.9;
    return wager * multiplier;
  };

  const handlePublishBet = () => {
    if (betLegs.length === 0) {
      toast({
        title: "No bets selected",
        description: "Please add at least one bet leg",
        variant: "destructive"
      });
      return;
    }

    if (!wagerAmount || parseFloat(wagerAmount) < 5) {
      toast({
        title: "Invalid wager",
        description: "Minimum wager is $5",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Bet published!",
      description: `Your ${isPublic ? 'public' : 'private'} bet is now live with ${commission}% commission`,
    });

    // Would save to database here
    setTimeout(() => navigate("/browse-bets"), 1500);
  };

  const potentialPayout = calculatePotentialPayout();
  const copierEarnings = potentialPayout * (parseFloat(commission) / 100);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gradient">Create Your Bet</h1>
          <p className="text-muted-foreground">Build a custom bet and earn when others copy it</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Bet Builder */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Select Game */}
            <Card className="gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">1</span>
                  Select Game
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingGames.map(game => (
                  <div
                    key={game.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedGame === game.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedGame(game.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge variant="secondary" className="mb-2">{game.sport}</Badge>
                        <div className="font-semibold">{game.team1} vs {game.team2}</div>
                        <div className="text-sm text-muted-foreground">{game.date} at {game.time}</div>
                      </div>
                      {selectedGame === game.id && (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-primary-foreground text-sm">✓</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Step 2: Choose Bet Type */}
            {selectedGame && (
              <Card className="gradient-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">2</span>
                    Choose Bet Type & Selection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Bet Type</Label>
                    <Select value={currentBetType} onValueChange={(value) => setCurrentBetType(value as BetType)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spread">Spread</SelectItem>
                        <SelectItem value="moneyline">Moneyline</SelectItem>
                        <SelectItem value="over_under">Over/Under</SelectItem>
                        <SelectItem value="prop">Player Props</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label>Available Bets</Label>
                    {getBetOptions(currentBetType).map((option, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 cursor-pointer"
                        onClick={() => addBetLeg(option.label, option.odds)}
                      >
                        <span className="font-medium">{option.label}</span>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="font-mono">{option.odds}</Badge>
                          <Button size="sm" variant="ghost">
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Bet Slip */}
          <div className="lg:col-span-1">
            <Card className="gradient-card border-border sticky top-24">
              <CardHeader>
                <CardTitle>Your Bet Slip</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {betLegs.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No selections yet</p>
                    <p className="text-sm mt-2">Add bets to get started</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      {betLegs.map(leg => {
                        const legGame = upcomingGames.find(g => g.id === leg.gameId);
                        return (
                          <div key={leg.id} className="p-3 rounded-lg bg-secondary/50 border border-border">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <div className="flex-1">
                                <div className="text-xs text-muted-foreground">{legGame?.team1} vs {legGame?.team2}</div>
                                <div className="font-medium text-sm">{leg.selection}</div>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeBetLeg(leg.id)}
                                className="h-6 w-6 p-0"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                            <Badge variant="outline" className="text-xs font-mono">{leg.odds}</Badge>
                          </div>
                        );
                      })}
                    </div>

                    {betLegs.length > 1 && (
                      <Badge variant="default" className="w-full justify-center py-1">
                        {betLegs.length}-Leg Parlay
                      </Badge>
                    )}

                    <div className="space-y-3 pt-3 border-t border-border">
                      <div>
                        <Label htmlFor="wager">Wager Amount</Label>
                        <Input
                          id="wager"
                          type="number"
                          placeholder="$0.00"
                          value={wagerAmount}
                          onChange={(e) => setWagerAmount(e.target.value)}
                          min="5"
                        />
                      </div>

                      <div>
                        <Label htmlFor="commission">Your Commission (%)</Label>
                        <Select value={commission} onValueChange={setCommission}>
                          <SelectTrigger id="commission">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5% - Lower cut, more copiers</SelectItem>
                            <SelectItem value="10">10% - Recommended</SelectItem>
                            <SelectItem value="15">15% - Higher earnings</SelectItem>
                            <SelectItem value="20">20% - Maximum</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center space-x-2 p-3 rounded-lg border border-border">
                        <Checkbox
                          id="public"
                          checked={isPublic}
                          onCheckedChange={(checked) => setIsPublic(checked as boolean)}
                        />
                        <div className="flex-1">
                          <label
                            htmlFor="public"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {isPublic ? (
                              <span className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-primary" />
                                Public - Anyone can copy
                              </span>
                            ) : (
                              <span className="flex items-center gap-2">
                                <Lock className="w-4 h-4" />
                                Private - Share link only
                              </span>
                            )}
                          </label>
                        </div>
                      </div>

                      <div className="space-y-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Potential Payout</span>
                          <span className="font-bold">${potentialPayout.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Your Commission ({commission}%)</span>
                          <span className="font-bold text-success">+${copierEarnings.toFixed(2)}</span>
                        </div>
                      </div>

                      <Button
                        className="w-full bg-primary hover:bg-primary/90"
                        onClick={handlePublishBet}
                      >
                        Publish Bet
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBet;
