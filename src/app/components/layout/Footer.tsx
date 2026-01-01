import { Link } from "wouter";
import logoImg from "../../../logo.png";
import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-black border-t border-brand-gray mt-auto">
      <div className="w-full relative flex items-center justify-center md:justify-start py-16 px-8 max-w-[1440px] mx-auto">
        <div className="flex items-center gap-6">
          <Link href="/">
            <img src={logoImg} alt="DEW&ODE" className="h-7 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
          </Link>

          <a
            href="#"
            className="group flex items-center justify-center transition-all duration-500"
            aria-label="Instagram"
          >
            <div className="w-7 h-7 flex items-center justify-center border border-brand-light/10 group-hover:border-brand-cyan/40 group-hover:bg-brand-cyan/[0.02] transition-all rounded-sm">
              <Instagram className="w-3 h-3 text-brand-light/30 group-hover:text-brand-cyan transition-colors" strokeWidth={1} />
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
}