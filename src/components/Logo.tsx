import Image from "next/image";

export default function Logo({ className = "", showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Your actual logo image */}
      <div className="relative">
        <Image
          src="/logo.png"
          alt="CFF Resin Logo"
          width={40}
          height={40}
          className="w-10 h-10 object-contain"
          priority
        />
      </div>
      
      {/* Text - only show if showText is true */}
      {showText && (
        <div className="flex flex-col">
          <span className="font-bold text-xl gradient-resin-text resin-glow-text">CFF</span>
          <span className="text-xs text-white/80 -mt-1">RESIN</span>
        </div>
      )}
    </div>
  );
}
