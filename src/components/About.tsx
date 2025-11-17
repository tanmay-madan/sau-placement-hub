import { Target, Users, Award, TrendingUp } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To facilitate placement opportunities and career development for all students"
    },
    {
      icon: Users,
      title: "Student Support",
      description: "Comprehensive training, workshops, and guidance for career readiness"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Maintaining high standards in placement quality and student preparation"
    },
    {
      icon: TrendingUp,
      title: "Growth",
      description: "Continuously expanding our recruiter network and opportunities"
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            About Our Placement Cell
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Committed to bridging academic excellence with professional opportunities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-card-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-xl p-8 md:p-12 border border-border">
          <h3 className="font-display text-3xl font-bold mb-6 text-card-foreground">About South Asian University</h3>
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-4">
              South Asian University (SAU) is an international university sponsored by the eight member nations of the 
              South Asian Association for Regional Cooperation (SAARC). The university was established to promote 
              excellence in higher education and research in the SAARC region.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our Placement Cell works tirelessly to ensure that SAU students are connected with top employers across 
              various industries, providing them with opportunities to launch successful careers in their chosen fields.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
