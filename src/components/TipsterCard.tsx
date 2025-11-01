import { TrendingUp, Activity, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TipsterCardProps {
  username: string;
  roi: string;
  followers: string;
  bio: string;
  totalBets: number;
  recentVolume: string;
  winRate: number;
  recentPerformance: number[];
}

const TipsterCard = ({
  username,
  roi,
  followers,
  bio,
  totalBets,
  recentVolume,
  winRate,
  recentPerformance,
}: TipsterCardProps) => {
  const maxValue = Math.max(...recentPerformance);
  const minValue = Math.min(...recentPerformance);
  const range = maxValue - minValue || 1;

  return (
    <Card className="gradient-card border-border hover:border-primary/30 transition-all duration-500 overflow-hidden group hover:glow-premium">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          {/* Header with username and stats */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-2xl font-bold">@{username}</h3>
                <Badge variant="outline" className="border-primary/50 text-primary shine-border">
                  Verified
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground italic line-clamp-2">{bio}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-success mb-1">{roi}</div>
              <div className="text-xs text-muted-foreground">90-day ROI</div>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="glass-card rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                <Activity className="w-3 h-3" />
                Recent Performance
              </span>
              <span className="text-xs text-primary">{recentPerformance.length} bets</span>
            </div>
            <div className="flex items-end gap-1 h-16">
              {recentPerformance.map((value, index) => {
                const height = ((value - minValue) / range) * 100;
                const isPositive = value >= 0;
                return (
                  <div
                    key={index}
                    className="flex-1 relative group/bar"
                  >
                    <div
                      className={`w-full rounded-t transition-all duration-300 ${
                        isPositive
                          ? "bg-success/60 hover:bg-success"
                          : "bg-destructive/60 hover:bg-destructive"
                      }`}
                      style={{ height: `${Math.max(height, 10)}%` }}
                    />
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-popover px-2 py-1 rounded text-xs whitespace-nowrap">
                      {value > 0 ? '+' : ''}{value}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="glass-card rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 text-primary font-bold text-lg mb-1">
                <TrendingUp className="w-4 h-4" />
                {winRate}%
              </div>
              <div className="text-xs text-muted-foreground">Win Rate</div>
            </div>
            
            <div className="glass-card rounded-lg p-3 text-center">
              <div className="font-bold text-lg mb-1">{followers}</div>
              <div className="text-xs text-muted-foreground">Followers</div>
            </div>
            
            <div className="glass-card rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1 font-bold text-lg mb-1">
                <DollarSign className="w-4 h-4" />
                {recentVolume}
              </div>
              <div className="text-xs text-muted-foreground">30d Volume</div>
            </div>
          </div>

          <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border/50">
            {totalBets} total bets tracked
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TipsterCard;
