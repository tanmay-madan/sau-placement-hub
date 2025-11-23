import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import sauEntrance from "@/assets/sau-entrance.png";
import sauLogo from "@/assets/sau-logo.png";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const LoginRecruiter = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp, signIn, user, isRecruiter } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (user && isRecruiter) {
      navigate('/');
    }
  }, [user, isRecruiter, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          toast({
            title: "Error",
            description: "Passwords do not match",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        await signUp(email, password, { role: 'recruiter' });
        toast({
          title: "Success",
          description: "Account created successfully!",
        });
      } else {
        await signIn(email, password);
        toast({
          title: "Success",
          description: "Recruiter login successful!",
        });
      }

      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Authentication failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative"
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

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="glass-morphism rounded-2xl shadow-2xl p-8 space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <img src={sauLogo} alt="SAU Logo" className="w-24 h-24 drop-shadow-lg" />
            <h1 className="text-3xl font-bold text-white text-center">
              {isSignUp ? "Recruiter Registration" : "Recruiter Login"}
            </h1>
            <p className="text-white/80 text-center">South Asian University Placement Cell</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-medium">Company Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="recruiter@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:border-gold-accent"
                  required
                />
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gold-accent hover:bg-gold-accent/90 text-foreground font-bold py-6 text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isSignUp ? "Creating Account..." : "Signing In..."}
                </>
              ) : (
                <>{isSignUp ? "Create Account" : "Sign In"}</>
              )}
            </Button>

            <div className="text-center space-y-2">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-white/80 hover:text-gold-accent text-sm transition-colors block w-full"
              >
                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
              </button>

              {!isSignUp && (
                <div>
                  <a href="#" className="text-white/80 hover:text-gold-accent text-sm transition-colors">
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

export default LoginRecruiter;
