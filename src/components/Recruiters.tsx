import { Building2 } from "lucide-react";

const Recruiters = () => {
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
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Recruiters
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Top organizations that trust our students
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {recruiters.map((recruiter, index) => (
            <div 
              key={index}
              className="bg-card border border-border rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-md transition-shadow min-h-[120px]"
            >
              <Building2 className="w-8 h-8 text-primary mb-3" />
              <span className="text-center font-medium text-card-foreground text-sm">
                {recruiter}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-card border border-border rounded-xl p-8 md:p-12">
          <h3 className="font-display text-3xl font-bold mb-6 text-card-foreground text-center">
            For Recruiters
          </h3>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-8 leading-relaxed">
            We invite organizations to recruit talented students from South Asian University. Our students 
            are well-prepared, highly motivated, and ready to contribute to your organization's success.
          </p>
          <div className="text-center">
            <a 
              href="#contact" 
              className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Partner With Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recruiters;
