import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import sauEntrance from "@/assets/sau-entrance.png";
import sauLogo from "@/assets/sau-logo.png";
import { useToast } from "@/hooks/use-toast";

const LoginStudent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    studentId: "",
    program: "",
    year: "",
    phone: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp && formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    // Store authentication and redirect
    sessionStorage.setItem('isAuthenticated', 'true');
    sessionStorage.setItem('userRole', 'student');
    
    toast({
      title: "Success",
      description: isSignUp ? "Account created successfully!" : "Logged in successfully!",
    });
    
    navigate('/');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative py-8"
      style={{ backgroundImage: `url(${sauEntrance})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-hero-overlay/40" />
      
      <Button
        variant="ghost"
        className="absolute top-4 left-4 z-20 text-white hover:text-gold-accent hover:bg-white/10"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Button>

      <div className="relative z-10 w-full max-w-2xl mx-4">
        <div className="glass-morphism rounded-2xl shadow-2xl p-8 space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <img src={sauLogo} alt="SAU Logo" className="w-20 h-20 drop-shadow-lg" />
            <h1 className="text-3xl font-bold text-white text-center">
              {isSignUp ? "Student Registration" : "Student Login"}
            </h1>
            <p className="text-white/80 text-center">South Asian University Placement Cell</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-white font-medium">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-gold-accent"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="studentId" className="text-white font-medium">Student ID</Label>
                    <Input
                      id="studentId"
                      type="text"
                      placeholder="SAU2024001"
                      value={formData.studentId}
                      onChange={handleChange}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-gold-accent"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="program" className="text-white font-medium">Program</Label>
                    <Input
                      id="program"
                      type="text"
                      placeholder="B.Tech Computer Science"
                      value={formData.program}
                      onChange={handleChange}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-gold-accent"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year" className="text-white font-medium">Year</Label>
                    <Input
                      id="year"
                      type="text"
                      placeholder="4th Year"
                      value={formData.year}
                      onChange={handleChange}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-gold-accent"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white font-medium">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-gold-accent"
                    required
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="student@sau.ac.in"
                value={formData.email}
                onChange={handleChange}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-gold-accent"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-gold-accent"
                required
              />
            </div>

            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white font-medium">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-gold-accent"
                  required
                />
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-gold-accent hover:bg-gold-accent/90 text-foreground font-bold py-6 text-lg shadow-lg hover:shadow-xl transition-all"
            >
              {isSignUp ? "Create Account" : "Sign In"}
            </Button>

            <div className="text-center space-y-2">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-white/80 hover:text-gold-accent text-sm transition-colors"
              >
                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
              </button>
              
              {!isSignUp && (
                <div>
                  <a href="#" className="text-white/80 hover:text-gold-accent text-sm transition-colors block">
                    Forgot Password?
                  </a>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginStudent;
