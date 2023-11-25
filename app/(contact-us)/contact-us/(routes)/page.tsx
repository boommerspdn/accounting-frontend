import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/header";
import { pageFetcher } from "@/lib/data";
import ContactForm from "./components/contact-form";

const ContactUs = async () => {
  const contactUsData = await pageFetcher("contact-page");

  return (
    <>
      <Header title={contactUsData.header} />
      <div className="container grid grid-cols-5 gap-8">
        <div className="col-span-3 space-y-2">
          <h1 className="text-4xl pb-4">{contactUsData.sub_header}</h1>
          <div className="space-y-1">
            <h2 className="text-2xl text-custom-blue">
              {contactUsData.company_name_title}
            </h2>
            <p>{contactUsData.company_name_body}</p>
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl text-custom-blue">
              {contactUsData.company_address_title}
            </h2>
            <p>{contactUsData.company_address_body}</p>
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl text-custom-blue">
              {contactUsData.company_phone_title}
            </h2>
            <p>{contactUsData.company_phone_body}</p>
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl text-custom-blue">
              {contactUsData.company_email_title}
            </h2>
            <p>{contactUsData.company_email_body}</p>
          </div>
        </div>
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{contactUsData.message_title}</CardTitle>
              <CardDescription>
                {contactUsData.message_description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
        <div className="col-span-5">
          <iframe
            src={contactUsData.google_map_embed_src}
            width="100%"
            height="450"
            style={{ border: 0 }}
            aria-hidden="false"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
