const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-hero-overlay via-primary to-hero-overlay text-white py-8 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-display text-xl font-bold mb-4">Placement Cell</h3>
            <p className="text-white/80 text-sm">
              South Asian University's Placement Cell is dedicated to connecting our talented students 
              with top employers across various industries.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a href="#about" className="hover:text-accent transition-colors">About Us</a>
              </li>
              <li>
                <a href="#placements" className="hover:text-accent transition-colors">Current Opportunities</a>
              </li>
              <li>
                <a href="#recruiters" className="hover:text-accent transition-colors">Our Recruiters</a>
              </li>
              <li>
                <a href="#students" className="hover:text-accent transition-colors">For Students</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>Akbar Bhawan, Chanakyapuri</li>
              <li>New Delhi - 110021, India</li>
              <li>
                <a href="mailto:placements@sau.edu" className="hover:text-accent transition-colors">
                  placements@sau.edu
                </a>
              </li>
              <li>
                <a href="tel:+911126707400" className="hover:text-accent transition-colors">
                  +91 11 2670 7400
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-6 text-center">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} South Asian University. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
