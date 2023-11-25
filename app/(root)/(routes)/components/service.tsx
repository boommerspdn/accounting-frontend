import Link from "next/link";

import { ChevronRight } from "lucide-react";

const Service = () => {
  return (
    <div className="min-w-[300px] space-y-2">
      <h1 className="text-2xl text-custom-blue">service title</h1>
      <p className="text-xl h-[200px] multiline-ellipsis">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur
        debitis maiores saepe iusto consectetur facere voluptatibus delectus
        dolores repellat provident doloribus, sunt velit ut totam eligendi
        reiciendis qui dolorum fugit? Lorem, ipsum dolor sit amet consectetur
        adipisicing elit. Veniam sunt eos nulla! Esse quas quis dolores aliquam?
        Eos nihil, odit natus quaerat vitae facere beatae eligendi similique
        minima, quod voluptatibus.
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
