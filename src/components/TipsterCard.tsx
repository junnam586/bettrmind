import { TrendingUp, Activity, DollarSign, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";

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
  const chartData = recentPerformance.map((value, index) => ({
    index,
    value,
  }));

  return (
    <Card className="gradient-card border-border hover:border-primary/30 transition-all duration-500 overflow-hidden group hover:glow-premium h-full flex flex-col">
      <CardContent className="p-5 flex flex-col flex-1">
        <div className="flex flex-col gap-4 flex-1">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <h3 className="text-lg font-bold truncate">@{username}</h3>
                <Badge variant="outline" className="border-primary/50 text-primary shine-border text-xs">
                  ✓
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{bio}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-2xl font-bold text-success mb-0.5">{roi}</div>
              <div className="text-[10px] text-muted-foreground whitespace-nowrap">90d ROI</div>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="glass-card rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-1">
                <Activity className="w-3 h-3" />
                Performance Trend
              </span>
              <span className="text-[10px] text-primary">{recentPerformance.length} bets</span>
            </div>
            <div className="h-16 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <YAxis hide domain={['auto', 'auto']} />
                  <defs>
                    <linearGradient id={`gradient-${username}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(142 76% 36%)" />
                      <stop offset="50%" stopColor="hsl(142 76% 36%)" />
                      <stop offset="50%" stopColor="hsl(0 84% 60%)" />
                      <stop offset="100%" stopColor="hsl(0 84% 60%)" />
                    </linearGradient>
                  </defs>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={`url(#gradient-${username})`}
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2">
            <div className="glass-card rounded-lg p-2.5 text-center">
              <div className="flex items-center justify-center gap-0.5 text-primary font-bold text-base mb-0.5">
                <TrendingUp className="w-3 h-3" />
                {winRate}%
              </div>
              <div className="text-[10px] text-muted-foreground">Win Rate</div>
            </div>
            
            <div className="glass-card rounded-lg p-2.5 text-center">
              <div className="flex items-center justify-center gap-0.5 font-bold text-base mb-0.5">
                <Users className="w-3 h-3" />
                {followers}
              </div>
              <div className="text-[10px] text-muted-foreground">Followers</div>
            </div>
            
            <div className="glass-card rounded-lg p-2.5 text-center">
              <div className="flex items-center justify-center gap-0.5 font-bold text-base mb-0.5">
                <DollarSign className="w-3 h-3" />
                {recentVolume}
              </div>
              <div className="text-[10px] text-muted-foreground">30d Vol</div>
            </div>
          </div>

          <div className="text-[10px] text-muted-foreground text-center pt-2 border-t border-border/50">
            {totalBets} total bets tracked
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TipsterCard;
