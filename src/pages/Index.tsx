import Header from "@/components/Header";
import Hero from "@/components/Hero";
import OngoingProjects from "@/components/OngoingProjects";
import About from "@/components/About";
import Services from "@/components/Services";
import Team from "@/components/Team";
import Testimonial from "@/components/Testimonial";
import HomeProjects from "@/components/HomeProjects";
import Stats from "@/components/Stats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <OngoingProjects />
      <About />
      <Services />
      <Team />
      <Testimonial />
      <HomeProjects />
      <Stats />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
