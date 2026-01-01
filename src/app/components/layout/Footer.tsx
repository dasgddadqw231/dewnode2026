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
      <div className="w-full relative flex flex-col md:flex-row items-center justify-center pt-32 pb-32 px-8 max-w-[1440px] mx-auto gap-12 md:gap-0">

        {/* Company Info & Logo - Center on Mobile, Left on Desktop */}
        <div className="order-1 md:order-1 md:absolute md:left-8 flex flex-col items-center md:items-start gap-4 text-center md:text-left">
          <Link href="/">
            <img src={logoImg} alt="DEW&ODE" className="h-7 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity mb-2" />
          </Link>

          <div className="flex flex-col gap-1">
            <p className="text-[10px] md:text-[12px] text-brand-light/30 font-light tracking-[0.1em] uppercase">
              COMPANY : DEW&ODE
            </p>
            <p className="text-[10px] md:text-[12px] text-brand-light/30 font-light tracking-[0.1em] uppercase">
              BUSINESS LICENSE : 000-00-00000
            </p>
            <p className="text-[10px] md:text-[12px] text-brand-light/30 font-light tracking-[0.1em] uppercase">
              EMAIL : office@dewnode.com
            </p>
            <p className="text-[10px] md:text-[12px] text-brand-light/30 font-light tracking-[0.1em] uppercase">
              INSTAGRAM : dewnode
            </p>
            <p className="text-[10px] md:text-[12px] text-brand-light/30 font-light tracking-[0.1em] uppercase">
              CONTACT : INSTAGRAM, EMAIL
            </p>
          </div>
        </div>

        {/* Empty Right/Center Div (Kept for layout structure if needed, or removed) */}
        {/* User asked to remove the centered parts. Restructuring to simple center alignment might be better if order-2 is empty? */}
        {/* But keeping it empty creates space or I should just remove it. */}
        {/* Given existing layout uses flex-col md:flex-row justify-center relative... */}
        {/* If I empty order-2, order-1 is absolute left. That works for desktop. */}
        {/* For mobile, order-1 is top. It will just be text centered. */}
        <div className="order-2 md:order-2 hidden"></div>
      </div>
    </footer>
  );
}