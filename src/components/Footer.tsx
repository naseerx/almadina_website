import { MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo-rm.png";

const Footer = () => {
  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Ongoing Projects", href: "#ongoing-projects" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Team", href: "#team" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <img src={logo} alt="Al-Madina logo" className="h-12 object-contain mb-4 brightness-0 invert" />
            <p className="text-white/60 text-sm leading-relaxed">
              Al-Madina Al-Munawwara Constructions & Builders — building quality homes, plazas, and communities across Peshawar since 2001.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    className="text-white/60 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                Darmangi Garden Street 1, Warsak Road, Peshawar
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="tel:+923339221258" className="text-white/60 hover:text-primary transition-colors">
                  +92 333 9221258
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="mailto:almadinaconstructions260@gmail.com" className="text-white/60 hover:text-primary transition-colors break-all">
                  almadinaconstructions260@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Al-Madina Constructions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
