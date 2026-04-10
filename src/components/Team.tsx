import ceo from "@/assets/team/CEO.png";
import riaz from "@/assets/team/riaz.png";
import abubakkar from "@/assets/team/abu.png";
import tahir from "@/assets/team/tahir.jpeg";
import gul from "@/assets/team/gul.jpeg";
import abdullah from "@/assets/team/abd.png";

const Team = () => {
  const rest = [
    { name: "Muhammad Riaz", role: "Manager", photo: riaz },
    { name: "Abubakkar Khalil", role: "Architect", photo: abubakkar },
    { name: "Tahir Hussain", role: "Accountant", photo: tahir },
    { name: "Abdullah Jan", role: "Site Supervisor", photo: abdullah },
    { name: "Gulraiz Usmani", role: "Social Media Manager", photo: gul },
  ];

  return (
    <section id="team" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Meet the dedicated professionals behind our success
          </p>
        </div>

        {/* CEO — featured card */}
        <div className="flex justify-center mb-12">
          <div className="group relative overflow-hidden rounded-2xl border border-border bg-background hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row w-full max-w-xl">
            <div className="relative sm:w-56 h-64 sm:h-auto overflow-hidden bg-white flex-shrink-0">
              <img
                src={ceo}
                alt="Sultan Muhammad"
                className="w-full h-full object-contain object-top group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col justify-center p-8 border-t-4 sm:border-t-0 sm:border-l-4 border-primary">
              <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Founder & CEO</span>
              <h3 className="text-2xl font-bold text-secondary mb-3">Sultan Muhammad</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                With over 24 years of experience in construction — starting in Saudi Arabia and building Al-Madina from the ground up in Peshawar — Sultan Muhammad leads the company with faith, discipline, and a commitment to excellence.
              </p>
            </div>
          </div>
        </div>

        {/* Team grid — circular avatars */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-4xl mx-auto">
          {rest.map((member, index) => (
            <div key={index} className="group flex flex-col items-center text-center">
              <div className="w-28 h-28 mb-4 rounded-full overflow-hidden border-4 border-border group-hover:border-primary transition-colors duration-300 bg-white">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-sm font-bold text-secondary">{member.name}</h3>
              <p className="text-xs text-primary font-medium mt-0.5">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
