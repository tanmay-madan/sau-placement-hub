import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BookOpen, Users2, TrendingUp } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface ForStudentsProps {
  role?: string;
}

const ForStudents = ({ role = 'student' }: ForStudentsProps) => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();
  
  const getResourcesForRole = () => {
    if (role === 'admin') {
      return [
        { icon: FileText, title: "Training Programs", description: "Manage and schedule student training programs and workshops" },
        { icon: BookOpen, title: "Resource Library", description: "Upload and organize educational materials for students" },
        { icon: Users2, title: "Student Database", description: "Access and manage student profiles and placement records" },
        { icon: TrendingUp, title: "Analytics Dashboard", description: "Track placement metrics, success rates, and student progress" }
      ];
    } else if (role === 'recruiter') {
      return [
        { icon: FileText, title: "Student Profiles", description: "Browse detailed profiles and resumes of qualified candidates" },
        { icon: BookOpen, title: "Recruitment Guide", description: "Best practices and guidelines for campus recruitment" },
        { icon: Users2, title: "Candidate Pool", description: "Access to pre-screened and vetted student candidates" },
        { icon: TrendingUp, title: "Hiring Analytics", description: "Track your recruitment activities and candidate pipeline" }
      ];
    } else {
      return [
        { icon: FileText, title: "Resume Building", description: "Get expert guidance on creating professional resumes that stand out" },
        { icon: BookOpen, title: "Interview Preparation", description: "Mock interviews and training sessions to boost your confidence" },
        { icon: Users2, title: "Soft Skills Training", description: "Communication, leadership, and professional etiquette workshops" },
        { icon: TrendingUp, title: "Career Counseling", description: "One-on-one guidance to help you make informed career decisions" }
      ];
    }
  };

  const resources = getResourcesForRole();

  const getTitle = () => {
    if (role === 'admin') return 'Administrative Tools';
    if (role === 'recruiter') return 'Recruiter Resources';
    return 'For Students';
  };

  const getSubtitle = () => {
    if (role === 'admin') return 'Tools and resources to manage the placement cell efficiently';
    if (role === 'recruiter') return 'Everything you need for successful campus recruitment';
    return 'Resources and support to help you succeed in your career journey';
  };

  return (
    <section id="students" className="py-20 bg-background">
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
          className={cn("animate-on-scroll", contentVisible && "visible")}
        >
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {resources.map((resource, index) => (
              <Card 
                key={index} 
                className="hover:shadow-xl transition-all duration-300 border-border hover:border-primary/50 hover:scale-105"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <resource.icon className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-xl">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{resource.description}</CardDescription>
              </CardContent>
            </Card>
            ))}
          </div>

          <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border border-primary/20 rounded-xl p-8 md:p-12 shadow-lg">
          <h3 className="font-display text-3xl font-bold mb-6 text-center">Important Information</h3>
          <div className="grid md:grid-cols-2 gap-8 text-foreground">
            <div>
              <h4 className="font-semibold text-xl mb-3 text-primary">Eligibility Criteria</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Minimum 60% aggregate in current program</li>
                <li>• No active backlogs during placement season</li>
                <li>• Regular attendance in training sessions</li>
                <li>• Updated resume and profile on placement portal</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-xl mb-3 text-primary">Placement Process</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Registration on placement portal</li>
                <li>• Pre-placement talks by companies</li>
                <li>• Written tests and group discussions</li>
                <li>• Technical and HR interviews</li>
                <li>• Offer letter and onboarding</li>
              </ul>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForStudents;
