import { useState } from 'react';
import { ShoppingBasket, X, Sparkles, TrendingUp, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useBasket } from '@/contexts/BasketContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const BettingBasket = () => {
  const { basket, removeFromBasket, clearBasket } = useBasket();
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [aiScore, setAiScore] = useState<number | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const calculateParlayOdds = () => {
    if (basket.length === 0) return 1;
    return basket.reduce((total, bet) => total * bet.odds, 1);
  };

  const calculatePayout = (wager: number) => {
    return (wager * calculateParlayOdds()).toFixed(2);
  };

  const getAIScore = async () => {
    if (basket.length === 0) return;
    
    setIsLoadingAI(true);
    try {
      const { data, error } = await supabase.functions.invoke('score-bet', {
        body: { 
          bets: basket.map(bet => ({
            sport: bet.sport,
            game: bet.game,
            betType: bet.betType,
            selection: bet.selection,
            odds: bet.odds
          }))
        }
      });

      if (error) throw error;
      
      setAiScore(data.score);
      toast({
        title: 'AI Analysis Complete',
        description: `Score: ${data.score}/100 - ${data.reasoning}`,
      });
    } catch (error) {
      console.error('Error getting AI score:', error);
      toast({
        title: 'AI Analysis Failed',
        description: 'Could not analyze bet at this time',
        variant: 'destructive',
      });
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handlePlaceParlay = () => {
    if (basket.length < 2) {
      toast({
        title: 'Need More Bets',
        description: 'Add at least 2 bets to create a parlay',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Parlay Created!',
      description: `${basket.length}-leg parlay with ${calculateParlayOdds().toFixed(2)}x odds`,
    });
    clearBasket();
    setAiScore(null);
  };

  if (basket.length === 0 && !isExpanded) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="rounded-full shadow-lg"
          onClick={() => setIsExpanded(true)}
        >
          <ShoppingBasket className="w-5 h-5 mr-2" />
          Basket (0)
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-96 shadow-2xl border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ShoppingBasket className="w-5 h-5" />
              Parlay Basket ({basket.length})
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Bets List */}
          <div className="max-h-64 overflow-y-auto space-y-2">
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
                  {bet.bettorUsername && (
                    <p className="text-xs text-muted-foreground mt-1">
                      From @{bet.bettorUsername}
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
              {/* Parlay Summary */}
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Parlay Odds</span>
                  <span className="text-lg font-bold text-primary">
                    {calculateParlayOdds().toFixed(2)}x
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">$100 bet returns</span>
                  <span className="font-bold text-success">
                    ${calculatePayout(100)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">$500 bet returns</span>
                  <span className="font-bold text-success">
                    ${calculatePayout(500)}
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
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isLoadingAI ? 'Analyzing...' : 'Get AI Score'}
                </Button>
                <Button onClick={handlePlaceParlay} className="w-full" size="lg">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Place {basket.length}-Leg Parlay
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
