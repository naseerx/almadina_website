import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Testimonial from "@/components/Testimonial";
import WhatsAppButton from "@/components/WhatsAppButton";

const TestimonialsPage = () => (
  <div className="min-h-screen">
    <Header />
    <main className="pt-20">
      <Testimonial />
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default TestimonialsPage;
