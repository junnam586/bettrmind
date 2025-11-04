import { useState } from 'react';
import { ShoppingBasket, X, Sparkles, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useBasket } from '@/contexts/BasketContext';
import { useToast } from '@/hooks/use-toast';

const BettingBasket = () => {
  const { basket, removeFromBasket, clearBasket, isShadowMode, setIsShadowMode } = useBasket();
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [aiScore, setAiScore] = useState<number | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [wager, setWager] = useState<string>('100');

  const calculateParlayOdds = () => {
    if (basket.length === 0) return 1;
    return basket.reduce((total, bet) => total * bet.odds, 1);
  };

  const calculatePayout = () => {
    const wagerAmount = parseFloat(wager) || 0;
    return (wagerAmount * calculateParlayOdds()).toFixed(2);
  };

  const getAIScore = async () => {
    if (basket.length === 0) return;
    
    setIsLoadingAI(true);
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate random score between 30-95
    const randomScore = Math.floor(Math.random() * 66) + 30;
    
    const reasoning = randomScore >= 70 
      ? 'Strong probability based on recent form and statistics'
      : randomScore >= 50
      ? 'Moderate confidence with some risk factors'
      : 'High risk bet with mixed indicators';
    
    setAiScore(randomScore);
    setIsLoadingAI(false);
    
    toast({
      title: 'AI Analysis Complete',
      description: `Score: ${randomScore}/100 - ${reasoning}`,
    });
  };

  const handlePlaceBet = () => {
    if (basket.length === 0) return;

    const moneyType = isShadowMode ? 'shadow money' : 'real money';
    
    if (basket.length === 1) {
      toast({
        title: isShadowMode ? 'Shadow Bet Placed!' : 'Bet Placed!',
        description: `Single bet with ${basket[0].odds.toFixed(2)}x odds using ${moneyType}`,
      });
    } else {
      toast({
        title: isShadowMode ? 'Shadow Parlay Created!' : 'Parlay Created!',
        description: `${basket.length}-leg parlay with ${calculateParlayOdds().toFixed(2)}x odds using ${moneyType}`,
      });
    }
    clearBasket();
    setAiScore(null);
    setWager('100');
  };

  if (!isExpanded) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="rounded-full shadow-lg"
          onClick={() => setIsExpanded(true)}
        >
          <ShoppingBasket className="w-5 h-5 mr-2" />
          Basket ({basket.length})
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-72">
      <Card className={`shadow-2xl flex flex-col ${isShadowMode ? 'border-accent/50' : 'border-primary/20'}`} style={{ maxHeight: 'calc(100vh - 8rem)' }}>
        <CardHeader className="pb-2 py-3 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <ShoppingBasket className="w-4 h-4" />
              Basket ({basket.length})
              {isShadowMode && (
                <Badge variant="outline" className="border-accent text-accent text-xs">SHADOW</Badge>
              )}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-muted/30">
            <Label htmlFor="basket-shadow" className="text-xs cursor-pointer">Shadow Mode</Label>
            <Switch
              id="basket-shadow"
              checked={isShadowMode}
              onCheckedChange={setIsShadowMode}
              className="scale-75"
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-3 overflow-y-auto flex-1">
          {/* Bets List */}
          <div className="space-y-2">
            {basket.map((bet) => (
              <div
                key={bet.id}
                className="p-3 rounded-lg bg-muted/50 border border-border flex items-start justify-between gap-2"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs">
                      {bet.sport}
                    </Badge>
                    <span className="text-xs font-bold text-primary">
                      {bet.odds.toFixed(2)}x
                    </span>
                  </div>
                  <p className="text-sm font-medium truncate">{bet.game}</p>
                  <p className="text-xs text-muted-foreground">
                    {bet.betType} - {bet.selection}
                  </p>
                  {bet.bettrUsername && (
                    <p className="text-xs text-muted-foreground mt-1">
                      From @{bet.bettrUsername}
                      {bet.tipPercentage && ` (${bet.tipPercentage}% tip)`}
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFromBasket(bet.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          {basket.length > 0 && (
            <>
              {/* Wager Input */}
              <div className="p-3 rounded-lg bg-muted/30 border border-border space-y-2">
                <label className="text-sm font-medium">Wager Amount ({isShadowMode ? 'Shadow $' : '$'})</label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">{isShadowMode ? 'S$' : '$'}</span>
                  <Input
                    type="number"
                    value={wager}
                    onChange={(e) => setWager(e.target.value)}
                    className="flex-1"
                    placeholder="100"
                    min="0"
                    step="10"
                  />
                </div>
                {isShadowMode && (
                  <p className="text-xs text-accent flex items-center gap-1">
                    <Badge variant="outline" className="border-accent text-accent text-[10px] px-1 py-0">SHADOW</Badge>
                    Using fake money
                  </p>
                )}
              </div>

              {/* Bet Summary */}
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{basket.length > 1 ? 'Parlay Odds' : 'Odds'}</span>
                  <span className="text-lg font-bold text-primary">
                    {calculateParlayOdds().toFixed(2)}x
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Potential Payout</span>
                  <span className="font-bold text-success">
                    {isShadowMode ? 'S$' : '$'}{calculatePayout()}
                  </span>
                </div>
              </div>

              {/* AI Score */}
              {aiScore !== null && (
                <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium">AI Confidence Score</span>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-lg font-bold ${
                        aiScore >= 70
                          ? 'border-success text-success'
                          : aiScore >= 50
                          ? 'border-primary text-primary'
                          : 'border-destructive text-destructive'
                      }`}
                    >
                      {aiScore}/100
                    </Badge>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-2">
                <Button
                  onClick={getAIScore}
                  disabled={isLoadingAI}
                  variant="outline"
                  className="w-full"
                  size="sm"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isLoadingAI ? 'Analyzing...' : 'Get AI Score'}
                </Button>
                <Button onClick={handlePlaceBet} className="w-full">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  {basket.length === 1 ? 'Place Bet' : `Place ${basket.length}-Leg Parlay`}
                </Button>
                <Button
                  onClick={clearBasket}
                  variant="ghost"
                  className="w-full"
                  size="sm"
                >
                  Clear Basket
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BettingBasket;
