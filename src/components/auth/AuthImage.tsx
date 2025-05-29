import Image from "next/image";
import React from "react";

const AuthImage: React.FC = () => {
  return (
    <div className="relative w-full h-full lg:col-span-5 hidden lg:block items-center justify-center">
      <div className=" absolute left-[9%] w-[80%] rounded-[30px]">
        <Image
          src="/images/LoginImage.webp"
          alt="SalesFine App"
          width={800}
          height={1200}
          priority
          className="rounded-lg w-[97%] h-[97vh]"
        />
      </div>
    </div>
  );
};

export default React.memo(AuthImage);
