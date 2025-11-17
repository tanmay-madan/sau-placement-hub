import { Building2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const Recruiters = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const recruiters = [
    "Deloitte", "KPMG", "PwC", "Ernst & Young",
    "Infosys", "TCS", "Wipro", "HCL Technologies",
    "ICICI Bank", "HDFC Bank", "State Bank of India", "Axis Bank",
    "Amazon", "Microsoft", "Google", "IBM",
    "Flipkart", "Paytm", "Ola", "Swiggy"
  ];

  return (
    <section id="recruiters" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className={cn("text-center mb-16 animate-on-scroll", titleVisible && "visible")}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Recruiters
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Top organizations that trust our students
          </p>
        </div>

        <div 
          ref={contentRef}
          className={cn("animate-on-scroll", contentVisible && "visible")}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {recruiters.map((recruiter, index) => (
              <div 
                key={index}
                className="bg-card border border-border rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-lg hover:border-primary/50 transition-all duration-300 hover:scale-105 min-h-[120px]"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
              <Building2 className="w-8 h-8 text-primary mb-3" />
              <span className="text-center font-medium text-card-foreground text-sm">
                {recruiter}
              </span>
            </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-br from-primary to-accent border border-primary/30 rounded-xl p-8 md:p-12 shadow-xl">
            <h3 className="font-display text-3xl font-bold mb-6 text-white text-center">
              For Recruiters
            </h3>
            <p className="text-white/90 text-center max-w-3xl mx-auto mb-8 leading-relaxed">
              We invite organizations to recruit talented students from South Asian University. Our students 
              are well-prepared, highly motivated, and ready to contribute to your organization's success.
            </p>
            <div className="text-center">
              <a 
                href="#contact" 
                className="inline-block bg-white hover:bg-white/90 text-primary font-semibold px-8 py-3 rounded-lg transition-all hover:scale-105 shadow-lg"
              >
                Partner With Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recruiters;
