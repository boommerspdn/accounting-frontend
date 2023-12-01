import { EmailTemplate } from "@/components/email-template";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, phone, company, message } = body;

  if (!name || !email || !phone || !message) {
    return NextResponse.json({ message: "Required input is not provided" });
  }

  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["boommerbile@gmail.com"],
      subject: "มีลูกค้าต้องการติดต่อกับคุณผ่าน Fast on Time",
      react: EmailTemplate({
        name: name as string,
        email: email as string,
        phone: phone as string,
        company: (company as string) || "",
        message: message as string,
      }) as React.ReactElement,
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
