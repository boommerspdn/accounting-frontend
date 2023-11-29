import { SearchX } from "lucide-react";
import Link from "next/link";

const ServiceNotFound = () => {
  return (
    <div className="container flex justify-center items-center min-h-[75vh]">
      <div className="flex flex-col items-center gap-2 text-center">
        <SearchX size={250} className="text-custom-blue" />
        <p className="text-2xl">
          ไม่พบการบริการที่คุณตามหา หรือลิงค์ไม่ถูกต้อง
        </p>
        <Link href={"/"} className="my-4">
          <button className="py-2 px-4 border-custom-yellow border-[1px] rounded-md">
            กลับสู่หน้าหลัก
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceNotFound;
