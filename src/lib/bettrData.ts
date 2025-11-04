// Seeded random number generator for consistent data
const seededRandom = (seed: string, index: number = 0) => {
  const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + index;
  const x = Math.sin(hash) * 10000;
  return x - Math.floor(x);
};

export const generateActiveBetsCount = (username: string, sport: string): number => {
  const sportMultiplier = {
    NFL: 5,
    NBA: 5,
    Soccer: 4,
    MLB: 4,
    Other: 3
  }[sport] || 4;

  // Generate 1-3 bets per game consistently
  let totalBets = 0;
  for (let i = 0; i < sportMultiplier; i++) {
    const betsPerGame = Math.floor(1 + seededRandom(username, i) * 3);
    totalBets += betsPerGame;
  }
  
  return totalBets;
};

export const generateBettrStats = (username: string, sport: string) => {
  const followers = sport === "NFL" || sport === "NBA" 
    ? Math.floor(1000 + seededRandom(username, 1) * 14000)
    : Math.floor(150 + seededRandom(username, 1) * 5000);
  
  const winRate = Math.floor(52 + seededRandom(username, 2) * 16);
  const roi = (15 + seededRandom(username, 3) * 60).toFixed(1);
  const totalBets = Math.floor(150 + seededRandom(username, 4) * 350);
  const tipPercentage = Math.floor(5 + seededRandom(username, 5) * 11);
  
  const recentPerformance = Array.from({ length: 15 }, (_, i) => {
    const isWin = seededRandom(username, 100 + i) < (winRate / 100);
    return isWin ? (1 + seededRandom(username, 200 + i) * 8) : -(1 + seededRandom(username, 300 + i) * 5);
  });

  return {
    followers: followers > 1000 ? `${(followers / 1000).toFixed(1)}K` : followers.toString(),
    winRate,
    roi: `+${roi}%`,
    totalBets,
    tipPercentage,
    recentPerformance,
    activeBets: generateActiveBetsCount(username, sport)
  };
};
