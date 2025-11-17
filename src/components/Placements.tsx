import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Briefcase } from "lucide-react";

const Placements = () => {
  const opportunities = [
    {
      company: "Tech Solutions Pvt Ltd",
      role: "Software Developer",
      location: "Bangalore, India",
      type: "Full-time",
      deadline: "March 30, 2025",
      package: "₹6-8 LPA"
    },
    {
      company: "Global Consulting Group",
      role: "Management Trainee",
      location: "Delhi NCR, India",
      type: "Full-time",
      deadline: "April 5, 2025",
      package: "₹7-9 LPA"
    },
    {
      company: "Finance Corp International",
      role: "Financial Analyst",
      location: "Mumbai, India",
      type: "Full-time",
      deadline: "April 10, 2025",
      package: "₹8-10 LPA"
    },
    {
      company: "Research Institute",
      role: "Research Intern",
      location: "Remote",
      type: "Internship",
      deadline: "March 25, 2025",
      package: "₹20k/month"
    }
  ];

  return (
    <section id="placements" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Current Opportunities
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Latest placement and internship opportunities for our students
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {opportunities.map((opportunity, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-border">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <CardTitle className="text-xl mb-2">{opportunity.role}</CardTitle>
                    <CardDescription className="text-base font-semibold text-primary">
                      {opportunity.company}
                    </CardDescription>
                  </div>
                  <Badge variant={opportunity.type === "Full-time" ? "default" : "secondary"}>
                    {opportunity.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{opportunity.location}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Briefcase className="w-4 h-4 mr-2" />
                  <span>{opportunity.package}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Apply by: {opportunity.deadline}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Placements;
