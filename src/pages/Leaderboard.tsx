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
// Generate badge based on criteria
const getBadge = (yearsActive: number, winRate: number, totalInvested: number) => {
  // Priority: investment > win rate > years
  if (totalInvested >= 100000) return { variant: "platinum" as const, label: "💎 Elite Investor" };
  if (totalInvested >= 50000) return { variant: "gold" as const, label: "🏆 Pro Investor" };
  if (winRate >= 70) return { variant: "platinum" as const, label: "💎 Master Bettor" };
  if (winRate >= 65) return { variant: "gold" as const, label: "🏆 Expert" };
  if (totalInvested >= 10000) return { variant: "silver" as const, label: "⭐ High Roller" };
  if (winRate >= 60) return { variant: "silver" as const, label: "⭐ Sharpshooter" };
  if (yearsActive >= 3) return { variant: "gold" as const, label: "🏆 Veteran" };
  if (winRate >= 55) return { variant: "bronze" as const, label: "🥉 Consistent" };
  if (yearsActive >= 1) return { variant: "silver" as const, label: "⭐ Experienced" };
  return { variant: "bronze" as const, label: "🥉 Rookie" };
};

const generateBettors = () => {
  const allSports = ["NFL", "NBA", "Soccer", "MLB", "UFC", "NHL", "Tennis", "Golf"];
  
  const bettors = [
    { username: "mike_analytics", primarySport: "NFL", followers: 12400, winRate: 64, roi: 58.5, totalBets: 287, yearsActive: 3.5, totalInvested: 85000 },
    { username: "betting_blake", primarySport: "NFL", followers: 8900, winRate: 61, roi: 44.2, totalBets: 245, yearsActive: 2.1, totalInvested: 42000 },
    { username: "david_odds", primarySport: "Soccer", followers: 6700, winRate: 58, roi: 39.8, totalBets: 312, yearsActive: 1.8, totalInvested: 28000 },
    { username: "sharp_nfl", primarySport: "NFL", followers: 14200, winRate: 67, roi: 72.4, totalBets: 198, yearsActive: 4.2, totalInvested: 120000 },
    { username: "gridiron_guru", primarySport: "NFL", followers: 5400, winRate: 59, roi: 41.5, totalBets: 223, yearsActive: 2.8, totalInvested: 35000 },
    { username: "touchdown_tony", primarySport: "NFL", followers: 3800, winRate: 56, roi: 27.3, totalBets: 267, yearsActive: 1.5, totalInvested: 22000 },
    { username: "pigskin_pro", primarySport: "NFL", followers: 7200, winRate: 62, roi: 45.8, totalBets: 189, yearsActive: 3.1, totalInvested: 48000 },
    { username: "redzone_rick", primarySport: "NFL", followers: 4100, winRate: 57, roi: 28.9, totalBets: 234, yearsActive: 1.2, totalInvested: 18000 },
    { username: "fourth_down", primarySport: "NBA", followers: 2900, winRate: 55, roi: 26.4, totalBets: 201, yearsActive: 0.9, totalInvested: 15000 },
    { username: "endzone_ed", primarySport: "NFL", followers: 1800, winRate: 54, roi: 24.7, totalBets: 178, yearsActive: 0.6, totalInvested: 12000 },
    { username: "sarah_sports", primarySport: "NBA", followers: 11200, winRate: 63, roi: 67.3, totalBets: 298, yearsActive: 3.8, totalInvested: 95000 },
    { username: "rachel_hoops", primarySport: "NBA", followers: 9800, winRate: 65, roi: 69.8, totalBets: 256, yearsActive: 3.2, totalInvested: 78000 },
    { username: "bucket_betty", primarySport: "NBA", followers: 7600, winRate: 60, roi: 42.1, totalBets: 289, yearsActive: 2.5, totalInvested: 44000 },
    { username: "swish_sam", primarySport: "NBA", followers: 6200, winRate: 59, roi: 40.5, totalBets: 245, yearsActive: 2.0, totalInvested: 38000 },
    { username: "dunk_drew", primarySport: "NBA", followers: 8400, winRate: 62, roi: 54.9, totalBets: 267, yearsActive: 2.9, totalInvested: 56000 },
    { username: "court_queen", primarySport: "NBA", followers: 4900, winRate: 58, roi: 39.2, totalBets: 223, yearsActive: 1.7, totalInvested: 31000 },
    { username: "hoop_hunter", primarySport: "Soccer", followers: 3500, winRate: 56, roi: 37.8, totalBets: 198, yearsActive: 1.3, totalInvested: 24000 },
    { username: "three_pointer", primarySport: "NBA", followers: 5800, winRate: 61, roi: 43.4, totalBets: 234, yearsActive: 2.3, totalInvested: 41000 },
    { username: "alley_oop", primarySport: "MLB", followers: 2700, winRate: 55, roi: 25.9, totalBets: 187, yearsActive: 0.8, totalInvested: 16000 },
    { username: "slam_specialist", primarySport: "NBA", followers: 1950, winRate: 53, roi: 23.2, totalBets: 165, yearsActive: 0.5, totalInvested: 11000 },
    { username: "j_thompson", primarySport: "Soccer", followers: 10500, winRate: 62, roi: 56.7, totalBets: 276, yearsActive: 3.4, totalInvested: 82000 },
    { username: "futbol_frank", primarySport: "Soccer", followers: 8700, winRate: 60, roi: 53.5, totalBets: 298, yearsActive: 2.7, totalInvested: 67000 },
    { username: "goal_getter", primarySport: "Soccer", followers: 6900, winRate: 59, roi: 41.8, totalBets: 245, yearsActive: 2.2, totalInvested: 45000 },
    { username: "midfield_mike", primarySport: "Soccer", followers: 5600, winRate: 58, roi: 40.3, totalBets: 267, yearsActive: 1.9, totalInvested: 39000 },
    { username: "striker_steve", primarySport: "Soccer", followers: 7800, winRate: 61, roi: 44.6, totalBets: 223, yearsActive: 2.6, totalInvested: 52000 },
    { username: "keeper_kelly", primarySport: "Soccer", followers: 4200, winRate: 57, roi: 38.4, totalBets: 189, yearsActive: 1.6, totalInvested: 29000 },
    { username: "pitch_perfect", primarySport: "Soccer", followers: 3100, winRate: 56, roi: 36.7, totalBets: 201, yearsActive: 1.4, totalInvested: 25000 },
    { username: "corner_kick", primarySport: "MLB", followers: 2400, winRate: 54, roi: 25.1, totalBets: 178, yearsActive: 0.7, totalInvested: 14000 },
    { username: "penalty_pro", primarySport: "Soccer", followers: 5300, winRate: 59, roi: 41.2, totalBets: 234, yearsActive: 2.1, totalInvested: 43000 },
    { username: "net_finder", primarySport: "Soccer", followers: 1700, winRate: 53, roi: 22.8, totalBets: 156, yearsActive: 0.4, totalInvested: 10000 },
    { username: "stats_sam", primarySport: "MLB", followers: 9400, winRate: 61, roi: 55.1, totalBets: 312, yearsActive: 3.3, totalInvested: 88000 },
    { username: "diamond_dave", primarySport: "MLB", followers: 7900, winRate: 59, roi: 52.4, totalBets: 289, yearsActive: 2.8, totalInvested: 71000 },
    { username: "homer_harry", primarySport: "MLB", followers: 6500, winRate: 58, roi: 49.9, totalBets: 256, yearsActive: 2.4, totalInvested: 58000 },
    { username: "bases_loaded", primarySport: "MLB", followers: 5100, winRate: 57, roi: 38.6, totalBets: 234, yearsActive: 1.8, totalInvested: 36000 },
    { username: "curve_ball", primarySport: "MLB", followers: 7200, winRate: 60, roi: 53.7, totalBets: 278, yearsActive: 2.9, totalInvested: 65000 },
    { username: "fastball_fred", primarySport: "MLB", followers: 4700, winRate: 56, roi: 37.2, totalBets: 212, yearsActive: 1.5, totalInvested: 32000 },
    { username: "strike_zone", primarySport: "NHL", followers: 3900, winRate: 55, roi: 36.5, totalBets: 198, yearsActive: 1.3, totalInvested: 27000 },
    { username: "grand_slam", primarySport: "MLB", followers: 6100, winRate: 59, roi: 41.5, totalBets: 245, yearsActive: 2.2, totalInvested: 47000 },
    { username: "world_series", primarySport: "MLB", followers: 2800, winRate: 54, roi: 24.9, totalBets: 187, yearsActive: 0.9, totalInvested: 17000 },
    { username: "batting_boss", primarySport: "MLB", followers: 2100, winRate: 53, roi: 23.5, totalBets: 165, yearsActive: 0.6, totalInvested: 13000 },
    { username: "kelly_picks", primarySport: "UFC", followers: 8200, winRate: 60, roi: 54.3, totalBets: 198, yearsActive: 2.7, totalInvested: 62000 },
    { username: "ufc_ultimate", primarySport: "UFC", followers: 6800, winRate: 58, roi: 50.7, totalBets: 167, yearsActive: 2.3, totalInvested: 54000 },
    { username: "tennis_ace", primarySport: "Tennis", followers: 5400, winRate: 57, roi: 49.1, totalBets: 223, yearsActive: 2.0, totalInvested: 49000 },
    { username: "hockey_hero", primarySport: "NHL", followers: 7100, winRate: 59, roi: 52.8, totalBets: 245, yearsActive: 2.6, totalInvested: 59000 },
    { username: "golf_guru", primarySport: "Golf", followers: 4600, winRate: 56, roi: 47.6, totalBets: 189, yearsActive: 1.9, totalInvested: 46000 },
    { username: "mma_master", primarySport: "UFC", followers: 5900, winRate: 58, roi: 51.3, totalBets: 201, yearsActive: 2.4, totalInvested: 51000 },
    { username: "puck_pro", primarySport: "NHL", followers: 3700, winRate: 55, roi: 36.2, totalBets: 178, yearsActive: 1.4, totalInvested: 28000 },
    { username: "knockout_king", primarySport: "UFC", followers: 4300, winRate: 57, roi: 38.5, totalBets: 156, yearsActive: 1.6, totalInvested: 34000 },
    { username: "birdie_boss", primarySport: "Golf", followers: 2600, winRate: 54, roi: 25.4, totalBets: 145, yearsActive: 0.8, totalInvested: 15000 },
    { username: "sports_sam", primarySport: "Multi", followers: 9700, winRate: 71, roi: 85.9, totalBets: 334, yearsActive: 4.5, totalInvested: 145000 },
  ];

  return bettors.map((bettor, index) => {
    // Generate 1-5 sports per bettor, always including primary sport
    const numSports = bettor.primarySport === "Multi" ? 8 : Math.floor(Math.random() * 3) + 1; // 1-3 sports
    const otherSports = allSports.filter(s => s !== bettor.primarySport);
    const additionalSports = otherSports.sort(() => Math.random() - 0.5).slice(0, numSports - 1);
    const sports = [bettor.primarySport, ...additionalSports];
    
    return {
      ...bettor,
      id: index + 1,
      sports,
      verified: bettor.followers > 5000,
      badge: getBadge(bettor.yearsActive, bettor.winRate, bettor.totalInvested),
      recentPerformance: Array.from({ length: 15 }, () => 
        Math.random() < (bettor.winRate / 100) ? (1 + Math.random() * 8) : -(1 + Math.random() * 5)
      )
    };
  });
};

const Leaderboard = () => {
  const [selectedSport, setSelectedSport] = useState("All");
  const sports = ["All", "NFL", "NBA", "Soccer", "MLB", "UFC", "NHL", "Tennis", "Golf", "Multi"];
  
  const allBettors = generateBettors();
  const filteredBettors = selectedSport === "All" 
    ? allBettors 
    : allBettors.filter(b => b.sports.includes(selectedSport));

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
                        <div className="flex flex-wrap gap-1 mb-1">
                          {bettor.sports.slice(0, 3).map((sport: string) => (
                            <Badge key={sport} variant="secondary" className="text-[10px] px-1.5 py-0">
                              {sport}
                            </Badge>
                          ))}
                          {bettor.sports.length > 3 && (
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                              +{bettor.sports.length - 3}
                            </Badge>
                          )}
                        </div>
                        <Badge variant={bettor.badge.variant} className="text-[10px] px-1.5 py-0">
                          {bettor.badge.label}
                        </Badge>
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
                              <Line
                                type="monotone"
                                dataKey="value"
                                stroke="hsl(142 76% 36%)"
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
