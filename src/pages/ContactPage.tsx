import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import WhatsAppButton from "@/components/WhatsAppButton";

const ContactPage = () => (
  <div className="min-h-screen">
    <Header />
    <main className="pt-20">
      <Contact />
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default ContactPage;
