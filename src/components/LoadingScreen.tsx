import React, { useEffect, useState } from "react";
import sauLogo from "@/assets/sau-logo.png";

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

const LoadingScreen = ({ onLoadComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoadComplete, 300);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-hero-overlay via-primary to-hero-overlay flex flex-col items-center justify-center z-50">
      <div className="animate-fade-in space-y-8">
        <div className="relative">
          <img 
            src={sauLogo} 
            alt="South Asian University" 
            className="w-32 h-32 object-contain drop-shadow-2xl animate-scale-in"
          />
          <div className="absolute inset-0 animate-pulse">
            <div className="w-full h-full rounded-full bg-gold-accent/20 blur-2xl" />
          </div>
        </div>
        
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-bold text-white animate-fade-in">
            South Asian University
          </h2>
          <p className="text-white/80 animate-fade-in">
            Internship & Placement Cell
          </p>
        </div>

        <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-gold-accent to-primary transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
