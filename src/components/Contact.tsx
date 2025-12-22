import { MapPin, Mail, Clock } from "lucide-react";
import React from "react";

const WhatsAppIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill="#25D366" d="M12 2C6.48 2 2 6.48 2 12c0 1.99.52 3.84 1.42 5.46L2 22l4.75-1.33C8.16 21.49 10.04 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
    <path d="M17.22 14.12c-.26-.13-1.54-.76-1.78-.84-.24-.08-.42-.13-.6.13-.18.26-.7.84-.86 1.01-.16.17-.32.19-.58.06-.26-.13-1.09-.4-2.07-1.28-.77-.68-1.29-1.52-1.44-1.78-.15-.26-.02-.4.12-.53.12-.12.26-.32.39-.48.13-.16.17-.27.26-.45.08-.18.04-.34-.02-.47-.06-.13-.6-1.44-.82-1.96-.22-.5-.44-.43-.6-.44-.16-.01-.34-.01-.52-.01-.18 0-.47.07-.72.33-.25.26-.96.94-.96 2.29 0 1.35.98 2.66 1.11 2.84.13.18 1.92 2.99 4.66 4.07 1.66.57 2.3.61 3.12.52.49-.06 1.54-.63 1.76-1.24.22-.61.22-1.14.15-1.24-.07-.1-.26-.16-.52-.29z" fill="#fff"/>
  </svg>
);

import { Card, CardContent } from "./ui/card";





 const WhatsAppIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fill="#E66F22" d="M12 2C6.48 2 2 6.48 2 12c0 1.99.52 3.84 1.42 5.46L2 22l4.75-1.33C8.16 21.49 10.04 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
    <path d="M17.22 14.12c-.26-.13-1.54-.76-1.78-.84-.24-.08-.42-.13-.6.13-.18.26-.7.84-.86 1.01-.16.17-.32.19-.58.06-.26-.13-1.09-.4-2.07-1.28-.77-.68-1.29-1.52-1.44-1.78-.15-.26-.02-.4.12-.53.12-.12.26-.32.39-.48.13-.16.17-.27.26-.45.08-.18.04-.34-.02-.47-.06-.13-.6-1.44-.82-1.96-.22-.5-.44-.43-.6-.44-.16-.01-.34-.01-.52-.01-.18 0-.47.07-.72.33-.25.26-.96.94-.96 2.29 0 1.35.98 2.66 1.11 2.84.13.18 1.92 2.99 4.66 4.07 1.66.57 2.3.61 3.12.52.49-.06 1.54-.63 1.76-1.24.22-.61.22-1.14.15-1.24-.07-.1-.26-.16-.52-.29z" fill="#fff" />
  </svg>
);

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      content: "Al Madina Al Monawara real estate and builders Darmangi Garden Street 1 Warsak Road, Peshawar",
    },
    {
      icon: WhatsAppIcon,
      title: "WhatsApp",
      content: "+92 333 9221258 (WhatsApp)",
      link: "https://wa.me/923339221258",
    },
    {
      icon: Mail,
      title: "Email",
      content: "almadinaconstructions260@gmail.com",
      link: "mailto:almadinaconstructions260@gmail.com",
    },
    {
      icon: Clock,
      title: "Working Days",
      content: "Sat - Thu: 9:00 AM - 6:00 PM",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Have a project in mind? We'd love to hear from you. Contact us for
            expert guidance and consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6 text-primary">Contact Details</h3>
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="border-border">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{info.title}</h4>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.content}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Map Section */}
          <div>
            <Card className="border-border overflow-hidden h-full">
              <CardContent className="p-0 h-full">
                <div className="w-full h-full min-h-[400px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.8345847662845!2d71.5386!3d33.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d917c5e5e5e5e5%3A0x2b3f4e5e5e5e5e5e!2sSabz%20Ali%20Town%2C%20Peshawar!5e0!3m2!1sen!2s!4v1700000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Al-Madina Constructions Location - Sabz Ali Town"
                    className="w-full h-full"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
