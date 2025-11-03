import { useState } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Users, Target, ArrowUp, Filter, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navigation from "@/components/Navigation";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";

// Generate 40-50 realistic bettor profiles across sports
const generateBettors = () => {
  const firstNames = ["mike", "sarah", "j", "blake", "alex", "rachel", "david", "sam", "kelly", "chris", "jordan", "taylor", "morgan", "casey", "drew", "jamie", "riley", "quinn", "avery", "parker"];
  const lastNames = ["analytics", "sports", "thompson", "predictions", "guru", "hoops", "odds", "picks", "stats", "sharp", "edge", "wins", "bets", "pro", "ace", "king", "master", "wizard"];
  
  const sports: Record<string, string[]> = {
    NFL: ["mike_analytics", "betting_blake", "david_odds", "sharp_nfl", "gridiron_guru", "touchdown_tony", "pigskin_pro", "redzone_rick", "fourth_down", "endzone_ed"],
    NBA: ["sarah_sports", "rachel_hoops", "bucket_betty", "swish_sam", "dunk_drew", "court_queen", "hoop_hunter", "three_pointer", "alley_oop", "slam_specialist"],
    Soccer: ["j_thompson", "futbol_frank", "goal_getter", "midfield_mike", "striker_steve", "keeper_kelly", "pitch_perfect", "corner_kick", "penalty_pro", "net_finder"],
    MLB: ["stats_sam", "diamond_dave", "homer_harry", "bases_loaded", "curve_ball", "fastball_fred", "strike_zone", "grand_slam", "world_series", "batting_boss"],
    Other: ["kelly_picks", "sports_sam", "ufc_ultimate", "tennis_ace", "hockey_hero", "golf_guru", "mma_master", "puck_pro", "knockout_king", "birdie_boss"]
  };

  const bios = {
    NFL: [
      "Former NCAA analyst with 10+ years experience in game theory and advanced metrics",
      "Ex-NFL scout specializing in prop bets and live in-game wagering strategies",
      "Data scientist using machine learning models to predict game outcomes",
      "Veteran bettor focusing on division matchups and weather impacts",
      "Sports journalist turned professional bettor with insider knowledge"
    ],
    NBA: [
      "Former D1 basketball player with deep understanding of pace and efficiency",
      "Quantitative analyst specializing in player props and totals",
      "Advanced stats expert focusing on offensive/defensive ratings",
      "West Coast specialist tracking rest days and travel schedules",
      "Professional bettor with 8 years of consistent profits on spreads"
    ],
    Soccer: [
      "European football analyst covering Premier League and Champions League",
      "Stats-driven approach to corner kicks, cards, and goal totals",
      "Former semi-pro player with tactical knowledge of formations",
      "International soccer expert tracking 15+ leagues worldwide",
      "ML model specialist for match outcomes and both teams to score"
    ],
    MLB: [
      "Sabermetrics expert using advanced pitching metrics and park factors",
      "Former minor league coach with deep understanding of bullpen usage",
      "Data analyst tracking umpire tendencies and lineup matchups",
      "Run line specialist focusing on division rivals and day games",
      "Professional bettor with expertise in first 5 innings and totals"
    ],
    Other: [
      "MMA analyst with insider knowledge of training camps and styles",
      "Tennis expert tracking surface preferences and head-to-head records",
      "NHL specialist focusing on goalie matchups and special teams",
      "Golf handicapper using strokes gained and course history data",
      "Multi-sport bettor with proven track record across major leagues"
    ]
  };

  let allBettors: any[] = [];
  let id = 1;

  Object.entries(sports).forEach(([sport, usernames]) => {
    const sportBios = bios[sport as keyof typeof bios];
    usernames.forEach((username, index) => {
      const followers = sport === "NFL" || sport === "NBA" 
        ? Math.floor(1000 + Math.random() * 14000) // 1K-15K
        : Math.floor(150 + Math.random() * 5000); // 150-5K
      
      const winRate = Math.floor(52 + Math.random() * 16); // 52-68%
      const roi = (5 + Math.random() * 35).toFixed(1); // 5-40%
      const totalBets = Math.floor(150 + Math.random() * 350); // 150-500
      
      // Generate realistic performance data with ups and downs
      const recentPerformance = Array.from({ length: 15 }, () => {
        const isWin = Math.random() < (winRate / 100);
        return isWin ? (1 + Math.random() * 8) : -(1 + Math.random() * 5);
      });

      allBettors.push({
        id: id++,
        username,
        sport,
        roi: `+${roi}%`,
        winRate,
        followers: followers > 1000 ? `${(followers / 1000).toFixed(1)}K` : followers.toString(),
        totalBets,
        bio: sportBios[index % sportBios.length],
        recentPerformance,
        recentVolume: `${Math.floor(10 + Math.random() * 90)}K`,
        activeBets: Math.floor(3 + Math.random() * 12), // 3-15 active bets
        tipPercentage: Math.floor(5 + Math.random() * 11) // 5-15% tip
      });
    });
  });

  return allBettors;
};

const MakeBets = () => {
  const [selectedSport, setSelectedSport] = useState("All");
  const [minWinRate, setMinWinRate] = useState(50);
  const [minROI, setMinROI] = useState(0);
  
  const bettors = generateBettors();
  const sports = ["All", "NFL", "NBA", "Soccer", "MLB", "Other"];

  const filteredBettors = bettors.filter(bettor => {
    const matchesSport = selectedSport === "All" || bettor.sport === selectedSport;
    const matchesWinRate = bettor.winRate >= minWinRate;
    const matchesROI = parseFloat(bettor.roi) >= minROI;
    return matchesSport && matchesWinRate && matchesROI;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gradient">Bettor Marketplace</h1>
          <p className="text-muted-foreground">Browse verified bettors and copy their active bets</p>
        </div>

        {/* Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium">Filter by sport:</span>
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
        </div>

        {/* Bettors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBettors.map((bettor) => {
            const chartData = bettor.recentPerformance.map((value: number, index: number) => ({
              index,
              value,
            }));

            // Rotate through different avatar styles for variety
            const avatarStyles = ['bottts', 'identicon', 'shapes', 'avataaars-neutral', 'pixel-art'];
            const style = avatarStyles[bettor.id % avatarStyles.length];
            const avatarUrl = `https://api.dicebear.com/7.x/${style}/svg?seed=${bettor.username}`;

            return (
              <Card 
                key={bettor.id}
                className="gradient-card border-border hover:border-primary/30 transition-all duration-500 overflow-hidden group hover:glow-premium flex flex-col h-full"
              >
                <CardContent className="p-5 flex flex-col h-full">
                  <div className="flex flex-col gap-4 flex-1">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Avatar className="w-14 h-14 ring-2 ring-border shrink-0">
                          <AvatarImage 
                            src={avatarUrl}
                            alt={bettor.username}
                          />
                          <AvatarFallback className="text-sm font-bold">
                            {bettor.username.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <h3 className="text-lg font-bold truncate">@{bettor.username}</h3>
                            <Badge variant="outline" className="border-primary/50 text-primary shine-border text-xs">
                              ✓
                            </Badge>
                          </div>
                          <Badge variant="secondary" className="text-xs mb-2">{bettor.sport}</Badge>
                          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{bettor.bio}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-2xl font-bold text-success mb-0.5">{bettor.roi}</div>
                        <div className="text-[10px] text-muted-foreground whitespace-nowrap">90d ROI</div>
                      </div>
                    </div>

                    {/* Performance Chart */}
                    <div className="glass-card rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          Performance Trend
                        </span>
                        <span className="text-[10px] text-primary">{bettor.recentPerformance.length} bets</span>
                      </div>
                      <div className="h-16 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={chartData}>
                            <YAxis hide domain={['auto', 'auto']} />
                            <defs>
                              <linearGradient id={`makebets-gradient-${bettor.id}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="hsl(142 76% 36%)" />
                                <stop offset="50%" stopColor="hsl(142 76% 36%)" />
                                <stop offset="50%" stopColor="hsl(0 84% 60%)" />
                                <stop offset="100%" stopColor="hsl(0 84% 60%)" />
                              </linearGradient>
                            </defs>
                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke={`url(#makebets-gradient-${bettor.id})`}
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
                          {bettor.winRate}%
                        </div>
                        <div className="text-[10px] text-muted-foreground">Win Rate</div>
                      </div>
                      
                      <div className="glass-card rounded-lg p-2.5 text-center">
                        <div className="flex items-center justify-center gap-0.5 font-bold text-base mb-0.5">
                          <Users className="w-3 h-3" />
                          {bettor.followers}
                        </div>
                        <div className="text-[10px] text-muted-foreground">Followers</div>
                      </div>
                      
                      <div className="glass-card rounded-lg p-2.5 text-center">
                        <div className="flex items-center justify-center gap-0.5 font-bold text-base mb-0.5">
                          <Target className="w-3 h-3" />
                          {bettor.activeBets}
                        </div>
                        <div className="text-[10px] text-muted-foreground">Active</div>
                      </div>
                    </div>

                    <div className="text-[10px] text-muted-foreground text-center pt-2 border-t border-border/50">
                      {bettor.totalBets} total bets tracked
                    </div>

                    {/* Tip Requirement */}
                    <div className="p-2.5 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="flex items-center justify-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-primary" />
                        <span className="font-semibold text-primary text-sm">{bettor.tipPercentage}% Tip Required</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground text-center mt-0.5">
                        Per bet copied
                      </p>
                    </div>

                    {/* Action Button */}
                    <Link to={`/bettor/${bettor.username}`} className="mt-auto">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        View Active Bets ({bettor.activeBets})
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredBettors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No bettors match your filters. Try adjusting your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MakeBets;
