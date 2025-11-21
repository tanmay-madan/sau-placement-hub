import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import sauEntrance from "@/assets/sau-entrance.png";
import sauLogo from "@/assets/sau-logo.png";

interface AuthGateProps {
  onAuthenticated: () => void;
}

const AuthGate = ({ onAuthenticated }: AuthGateProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just authenticate on any submission
    // In production, this would validate credentials
    if (email && password) {
      onAuthenticated();
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${sauEntrance})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      </div>

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="glass-morphism p-8 rounded-2xl shadow-2xl backdrop-blur-xl">
          <div className="flex justify-center mb-6">
            <img src={sauLogo} alt="South Asian University" className="w-24 h-24 object-contain drop-shadow-2xl" />
          </div>
          
          <h2 className="text-3xl font-bold text-center text-white mb-2">
            Welcome
          </h2>
          <p className="text-center text-white/80 mb-8">
            Internship & Placement Cell
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm focus:bg-white/20 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm focus:bg-white/20 transition-all"
                required
              />
            </div>

            <Button
              type="submit"
              variant="premium"
              size="lg"
              className="w-full text-lg font-bold"
            >
              Enter Portal
            </Button>

            <p className="text-center text-white/60 text-sm mt-4">
              Demo: Use any credentials to enter
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthGate;
