import { TrendingUp, Users, Briefcase, Award } from "lucide-react";

const Statistics = () => {
  const stats = [
    {
      icon: Users,
      value: "500+",
      label: "Students Placed",
      color: "text-accent"
    },
    {
      icon: Briefcase,
      value: "150+",
      label: "Recruiting Companies",
      color: "text-accent"
    },
    {
      icon: Award,
      value: "₹8.5 LPA",
      label: "Average Package",
      color: "text-accent"
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: "Placement Rate",
      color: "text-accent"
    }
  ];

  return (
    <section className="py-16 bg-stats-bg">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
              <div className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-white/80 text-sm md:text-base font-medium">
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
