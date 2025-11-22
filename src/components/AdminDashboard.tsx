import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users, Building2, Settings, FileText, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 animate-fade-in">
        <h2 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h2>
        <p className="text-muted-foreground">Manage the entire placement cell operations.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-scale-in">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Manage Students</CardTitle>
            <CardDescription>View and manage student accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-button-premium hover:bg-button-premium-hover text-button-premium-foreground">
              Manage Students
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-2">
              <Building2 className="w-6 h-6 text-accent" />
            </div>
            <CardTitle>Manage Recruiters</CardTitle>
            <CardDescription>Approve and monitor recruiters</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Manage Recruiters
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-gold-accent/10 rounded-full flex items-center justify-center mb-2">
              <FileText className="w-6 h-6 text-gold-accent" />
            </div>
            <CardTitle>Placement Reports</CardTitle>
            <CardDescription>Generate and export reports</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              View Reports
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>Overall placement statistics</CardDescription>
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
              <Shield className="w-6 h-6 text-accent" />
            </div>
            <CardTitle>Permissions</CardTitle>
            <CardDescription>Manage roles and access</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Manage Access
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 bg-gold-accent/10 rounded-full flex items-center justify-center mb-2">
              <Settings className="w-6 h-6 text-gold-accent" />
            </div>
            <CardTitle>System Settings</CardTitle>
            <CardDescription>Configure portal settings</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Open Settings
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-6 animate-fade-in">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardHeader>
            <CardTitle className="text-2xl">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">1,245</p>
            <p className="text-sm text-muted-foreground mt-2">Active registrations</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
          <CardHeader>
            <CardTitle className="text-2xl">Active Recruiters</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-accent">87</p>
            <p className="text-sm text-muted-foreground mt-2">Partner companies</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gold-accent/10 to-gold-accent/5">
          <CardHeader>
            <CardTitle className="text-2xl">Placements</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-gold-accent">523</p>
            <p className="text-sm text-muted-foreground mt-2">This academic year</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
