import { Users } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import ceo from "@/assets/team/CEO.png";
import riaz from "@/assets/team/riaz.png";
import abubakkar from "@/assets/team/abu.png";
import tahir from "@/assets/team/tahir.jpeg";

const Team = () => {
  const teamMembers = [
    {
      name: "Sultan Muhammad",
      role: "Founder and CEO",
      initials: "SM",
      photo: ceo,
    },
    {
      name: "Muhammad Riaz",
      role: "Manager",
      initials: "MR",
      photo: riaz,
    },

    {
      name: "Abubakkar Khalil",
      role: "Architect",
      initials: "AK",
      photo: abubakkar,
    },
     {
      name: "Tahir Hussain",
      role: "Accountant",
      initials: "TH",
      photo: tahir,
    },
    {
      name: "Abdullah Jan",
      role: "Site Supervisor",
      initials: "AJ",
      photo: 'riaz',
    },

    {
      name: "Gulraiz Usmani",
      role: "Social Media Manager",
      initials: "GU",
      photo: 'tahir',
    },
  ];

  return (
    <section id="team" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Meet the dedicated professionals behind our success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border"
            >
              <CardContent className="pt-8 pb-8">
                <Avatar className="w-24 h-24 mx-auto mb-4 bg-primary/10">
                  <AvatarImage src={member.photo} alt={member.name} />
                  <AvatarFallback className="text-2xl font-bold text-primary bg-transparent">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
