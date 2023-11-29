import Link from "next/link";

import { ChevronRight } from "lucide-react";

interface ServiceProps {
  title: string;
  body: string;
}

const Service = ({ title, body }: ServiceProps) => {
  return (
    <div className="min-w-[300px] space-y-2">
      <h1 className="text-2xl text-custom-blue">{title}</h1>
      <p className="md:text-xl h-[10.75rem] md:h-[200px] multiline-ellipsis">
        {body}
      </p>
      <Link
        href={"/"}
        className="flex items-center justify-end text-custom-blue text-lg"
      >
        อ่านเพิ่มเติม <ChevronRight />
      </Link>
    </div>
  );
};

export default Service;
