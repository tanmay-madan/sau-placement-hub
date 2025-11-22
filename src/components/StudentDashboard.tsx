import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Briefcase, FileText, Calendar, Award } from "lucide-react";

const StudentDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 animate-fade-in">
        <h2 className="text-4xl font-bold text-foreground mb-2">Student Dashboard</h2>
        <p className="text-muted-foreground">Welcome back! Here's your placement journey overview.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-scale-in">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Job Opportunities</CardTitle>
            <CardDescription>Browse and apply to latest openings</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-button-premium hover:bg-button-premium-hover text-button-premium-foreground">
              View Jobs
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-2">
              <FileText className="w-6 h-6 text-accent" />
            </div>
            <CardTitle>My Applications</CardTitle>
            <CardDescription>Track your application status</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              View Applications
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-gold-accent/10 rounded-full flex items-center justify-center mb-2">
              <BookOpen className="w-6 h-6 text-gold-accent" />
            </div>
            <CardTitle>Interview Prep</CardTitle>
            <CardDescription>Resources and tips for success</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Learn More
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Career fairs and workshops</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              View Calendar
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-2">
              <Award className="w-6 h-6 text-accent" />
            </div>
            <CardTitle>My Profile</CardTitle>
            <CardDescription>Update resume and details</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="text-xl">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Applications</span>
              <span className="font-bold text-lg">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Interviews</span>
              <span className="font-bold text-lg">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Offers</span>
              <span className="font-bold text-lg text-primary">1</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
