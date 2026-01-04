import { Link, useLocation } from "wouter";
import { cn } from "../../../lib/utils";
import adminLogo from "../../../assets/admin-logo-small.png";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/products", label: "Product Management" },
    { href: "/admin/orders", label: "Order Management" },
    { href: "/admin/sales", label: "Sales Analytics" },
    { href: "/admin/settings", label: "Settings" },
    { href: "/admin/hero", label: "Hero Image" },
    { href: "/admin/collections", label: "Collection Image" },
  ];

  return (
    <div className="min-h-screen flex bg-brand-black text-brand-light font-sans">
      <aside className="w-64 bg-brand-black border-r border-brand-gray flex flex-col fixed h-full">
        <div className="h-16 flex items-center px-6 border-b border-brand-gray gap-2">
          <span className="font-bold text-sm tracking-[0.2em] uppercase text-brand-cyan">ADMIN CONSOLE</span>
          <img src={adminLogo} alt="Logo" className="h-4 w-auto object-contain opacity-80" />
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {links.map(link => (
            <Link key={link.href} href={link.href}>
              <div className={cn(
                "px-4 py-3 text-[11px] uppercase tracking-widest cursor-pointer transition-colors border-b border-transparent",
                location === link.href
                  ? "bg-brand-gray text-brand-cyan border-brand-cyan"
                  : "text-brand-light/60 hover:text-brand-light hover:bg-brand-gray/50"
              )}>
                {link.label}
              </div>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-brand-gray">
          <Link href="/">
            <div className="px-4 py-2 text-[10px] uppercase tracking-widest text-center text-brand-light/40 hover:text-brand-cyan cursor-pointer transition-colors">
              Back to Store
            </div>
          </Link>
        </div>
      </aside>
      <main className="flex-1 ml-64 p-12 bg-brand-black">
        {children}
      </main>
    </div>
  );
}