import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import WhatsAppButton from "@/components/WhatsAppButton";

const ServicesPage = () => (
  <div className="min-h-screen">
    <Header />
    <main className="pt-20">
      <Services />
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default ServicesPage;
