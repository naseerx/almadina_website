import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OngoingProjects from "@/components/OngoingProjects";
import WhatsAppButton from "@/components/WhatsAppButton";

const OngoingProjectsPage = () => (
  <div className="min-h-screen">
    <Header />
    <main className="pt-20">
      <OngoingProjects />
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default OngoingProjectsPage;
