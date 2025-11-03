import rookieBadge from "@/assets/badges/rookie-badge.png";
import experiencedBadge from "@/assets/badges/experienced-badge.png";
import consistentBadge from "@/assets/badges/consistent-badge.png";
import veteranBadge from "@/assets/badges/veteran-badge.png";
import sharpshooterBadge from "@/assets/badges/sharpshooter-badge.png";
import highrollerBadge from "@/assets/badges/highroller-badge.png";
import expertBadge from "@/assets/badges/expert-badge.png";
import masterBadge from "@/assets/badges/master-badge.png";
import proinvestorBadge from "@/assets/badges/proinvestor-badge.png";
import eliteBadge from "@/assets/badges/elite-badge.png";

interface BadgeIconProps {
  label: string;
  className?: string;
}

const badgeMap: Record<string, string> = {
  "🥉 Rookie": rookieBadge,
  "⭐ Experienced": experiencedBadge,
  "🥉 Consistent": consistentBadge,
  "🏆 Veteran": veteranBadge,
  "⭐ Sharpshooter": sharpshooterBadge,
  "⭐ High Roller": highrollerBadge,
  "🏆 Expert": expertBadge,
  "💎 Master Bettor": masterBadge,
  "🏆 Pro Investor": proinvestorBadge,
  "💎 Elite Investor": eliteBadge,
};

export const BadgeIcon = ({ label, className = "w-6 h-6" }: BadgeIconProps) => {
  const badgeImage = badgeMap[label];
  
  if (!badgeImage) {
    return null;
  }

  return (
    <img 
      src={badgeImage} 
      alt={label} 
      className={className}
      style={{ 
        objectFit: "contain",
        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
        opacity: 0.95
      }}
    />
  );
};
