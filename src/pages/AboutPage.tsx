import Header from "@/components/Header";
import Footer from "@/components/Footer";
import About from "@/components/About";
import WhatsAppButton from "@/components/WhatsAppButton";

const AboutPage = () => (
  <div className="min-h-screen">
    <Header />
    <main className="pt-20">
      <About />
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default AboutPage;