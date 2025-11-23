import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Briefcase, Users } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface PlacementsProps {
  role?: string;
}

const Placements = ({ role = 'student' }: PlacementsProps) => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();
  
  const getOpportunitiesForRole = () => {
    if (role === 'admin') {
      return [
        { company: "Tech Solutions Pvt Ltd", role: "Software Developer", location: "Bangalore, India", type: "Full-time", deadline: "March 30, 2025", package: "₹6-8 LPA", applicants: "45 applicants" },
        { company: "Global Consulting Group", role: "Management Trainee", location: "Delhi NCR, India", type: "Full-time", deadline: "April 5, 2025", package: "₹7-9 LPA", applicants: "67 applicants" },
        { company: "Finance Corp International", role: "Financial Analyst", location: "Mumbai, India", type: "Full-time", deadline: "April 10, 2025", package: "₹8-10 LPA", applicants: "52 applicants" },
        { company: "Research Institute", role: "Research Intern", location: "Remote", type: "Internship", deadline: "March 25, 2025", package: "₹20k/month", applicants: "89 applicants" }
      ];
    } else if (role === 'recruiter') {
      return [
        { company: "Your Company", role: "Software Engineer", location: "Bangalore, India", type: "Full-time", deadline: "March 28, 2025", package: "₹9-12 LPA", applicants: "28 applicants" },
        { company: "Your Company", role: "Data Analyst", location: "Mumbai, India", type: "Full-time", deadline: "April 2, 2025", package: "₹7-9 LPA", applicants: "34 applicants" },
        { company: "Your Company", role: "Marketing Manager", location: "Delhi NCR, India", type: "Full-time", deadline: "April 8, 2025", package: "₹8-11 LPA", applicants: "19 applicants" },
        { company: "Your Company", role: "Summer Intern", location: "Remote", type: "Internship", deadline: "March 26, 2025", package: "₹25k/month", applicants: "56 applicants" }
      ];
    } else {
      return [
        { company: "Tech Solutions Pvt Ltd", role: "Software Developer", location: "Bangalore, India", type: "Full-time", deadline: "March 30, 2025", package: "₹6-8 LPA" },
        { company: "Global Consulting Group", role: "Management Trainee", location: "Delhi NCR, India", type: "Full-time", deadline: "April 5, 2025", package: "₹7-9 LPA" },
        { company: "Finance Corp International", role: "Financial Analyst", location: "Mumbai, India", type: "Full-time", deadline: "April 10, 2025", package: "₹8-10 LPA" },
        { company: "Research Institute", role: "Research Intern", location: "Remote", type: "Internship", deadline: "March 25, 2025", package: "₹20k/month" }
      ];
    }
  };

  const opportunities = getOpportunitiesForRole();
  
  const getTitle = () => {
    if (role === 'admin') return 'All Posted Opportunities';
    if (role === 'recruiter') return 'Your Posted Jobs';
    return 'Current Opportunities';
  };

  const getSubtitle = () => {
    if (role === 'admin') return 'Manage all placement and internship opportunities';
    if (role === 'recruiter') return 'Track your job postings and applicant status';
    return 'Latest placement and internship opportunities for our students';
  };

  return (
    <section id="placements" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className={cn("text-center mb-16 animate-on-scroll", titleVisible && "visible")}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            {getTitle()}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {getSubtitle()}
          </p>
        </div>

        <div 
          ref={contentRef}
          className={cn("grid md:grid-cols-2 gap-6 animate-on-scroll", contentVisible && "visible")}
        >
          {opportunities.map((opportunity, index) => (
            <Card 
              key={index} 
              className="hover:shadow-xl transition-all duration-300 border-border hover:border-primary/50 hover:scale-105"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
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
                {'applicants' in opportunity && (
                  <div className="flex items-center text-muted-foreground">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{opportunity.applicants}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Placements;
