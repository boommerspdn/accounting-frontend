import Link from "next/link";

interface ThirdSectionProps {
  title: string;
  description: string;
  button: string;
  path: string;
}

const ThirdSection = ({
  title,
  description,
  button,
  path,
}: ThirdSectionProps) => {
  return (
    <div className="container text-center space-y-12 my-36">
      <h1 className="text-6xl">{title}</h1>
      <p className="text-xl font-medium">{description}</p>
      <Link href={"/"}>
        <button className="py-3 px-20 mt-12 rounded-2xl bg-[#FFC940] font-bold text-lg cursor-pointer">
          {button}
        </button>
      </Link>
    </div>
  );
};

export default ThirdSection;
