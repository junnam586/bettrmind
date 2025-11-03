import { useState } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Users, Trophy, ArrowUp, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navigation from "@/components/Navigation";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";

// Generate 40-50 realistic bettor profiles
const generateBettors = () => {
  const bettors = [
    // NFL Bettors (10)
    { username: "mike_analytics", sport: "NFL", followers: 12400, winRate: 64, roi: 28.5, totalBets: 287 },
    { username: "betting_blake", sport: "NFL", followers: 8900, winRate: 61, roi: 24.2, totalBets: 245 },
    { username: "david_odds", sport: "NFL", followers: 6700, winRate: 58, roi: 19.8, totalBets: 312 },
    { username: "sharp_nfl", sport: "NFL", followers: 14200, winRate: 67, roi: 32.4, totalBets: 198 },
    { username: "gridiron_guru", sport: "NFL", followers: 5400, winRate: 59, roi: 21.5, totalBets: 223 },
    { username: "touchdown_tony", sport: "NFL", followers: 3800, winRate: 56, roi: 17.3, totalBets: 267 },
    { username: "pigskin_pro", sport: "NFL", followers: 7200, winRate: 62, roi: 25.8, totalBets: 189 },
    { username: "redzone_rick", sport: "NFL", followers: 4100, winRate: 57, roi: 18.9, totalBets: 234 },
    { username: "fourth_down", sport: "NFL", followers: 2900, winRate: 55, roi: 16.4, totalBets: 201 },
    { username: "endzone_ed", sport: "NFL", followers: 1800, winRate: 54, roi: 14.7, totalBets: 178 },
    
    // NBA Bettors (10)
    { username: "sarah_sports", sport: "NBA", followers: 11200, winRate: 63, roi: 27.3, totalBets: 298 },
    { username: "rachel_hoops", sport: "NBA", followers: 9800, winRate: 65, roi: 29.8, totalBets: 256 },
    { username: "bucket_betty", sport: "NBA", followers: 7600, winRate: 60, roi: 22.1, totalBets: 289 },
    { username: "swish_sam", sport: "NBA", followers: 6200, winRate: 59, roi: 20.5, totalBets: 245 },
    { username: "dunk_drew", sport: "NBA", followers: 8400, winRate: 62, roi: 24.9, totalBets: 267 },
    { username: "court_queen", sport: "NBA", followers: 4900, winRate: 58, roi: 19.2, totalBets: 223 },
    { username: "hoop_hunter", sport: "NBA", followers: 3500, winRate: 56, roi: 17.8, totalBets: 198 },
    { username: "three_pointer", sport: "NBA", followers: 5800, winRate: 61, roi: 23.4, totalBets: 234 },
    { username: "alley_oop", sport: "NBA", followers: 2700, winRate: 55, roi: 15.9, totalBets: 187 },
    { username: "slam_specialist", sport: "NBA", followers: 1950, winRate: 53, roi: 13.2, totalBets: 165 },
    
    // Soccer Bettors (10)
    { username: "j_thompson", sport: "Soccer", followers: 10500, winRate: 62, roi: 26.7, totalBets: 276 },
    { username: "futbol_frank", sport: "Soccer", followers: 8700, winRate: 60, roi: 23.5, totalBets: 298 },
    { username: "goal_getter", sport: "Soccer", followers: 6900, winRate: 59, roi: 21.8, totalBets: 245 },
    { username: "midfield_mike", sport: "Soccer", followers: 5600, winRate: 58, roi: 20.3, totalBets: 267 },
    { username: "striker_steve", sport: "Soccer", followers: 7800, winRate: 61, roi: 24.6, totalBets: 223 },
    { username: "keeper_kelly", sport: "Soccer", followers: 4200, winRate: 57, roi: 18.4, totalBets: 189 },
    { username: "pitch_perfect", sport: "Soccer", followers: 3100, winRate: 56, roi: 16.7, totalBets: 201 },
    { username: "corner_kick", sport: "Soccer", followers: 2400, winRate: 54, roi: 15.1, totalBets: 178 },
    { username: "penalty_pro", sport: "Soccer", followers: 5300, winRate: 59, roi: 21.2, totalBets: 234 },
    { username: "net_finder", sport: "Soccer", followers: 1700, winRate: 53, roi: 12.8, totalBets: 156 },
    
    // MLB Bettors (10)
    { username: "stats_sam", sport: "MLB", followers: 9400, winRate: 61, roi: 25.1, totalBets: 312 },
    { username: "diamond_dave", sport: "MLB", followers: 7900, winRate: 59, roi: 22.4, totalBets: 289 },
    { username: "homer_harry", sport: "MLB", followers: 6500, winRate: 58, roi: 19.9, totalBets: 256 },
    { username: "bases_loaded", sport: "MLB", followers: 5100, winRate: 57, roi: 18.6, totalBets: 234 },
    { username: "curve_ball", sport: "MLB", followers: 7200, winRate: 60, roi: 23.7, totalBets: 278 },
    { username: "fastball_fred", sport: "MLB", followers: 4700, winRate: 56, roi: 17.2, totalBets: 212 },
    { username: "strike_zone", sport: "MLB", followers: 3900, winRate: 55, roi: 16.5, totalBets: 198 },
    { username: "grand_slam", sport: "MLB", followers: 6100, winRate: 59, roi: 21.5, totalBets: 245 },
    { username: "world_series", sport: "MLB", followers: 2800, winRate: 54, roi: 14.9, totalBets: 187 },
    { username: "batting_boss", sport: "MLB", followers: 2100, winRate: 53, roi: 13.5, totalBets: 165 },
    
    // Other Sports (10)
    { username: "kelly_picks", sport: "UFC", followers: 8200, winRate: 60, roi: 24.3, totalBets: 198 },
    { username: "ufc_ultimate", sport: "UFC", followers: 6800, winRate: 58, roi: 20.7, totalBets: 167 },
    { username: "tennis_ace", sport: "Tennis", followers: 5400, winRate: 57, roi: 19.1, totalBets: 223 },
    { username: "hockey_hero", sport: "NHL", followers: 7100, winRate: 59, roi: 22.8, totalBets: 245 },
    { username: "golf_guru", sport: "Golf", followers: 4600, winRate: 56, roi: 17.6, totalBets: 189 },
    { username: "mma_master", sport: "UFC", followers: 5900, winRate: 58, roi: 21.3, totalBets: 201 },
    { username: "puck_pro", sport: "NHL", followers: 3700, winRate: 55, roi: 16.2, totalBets: 178 },
    { username: "knockout_king", sport: "UFC", followers: 4300, winRate: 57, roi: 18.5, totalBets: 156 },
    { username: "birdie_boss", sport: "Golf", followers: 2600, winRate: 54, roi: 15.4, totalBets: 145 },
    { username: "sports_sam", sport: "Multi", followers: 9700, winRate: 61, roi: 25.9, totalBets: 334 },
  ];

  return bettors.map((bettor, index) => ({
    ...bettor,
    id: index + 1,
    verified: bettor.followers > 5000,
    recentPerformance: Array.from({ length: 15 }, () => 
      Math.random() < (bettor.winRate / 100) ? (1 + Math.random() * 8) : -(1 + Math.random() * 5)
    )
  }));
};

const Leaderboard = () => {
  const [selectedSport, setSelectedSport] = useState("All");
  const sports = ["All", "NFL", "NBA", "Soccer", "MLB", "UFC", "NHL", "Tennis", "Golf", "Multi"];
  
  const allBettors = generateBettors();
  const filteredBettors = selectedSport === "All" 
    ? allBettors 
    : allBettors.filter(b => b.sport === selectedSport);

  // Sort by ROI descending
  const sortedBettors = [...filteredBettors].sort((a, b) => b.roi - a.roi);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gradient">Top Bettors Leaderboard</h1>
          <p className="text-muted-foreground">Discover and follow {allBettors.length} verified sports bettors</p>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {sports.map((sport) => (
            <Button
              key={sport}
              variant={selectedSport === sport ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSport(sport)}
              className={selectedSport === sport ? "bg-primary text-primary-foreground" : ""}
            >
              {sport}
            </Button>
          ))}
        </div>

        <div className="space-y-3">
          {sortedBettors.map((bettor, index) => {
            const chartData = bettor.recentPerformance.map((value, i) => ({ index: i, value }));
            const displayRank = index + 1;
            
            // Rotate through different avatar styles for variety
            const avatarStyles = ['bottts', 'identicon', 'shapes', 'avataaars-neutral', 'pixel-art'];
            const style = avatarStyles[bettor.id % avatarStyles.length];
            const avatarUrl = `https://api.dicebear.com/7.x/${style}/svg?seed=${bettor.username}`;
            
            return (
              <Card 
                key={bettor.id} 
                className="gradient-card border-border hover:border-primary/30 transition-all duration-300 hover:glow-premium overflow-hidden"
              >
                <CardContent className="p-5">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    {/* Rank and Avatar */}
                    <div className="flex items-center gap-3 min-w-[200px]">
                      <div className="text-2xl font-bold text-muted-foreground w-10 text-center shrink-0">
                        #{displayRank}
                      </div>
                      
                      <Avatar className="w-12 h-12 ring-2 ring-border shrink-0">
                        <AvatarImage 
                          src={avatarUrl}
                          alt={bettor.username}
                        />
                        <AvatarFallback className="text-sm font-bold">
                          {bettor.username.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <h3 className="text-base font-bold truncate">
                            @{bettor.username}
                          </h3>
                          {bettor.verified && (
                            <Badge variant="outline" className="border-primary/50 text-primary text-[10px] px-1 shrink-0">
                              ✓
                            </Badge>
                          )}
                        </div>
                        <Badge variant="secondary" className="text-xs">{bettor.sport}</Badge>
                      </div>
                    </div>

                    {/* Performance Chart */}
                    <div className="flex-1 md:max-w-[200px]">
                      <div className="glass-card rounded-lg p-2.5">
                        <div className="text-[10px] text-muted-foreground mb-1.5">Performance</div>
                        <div className="h-10 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                              <YAxis hide domain={['auto', 'auto']} />
                              <defs>
                                <linearGradient id={`leaderboard-gradient-${bettor.id}`} x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="hsl(142 76% 36%)" />
                                  <stop offset="50%" stopColor="hsl(142 76% 36%)" />
                                  <stop offset="50%" stopColor="hsl(0 84% 60%)" />
                                  <stop offset="100%" stopColor="hsl(0 84% 60%)" />
                                </linearGradient>
                              </defs>
                              <Line
                                type="monotone"
                                dataKey="value"
                                stroke={`url(#leaderboard-gradient-${bettor.id})`}
                                strokeWidth={2}
                                dot={false}
                                isAnimationActive={false}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 flex-1">
                      <div className="text-center p-2.5 rounded-lg bg-success/10 border border-success/20">
                        <div className="flex items-center justify-center gap-0.5 text-success font-bold text-lg mb-0.5">
                          <ArrowUp className="w-3.5 h-3.5" />
                          {bettor.roi}%
                        </div>
                        <div className="text-[10px] text-muted-foreground">ROI</div>
                      </div>

                      <div className="text-center p-2.5 rounded-lg glass-card">
                        <div className="font-bold text-lg mb-0.5">{bettor.winRate}%</div>
                        <div className="text-[10px] text-muted-foreground">Win Rate</div>
                      </div>

                      <div className="text-center p-2.5 rounded-lg glass-card">
                        <div className="flex items-center justify-center gap-0.5 font-bold text-lg mb-0.5">
                          <Users className="w-3.5 h-3.5" />
                          {bettor.followers > 1000 ? `${(bettor.followers / 1000).toFixed(1)}K` : bettor.followers}
                        </div>
                        <div className="text-[10px] text-muted-foreground">Followers</div>
                      </div>

                      <div className="text-center p-2.5 rounded-lg glass-card">
                        <div className="font-bold text-lg mb-0.5">{bettor.totalBets}</div>
                        <div className="text-[10px] text-muted-foreground">Bets</div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="w-full md:w-32 shrink-0">
                      <Link to={`/bettor/${bettor.username}`}>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-9 text-sm">
                          <Target className="w-3.5 h-3.5 mr-1.5" />
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredBettors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No bettors found for this sport.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
