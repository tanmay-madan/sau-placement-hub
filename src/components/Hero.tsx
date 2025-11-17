import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import sauCampus from "@/assets/sau-campus.jpg";
import sauLogo from "@/assets/sau-logo.png";

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${sauCampus})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-hero-overlay/85 via-hero-overlay/75 to-hero-overlay/90" />
      </div>

      {/* Logo positioned top left */}
      <div className="absolute top-20 left-8 md:left-16 z-10">
        <img src={sauLogo} alt="South Asian University" className="w-32 md:w-40 lg:w-48 drop-shadow-2xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight glow-text">
          Internship & Placement Cell
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl text-white/95 mb-8 max-w-3xl mx-auto font-light glow-text">
          South Asian University
        </p>
        <p className="text-base md:text-lg text-white/80 mb-12 max-w-2xl mx-auto italic">
          Knowledge Without Borders
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-6 text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
            onClick={() => document.getElementById('placements')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Ongoing Opportunities
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-6 text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contact Us
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
