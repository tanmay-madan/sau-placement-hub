import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FileText, PlusCircle, BarChart3, MessageSquare } from "lucide-react";

const RecruiterDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 animate-fade-in">
        <h2 className="text-4xl font-bold text-foreground mb-2">Recruiter Dashboard</h2>
        <p className="text-muted-foreground">Manage your recruitment process and connect with top talent.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-scale-in">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <PlusCircle className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Post New Job</CardTitle>
            <CardDescription>Create and publish job openings</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-button-premium hover:bg-button-premium-hover text-button-premium-foreground">
              Create Job Post
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-2">
              <FileText className="w-6 h-6 text-accent" />
            </div>
            <CardTitle>Active Postings</CardTitle>
            <CardDescription>Manage your job listings</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              View All Posts
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-gold-accent/10 rounded-full flex items-center justify-center mb-2">
              <Users className="w-6 h-6 text-gold-accent" />
            </div>
            <CardTitle>Candidate Pool</CardTitle>
            <CardDescription>Browse student profiles</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              View Candidates
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>Track engagement and responses</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              View Analytics
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-2">
              <MessageSquare className="w-6 h-6 text-accent" />
            </div>
            <CardTitle>Messages</CardTitle>
            <CardDescription>Communicate with candidates</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Open Messages
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="text-xl">Recruitment Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Active Jobs</span>
              <span className="font-bold text-lg">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Applications</span>
              <span className="font-bold text-lg">156</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Interviews</span>
              <span className="font-bold text-lg text-primary">24</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
