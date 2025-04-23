import { Shield } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  invert?: boolean;
  className?: string;
}

const Logo = ({ size = "md", invert = false, className = "" }: LogoProps) => {
  const sizes = {
    sm: {
      icon: "h-5 w-5",
      text: "text-lg"
    },
    md: {
      icon: "h-6 w-6",
      text: "text-xl"
    },
    lg: {
      icon: "h-8 w-8",
      text: "text-2xl"
    }
  };

  const colorClass = invert ? "text-primary-foreground" : "text-primary";

  return (
    <div className={`flex items-center ${colorClass} ${className}`}>
      <Shield className={`${sizes[size].icon} mr-2`} />
      <span className={`${sizes[size].text} font-semibold`}>Legal Compass</span>
    </div>
  );
};

export default Logo;
