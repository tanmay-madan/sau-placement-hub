import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const Contact = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();
  return (
    <section id="contact" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className={cn("text-center mb-16 animate-on-scroll", titleVisible && "visible")}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Contact Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get in touch with our placement cell team
          </p>
        </div>

        <div 
          ref={contentRef}
          className={cn("max-w-4xl mx-auto animate-on-scroll", contentVisible && "visible")}
        >
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-border hover:shadow-xl transition-all duration-300 hover:border-primary/50 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Email</h3>
                    <a 
                      href="mailto:placements@sau.edu" 
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      placements@sau.edu
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-xl transition-all duration-300 hover:border-primary/50 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Phone</h3>
                    <a 
                      href="tel:+911126707400" 
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      +91 11 2670 7400
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-xl transition-all duration-300 hover:border-primary/50 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Address</h3>
                    <p className="text-muted-foreground">
                      Akbar Bhawan, Chanakyapuri<br />
                      New Delhi - 110021, India
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-xl transition-all duration-300 hover:border-primary/50 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Office Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday<br />
                      9:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-primary to-accent text-white border-primary shadow-xl">
            <CardContent className="p-8 text-center">
              <h3 className="font-display text-2xl font-bold mb-4">
                Ready to Connect?
              </h3>
              <p className="mb-6 text-white/90">
                Whether you're a student seeking guidance or a recruiter looking to partner with us, 
                we're here to help.
              </p>
              <a 
                href="mailto:placements@sau.edu" 
                className="inline-block bg-white hover:bg-white/90 text-primary font-semibold px-8 py-3 rounded-lg transition-all hover:scale-105 shadow-lg"
              >
                Send Us a Message
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
