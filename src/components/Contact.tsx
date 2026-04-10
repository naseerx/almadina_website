import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(7, "Enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      content: "Al Madina Al Monawara real estate and builders Darmangi Garden Street 1 Warsak Road, Peshawar",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+92 333 9221258",
      link: "tel:+923339221258",
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

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", phone: "", message: "" },
  });

  const onSubmit = (values: FormValues) => {
    const waMessage = encodeURIComponent(
      `Hi, I'm ${values.name}.\n\n${values.message}\n\nMy phone: ${values.phone}`
    );
    window.open(`https://wa.me/923339221258?text=${waMessage}`, "_blank");
    toast.success("Opening WhatsApp with your message…");
    form.reset();
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Have a project in mind? We'd love to hear from you. Contact us for
            expert guidance and consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-6">Contact Details</h3>
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="border-border">
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-sm">{info.title}</h4>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-muted-foreground hover:text-primary transition-colors text-sm"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-muted-foreground text-sm">{info.content}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            <Card className="border-border">
              <CardContent className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+92 300 0000000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your project…"
                              className="resize-none"
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Send via WhatsApp
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Map Section */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Our Location</h3>
            <Card className="border-border overflow-hidden h-[calc(100%-3.5rem)]">
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
