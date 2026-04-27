import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Team from "@/components/Team";
import WhatsAppButton from "@/components/WhatsAppButton";

const TeamPage = () => (
  <div className="min-h-screen">
    <Header />
    <main className="pt-20">
      <Team />
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default TeamPage;
