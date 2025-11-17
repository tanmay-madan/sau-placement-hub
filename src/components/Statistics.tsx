import { TrendingUp, Users, Briefcase, Award } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const Statistics = () => {
  const { ref, isVisible } = useScrollAnimation();
  const stats = [
    {
      icon: Users,
      value: "500+",
      label: "Students Placed",
      color: "text-white"
    },
    {
      icon: Briefcase,
      value: "150+",
      label: "Recruiting Companies",
      color: "text-white"
    },
    {
      icon: Award,
      value: "₹8.5 LPA",
      label: "Average Package",
      color: "text-white"
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: "Placement Rate",
      color: "text-white"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-stats-bg via-primary to-accent">
      <div 
        ref={ref}
        className={cn("container mx-auto px-4 animate-on-scroll", isVisible && "visible")}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center hover:scale-110 transition-transform duration-300"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm shadow-xl">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
              <div className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-white/90 text-sm md:text-base font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
