import { NextResponse } from "next/server";
import nodemailer from "nodemailer"
import { render } from '@react-email/render';
import { EmailTemplate } from "@/components/email-template";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, phone, company, message } = body;

  if ((!name || !email || !phone || !message) && body) {
    return NextResponse.json({ message: "Required input is not provided" });
  }

  const html = render(EmailTemplate({
    name: name as string,
    email: email as string,
    phone: phone as string,
    company: (company as string) || "",
    message: message as string,
  }) as React.ReactElement, {
    pretty: true,
  });

  try {
    const transporter = nodemailer.createTransport({
      host: 'mail.fastontime.co.th', // e.g., smtp.yourvps.com
      port: 587, // Use the appropriate port for your mail server
      secure: false, // Use true for secure connection (e.g., TLS/SSL)
      auth: {
        user: 'contact@fastontime.co.th',
        pass: 'fastontimeAbc123$',
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
      },
    });

    const info = await transporter.sendMail({
      from: 'Fast on time <contact@fastontime.co.th>', // sender address
      to: "boommerbile@gmail.com", // list of receivers
      subject: "มีลูกค้าต้องการติดต่อกับคุณผ่าน Fast on Time", // Subject line
      html: html
    });

    return NextResponse.json({ "Message sent: ": info })
  } catch (error) {
    return NextResponse.json({ error });
  }
}
