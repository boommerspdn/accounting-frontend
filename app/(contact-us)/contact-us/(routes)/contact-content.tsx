"use client";

import Header from "@/components/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchLiveContact, fetchLiveLayout } from "@/lib/client-data";
import { cmsKeys } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";
import ContactForm from "./components/contact-form";

export default function ContactUs() {
  const contact = useQuery({ queryKey: cmsKeys.contact, queryFn: fetchLiveContact });
  const layout = useQuery({ queryKey: cmsKeys.layout, queryFn: fetchLiveLayout });
  if (!contact.data || !layout.data) return null;
  return <>
    <Header title="ติดต่อเรา" />
    <div className="container grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3 space-y-2 text-center lg:text-start"><h1 className="text-4xl pb-4">ข้อมูลการติดต่อ</h1><div className="space-y-1"><h2 className="text-2xl text-custom-blue">ชื่อบริษัท</h2><p>{contact.data.company_name}</p></div><div className="space-y-1"><h2 className="text-2xl text-custom-blue">ที่อยู่</h2><p>{layout.data.address}</p></div><div className="space-y-1"><h2 className="text-2xl text-custom-blue">เบอร์โทรศัพท์</h2><p>{layout.data.phone}</p></div><div className="space-y-1"><h2 className="text-2xl text-custom-blue">อีเมล</h2><p>{layout.data.email}</p></div><div className="flex justify-center lg:justify-start gap-4 h-fit pt-3"><a href={layout.data.facebook_link || "/"} target="_blank" className="h-fit"><img src="/Facebook.png" alt="Facebook Icon" width={35} height={35} /></a><a href={layout.data.line_link || "/"} target="_blank" className="h-fit"><img src="/LINE.png" alt="LINE Icon" width={35} height={35} /></a></div></div>
      <div className="lg:col-span-2"><Card><CardHeader><CardTitle>ส่งข้อความหาเรา</CardTitle><CardDescription>ติดต่อเราทันทีเพื่อรับบริการที่รวดเร็วที่สุด! เราพร้อมรับฟังและให้คำปรึกษาทุกข้อสงสัยของคุณ</CardDescription></CardHeader><CardContent><ContactForm emailToRecieve={contact.data.email_to_receive} /></CardContent></Card></div>
      <div className="lg:col-span-5"><iframe src={contact.data.google_map_embed_src} title="ที่อยู่บริษัท" width="100%" height="450" style={{ border: 0 }} aria-hidden="false" /></div>
    </div>
  </>;
}
