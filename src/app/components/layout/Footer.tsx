import { Link, useLocation } from "wouter";
import logoImg from "../../../logo.png";
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
      <div className="w-full relative flex flex-col md:flex-row items-center justify-center py-16 px-8 max-w-[1440px] mx-auto gap-12 md:gap-0">

        {/* Company Info - Left on Desktop, Top on Mobile */}
        <div className="order-1 md:order-1 md:absolute md:left-8 flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <p className="text-[10px] md:text-[12px] text-brand-light/30 font-light tracking-[0.1em] uppercase">
            COMPANY : DEW&ODE
          </p>
          <p className="text-[10px] md:text-[12px] text-brand-light/30 font-light tracking-[0.1em] uppercase">
            EMAIL : office@dewnode.com
          </p>
          <p className="text-[10px] md:text-[12px] text-brand-light/30 font-light tracking-[0.1em] uppercase">
            CONTACT : INSTAGRAM, EMAIL
          </p>
        </div>

        {/* Logo & Insta - Center on Desktop, Bottom on Mobile */}
        <div className="order-2 md:order-2 flex flex-col items-center gap-4">
          <Link href="/">
            <img src={logoImg} alt="DEW&ODE" className="h-7 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
          </Link>

          <span className="text-[10px] md:text-[12px] text-brand-light/50 font-light tracking-[0.1em] lowercase hover:text-brand-cyan transition-colors cursor-pointer">
            insta: @dewnode
          </span>
        </div>
      </div>
    </footer>
  );
}