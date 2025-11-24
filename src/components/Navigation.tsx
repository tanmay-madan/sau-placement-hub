import { useState, useEffect } from "react";
import { Menu, X, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [userRole, setUserRole] = useState<string>('');

  useEffect(() => {
    const role = sessionStorage.getItem('userRole') || '';
    setUserRole(role);
    
    // Set different notification counts based on role
    if (role === 'student') {
      setNotificationCount(5); // 3 interviews + 2 offers
    } else if (role === 'recruiter') {
      setNotificationCount(45); // Pending reviews
    } else if (role === 'admin') {
      setNotificationCount(23); // Pending approvals
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-primary font-bold text-lg">SAU</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-white font-semibold text-sm leading-tight">
                SAU Placement Cell
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <a href="/" className="text-white hover:text-accent transition-colors font-medium hover:scale-110 transform duration-200">
              Home
            </a>
            <a href="#about" className="text-white hover:text-accent transition-colors font-medium hover:scale-110 transform duration-200">
              About
            </a>
            <a href="#placements" className="text-white hover:text-accent transition-colors font-medium hover:scale-110 transform duration-200">
              Placements
            </a>
            <a href="#recruiters" className="text-white hover:text-accent transition-colors font-medium hover:scale-110 transform duration-200">
              Recruiters
            </a>
            <a href="#students" className="text-white hover:text-accent transition-colors font-medium hover:scale-110 transform duration-200">
              For Students
            </a>
            <a href="#contact" className="text-white hover:text-accent transition-colors font-medium hover:scale-110 transform duration-200">
              Contact
            </a>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-accent hover:bg-white/10 relative"
            >
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive text-white">
                  {notificationCount > 99 ? '99+' : notificationCount}
                </Badge>
              )}
            </Button>
            <Button
              onClick={() => {
                sessionStorage.clear();
                window.location.href = '/';
              }}
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-primary"
            >
              Logout
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-accent hover:bg-white/10"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-white/10 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <a
                href="#home"
                className="text-white hover:text-accent transition-colors font-medium px-4 py-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>
              <a
                href="#about"
                className="text-white hover:text-accent transition-colors font-medium px-4 py-2"
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
              <a
                href="#placements"
                className="text-white hover:text-accent transition-colors font-medium px-4 py-2"
                onClick={() => setIsOpen(false)}
              >
                Placements
              </a>
              <a
                href="#recruiters"
                className="text-white hover:text-accent transition-colors font-medium px-4 py-2"
                onClick={() => setIsOpen(false)}
              >
                Recruiters
              </a>
              <a
                href="#students"
                className="text-white hover:text-accent transition-colors font-medium px-4 py-2"
                onClick={() => setIsOpen(false)}
              >
                For Students
              </a>
              <a
                href="#contact"
                className="text-white hover:text-accent transition-colors font-medium px-4 py-2"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
              <div className="px-4 py-2 flex items-center justify-between">
                <span className="text-white font-medium">Notifications</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-accent hover:bg-white/10 relative"
                >
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive text-white">
                      {notificationCount > 99 ? '99+' : notificationCount}
                    </Badge>
                  )}
                </Button>
              </div>
              <Button
                onClick={() => {
                  sessionStorage.clear();
                  window.location.href = '/';
                }}
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-primary mx-4"
              >
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
