import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Building2, Shield } from "lucide-react";
import sauEntrance from "@/assets/sau-entrance.png";
import sauLogo from "@/assets/sau-logo.png";

interface AuthGateProps {
  onAuthenticated: (role: string) => void;
}

const AuthGate = ({ onAuthenticated }: AuthGateProps) => {
  const handleRoleSelection = (role: string) => {
    sessionStorage.setItem('userRole', role);
    onAuthenticated(role);
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

      {/* Role Selection */}
      <div className="relative z-10 w-full max-w-4xl mx-4">
        <div className="text-center mb-12 animate-fade-in">
          <img src={sauLogo} alt="South Asian University" className="w-20 h-20 mx-auto mb-6 object-contain drop-shadow-2xl" />
          <h2 className="text-4xl font-bold text-white mb-2">
            Welcome
          </h2>
          <p className="text-xl text-white/80">
            Internship & Placement Cell Portal
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 animate-scale-in">
          <div 
            className="glass-morphism rounded-2xl p-8 text-center space-y-6 hover:scale-105 transition-all cursor-pointer group"
            onClick={() => handleRoleSelection("student")}
          >
            <div className="w-20 h-20 bg-gold-accent rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <User className="w-10 h-10 text-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-white">Student</h3>
            <p className="text-white/70">Access placement dashboard and opportunities</p>
            <Button 
              className="w-full bg-button-premium hover:bg-button-premium-hover text-button-premium-foreground font-bold"
            >
              Student Login
            </Button>
          </div>

          <div 
            className="glass-morphism rounded-2xl p-8 text-center space-y-6 hover:scale-105 transition-all cursor-pointer group"
            onClick={() => handleRoleSelection("recruiter")}
          >
            <div className="w-20 h-20 bg-gold-accent rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Building2 className="w-10 h-10 text-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-white">Recruiter</h3>
            <p className="text-white/70">Post opportunities and connect with talent</p>
            <Button 
              className="w-full bg-button-premium hover:bg-button-premium-hover text-button-premium-foreground font-bold"
            >
              Recruiter Login
            </Button>
          </div>

          <div 
            className="glass-morphism rounded-2xl p-8 text-center space-y-6 hover:scale-105 transition-all cursor-pointer group"
            onClick={() => handleRoleSelection("admin")}
          >
            <div className="w-20 h-20 bg-gold-accent rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Shield className="w-10 h-10 text-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-white">Administrator</h3>
            <p className="text-white/70">Manage placement cell operations</p>
            <Button 
              className="w-full bg-button-premium hover:bg-button-premium-hover text-button-premium-foreground font-bold"
            >
              Admin Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthGate;
