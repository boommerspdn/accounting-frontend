export default function Page({ params }: { params: { slug: string } }) {
  return <div>My Service: {params.slug}</div>;
}
