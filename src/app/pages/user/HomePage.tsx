import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { db, HeroImage } from "../../utils/mockDb";
import { WireframePlaceholder } from "../../components/WireframePlaceholder";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Instagram, Youtube, X } from "lucide-react";

export function HomePage() {
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);

  useEffect(() => {
    setHeroImages(db.hero.getAll());
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <div className="w-full bg-brand-black">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-brand-black pt-8 px-4 md:px-8">
        <div className="max-w-[1440px] mx-auto overflow-hidden">
          <Slider {...settings}>
            {heroImages.map((hero) => (
              <div key={hero.id} className="relative outline-none">
                <div className="w-full aspect-[21/9] bg-brand-gray overflow-hidden flex items-center justify-center">
                  <div className="w-full h-full min-h-[400px]">
                    <ImageWithFallback 
                      src={hero.image}
                      alt="Hero Image"
                      className="w-full h-full object-cover grayscale opacity-80"
                    />
                  </div>
                </div>
                <div className="absolute inset-0 bg-brand-black/20 pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <h1 className="text-white text-3xl md:text-5xl font-light tracking-[0.5em] uppercase text-center drop-shadow-lg px-4">
                    {hero.title}
                  </h1>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* SNS Section - Placeholder as per Figma */}
      <section className="py-12 md:py-24 bg-brand-black flex justify-center">
        <div className="text-center w-full max-w-[1440px] px-4 md:px-8">
          {/* 1. Small Batches Only */}
          <h2 className="font-['Host_Grotesk'] font-thin tracking-[0.5em] md:tracking-[1em] text-brand-light mb-32 md:mb-64 uppercase opacity-80 text-[24px]">
            SMALL BATCHES ONLY
          </h2>
          
          {/* Box Container for 2 and 3 */}
          <div className="bg-brand-light/[0.01] py-12 md:py-16 px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 border-y border-brand-light/5">
            {/* 2. Ment Area */}
            <p className="text-[10px] md:text-[14px] text-brand-light/40 tracking-[0.1em] md:tracking-[0.15em] leading-[2.2] md:leading-[2.5] lg:mb-0 uppercase font-light text-center lg:text-left max-w-2xl">
              We focus on the essential purity of form and material. <br className="hidden lg:block" />
              Every piece is crafted in limited quantities to ensure the highest precision <br className="hidden lg:block" />
              and maintain our commitment to artisanal quality.
            </p>

            {/* 3. Social Links */}
            <div className="flex justify-center items-center gap-8 md:gap-16">
              {[
                { icon: Instagram, label: "INSTAGRAM", href: "#" },
                { icon: Youtube, label: "YOUTUBE", href: "#" },
                { icon: X, label: "X (TWITTER)", href: "#" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href}
                  className="group flex flex-col items-center gap-3 md:gap-4 transition-all duration-500"
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-brand-light/10 group-hover:border-brand-cyan/40 group-hover:bg-brand-cyan/[0.02] transition-all">
                    <social.icon className="w-3 h-3 md:w-3.5 md:h-3.5 text-brand-light/30 group-hover:text-brand-cyan transition-colors" strokeWidth={1} />
                  </div>
                  <span className="text-[7px] md:text-[8px] tracking-[0.2em] md:tracking-[0.4em] text-brand-light/20 group-hover:text-brand-light transition-colors">
                    {social.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <style>{`
        .slick-dots li button:before {
          color: #E2E3E4 !important;
          opacity: 0.25 !important;
        }
        .slick-dots li.slick-active button:before {
          color: #00E2E3 !important;
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}