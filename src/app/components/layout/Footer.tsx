import { Link, useLocation } from "wouter";
import bottomLogoImg from "../../../assets/dewnode-bottom-logo.png";
import { Instagram } from "lucide-react";

export function Footer() {
  const [location] = useLocation();
  const isHomePage = location === "/";

  if (!isHomePage) {
    return (
      <footer className="bg-brand-black border-t border-brand-gray flex justify-center">
        <div className="w-full flex items-center justify-center py-6 px-8 max-w-[1440px] mx-auto">
          <div className="w-[30px] md:w-[50px]">
            <img
              src={bottomLogoImg}
              alt="DEW&ODE"
              className="w-full h-auto object-contain opacity-90"
            />
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-brand-black border-t border-brand-gray mt-auto">
      <div className="w-full flex items-center justify-center py-2 md:py-4 px-2 md:px-8 max-w-[1440px] mx-auto overflow-hidden">
        <div className="flex flex-row justify-center gap-1 md:gap-2 text-center items-center whitespace-nowrap">
          <p className="text-[6px] md:text-[12px] text-brand-light/30 font-light tracking-tight md:tracking-normal uppercase">
            COMPANY : DEW&ODE
          </p>
          <p className="text-[6px] md:text-[12px] text-brand-light/30 font-light tracking-tight md:tracking-normal uppercase">
            BUSINESS LICENSE : 000-00-00000
          </p>
          <p className="text-[6px] md:text-[12px] text-brand-light/30 font-light tracking-tight md:tracking-normal uppercase">
            EMAIL : office@dewnode.com
          </p>
          <p className="text-[6px] md:text-[12px] text-brand-light/30 font-light tracking-tight md:tracking-normal uppercase">
            INSTAGRAM : dewnode
          </p>
          <p className="text-[6px] md:text-[12px] text-brand-light/30 font-light tracking-tight md:tracking-normal uppercase">
            INQUIRIES : INSTAGRAM, EMAIL
          </p>
        </div>
      </div>
    </footer>
  );
}