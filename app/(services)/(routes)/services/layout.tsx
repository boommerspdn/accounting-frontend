export default async function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="py-16">{children}</div>;
    </>
  );
}
