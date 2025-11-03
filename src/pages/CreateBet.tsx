import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { Plus, X, TrendingUp, DollarSign, Percent, Eye, EyeOff, Circle, Dribbble } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateBet = () => {
  const { toast } = useToast();
  const [selectedSport, setSelectedSport] = useState("nfl");
  const [selectedGame, setSelectedGame] = useState("");
  const [betType, setBetType] = useState("");
  const [odds, setOdds] = useState("1.90");
  const [wager, setWager] = useState(0);
  const [parlayLegs, setParlayLegs] = useState<any[]>([]);
  const [tipPercentage, setTipPercentage] = useState(10);
  const [isPublic, setIsPublic] = useState(true);

  const sports = [
    { id: "nfl", name: "NFL", icon: Circle },
    { id: "nba", name: "NBA", icon: Dribbble },
    { id: "mlb", name: "MLB", icon: Circle },
    { id: "nhl", name: "NHL", icon: Circle },
    { id: "ufc", name: "UFC", icon: Circle },
    { id: "soccer", name: "Soccer", icon: Circle },
  ];

  const games = {
    nfl: ["Chiefs vs Bills", "Ravens vs 49ers", "Cowboys vs Eagles", "Packers vs Vikings"],
    nba: ["Lakers vs Warriors", "Celtics vs Heat", "Bucks vs Nets", "Suns vs Nuggets"],
    mlb: ["Yankees vs Red Sox", "Dodgers vs Giants", "Astros vs Rangers", "Braves vs Mets"],
    nhl: ["Maple Leafs vs Bruins", "Oilers vs Flames", "Rangers vs Islanders", "Avalanche vs Wild"],
    ufc: ["UFC 300 Main Event", "UFC Fight Night Headliner", "Title Fight Championship"],
    soccer: ["Man City vs Liverpool", "Real Madrid vs Barcelona", "PSG vs Bayern", "Chelsea vs Arsenal"],
  };

  const betTypes = [
    "Spread",
    "Moneyline",
    "Over/Under",
    "Player Props",
    "Parlay",
  ];

  const calculatePayout = () => {
    const totalOdds = parlayLegs.reduce((acc, leg) => acc * parseFloat(leg.odds), parseFloat(odds));
    return (wager * totalOdds).toFixed(2);
  };

  const handlePublishBet = () => {
    if (!selectedGame || !betType || !wager || wager < 5) {
      toast({
        title: "Invalid Bet",
        description: "Please complete all fields and ensure minimum wager is $5",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Bet Published!",
      description: `Your ${selectedSport.toUpperCase()} bet is now ${isPublic ? "public" : "private"} with ${tipPercentage}% tip requirement`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gradient">Create Your Bet</h1>
          <p className="text-muted-foreground">Build custom bets across multiple sports and earn when others copy you</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Bet Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Sport Selection */}
            <div>
              <Label>Select Sport</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {sports.map(sport => {
                  const Icon = sport.icon;
                  return (
                    <div
                      key={sport.id}
                      onClick={() => setSelectedSport(sport.id)}
                      className={`flex items-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedSport === sport.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Icon className="w-5 h-5 text-primary" />
                      <span className="font-medium">{sport.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Game Selection */}
            <div>
              <Label htmlFor="game">Select Game</Label>
              <Select value={selectedGame} onValueChange={setSelectedGame}>
                <SelectTrigger id="game">
                  <SelectValue placeholder="Choose a game" />
                </SelectTrigger>
                <SelectContent>
                  {games[selectedSport as keyof typeof games]?.map(game => (
                    <SelectItem key={game} value={game}>{game}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Bet Type */}
            <div>
              <Label htmlFor="bet-type">Bet Type</Label>
              <Select value={betType} onValueChange={setBetType}>
                <SelectTrigger id="bet-type">
                  <SelectValue placeholder="Choose bet type" />
                </SelectTrigger>
                <SelectContent>
                  {betTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Odds (Display Only) */}
            <div>
              <Label htmlFor="odds">Odds (Fixed)</Label>
              <Input
                id="odds"
                value={odds}
                disabled
                className="bg-secondary/50"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Official odds - cannot be modified
              </p>
            </div>

            {/* Wager Amount */}
            <div>
              <Label htmlFor="wager">Wager Amount ($)</Label>
              <Input
                id="wager"
                type="number"
                min="5"
                value={wager || ""}
                onChange={(e) => setWager(parseFloat(e.target.value))}
                placeholder="Minimum $5"
              />
            </div>

            {/* Tip Percentage */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="tip">Tip Percentage Required</Label>
                <Badge variant="outline" className="text-primary border-primary">
                  {tipPercentage}%
                </Badge>
              </div>
              <Input
                id="tip"
                type="number"
                min="1"
                max="99"
                step="1"
                value={tipPercentage}
                onChange={(e) => setTipPercentage(Math.min(99, Math.max(1, parseInt(e.target.value) || 1)))}
                className="cursor-pointer"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Copiers must pay this percentage to copy your bet (1% - 99%)
              </p>
            </div>

            {/* Visibility */}
            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-3">
                {isPublic ? <Eye className="w-5 h-5 text-primary" /> : <EyeOff className="w-5 h-5 text-muted-foreground" />}
                <div>
                  <Label htmlFor="visibility" className="cursor-pointer">Make Bet Public</Label>
                  <p className="text-xs text-muted-foreground">Allow anyone to discover and copy this bet</p>
                </div>
              </div>
              <Switch
                id="visibility"
                checked={isPublic}
                onCheckedChange={setIsPublic}
              />
            </div>

            {/* Publish Button */}
            <Button onClick={handlePublishBet} className="w-full" size="lg">
              <TrendingUp className="w-4 h-4 mr-2" />
              Publish Bet
            </Button>
          </CardContent>
        </Card>
        </div>

        {/* Summary Card */}
        <Card className="bg-card border-border sticky top-24">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Bet Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sport</span>
                <span className="font-medium">{selectedSport.toUpperCase()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Game</span>
                <span className="font-medium">{selectedGame || "Not selected"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Type</span>
                <span className="font-medium">{betType || "Not selected"}</span>
              </div>
              {parlayLegs.length > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Parlay Legs</span>
                  <span className="font-medium">{parlayLegs.length + 1}</span>
                </div>
              )}
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Wager</span>
                <span className="font-bold">${wager || "0.00"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Tip Requirement</span>
                <Badge variant="outline" className="text-primary border-primary">{tipPercentage}%</Badge>
              </div>
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Potential Payout</span>
                <span className="font-bold text-success">${calculatePayout()}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm">
                {isPublic ? (
                  <>
                    <Eye className="w-4 h-4 text-success" />
                    <span className="text-success font-medium">Public - Discoverable</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Private - Link Only</span>
                  </>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {isPublic ? "Anyone can find and copy this bet" : "Only people with the link can copy"}
              </p>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateBet;
