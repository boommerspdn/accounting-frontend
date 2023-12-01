import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/header";
import ContactForm from "./components/contact-form";
import { metaFetcher, pageFetcher } from "@/lib/data";
import { MetaTag, SocialMedias } from "@/lib/definitions";

export async function generateMetadata(): Promise<Metadata> {
  const meta: MetaTag = await metaFetcher("contact-page", null);

  return {
    title: meta.meta_title,
    description: meta.meta_description,
  };
}

const ContactUs = async () => {
  const contactUsData = await pageFetcher("contact-page");
  const socialMedias: SocialMedias = await pageFetcher("social-medias");

  return (
    <>
      <Header title={contactUsData.header} />
      <div className="container grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-2 text-center lg:text-start">
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
          <div className="flex justify-center lg:justify-start gap-4 h-fit pt-3">
            {socialMedias.map((socialMedia, index) => (
              <Link
                key={index}
                href={socialMedia.url || "/"}
                target="_blank"
                className="h-fit"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${socialMedia.image.url}`}
                  alt={socialMedia.platform || "Social Media"}
                  width={35}
                  height={35}
                />
              </Link>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2">
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
        <div className="lg:col-span-5">
          <iframe
            src={contactUsData.google_map_embed_src}
            title="ที่อยู่บริษัท"
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
