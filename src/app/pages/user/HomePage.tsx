import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
<<<<<<< HEAD
import { dbService } from "../../../utils/supabase/service";
import { HeroImage } from "../../utils/mockDb";
=======
import { db, HeroImage } from "../../utils/mockDb";
>>>>>>> 51711f9e812bcbd7f4fae318a162b88a401f618e
import { WireframePlaceholder } from "../../components/WireframePlaceholder";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

export function HomePage() {
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);

  useEffect(() => {
<<<<<<< HEAD
    const fetchHero = async () => {
      try {
        const data = await dbService.hero.getAll();
        setHeroImages(data);
      } catch (error) {
        console.error("Failed to fetch hero images", error);
      }
    };
    fetchHero();
=======
    setHeroImages(db.hero.getAll());
>>>>>>> 51711f9e812bcbd7f4fae318a162b88a401f618e
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
<<<<<<< HEAD
                <div className="w-full aspect-square bg-brand-gray overflow-hidden flex items-center justify-center">
                  <div className="w-full h-full md:min-h-[533px]">
                    <ImageWithFallback
=======
                <div className="w-full h-[50vh] md:h-auto md:aspect-[21/12] bg-brand-gray overflow-hidden flex items-center justify-center">
                  <div className="w-full h-full md:min-h-[533px]">
                    <ImageWithFallback 
>>>>>>> 51711f9e812bcbd7f4fae318a162b88a401f618e
                      src={hero.image}
                      alt="Hero Image"
                      className="w-full h-full object-cover opacity-80"
                    />
                  </div>
                </div>
                <div className="absolute inset-0 bg-brand-black/20 pointer-events-none" />
                {hero.title && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <h1 className="text-white text-3xl md:text-5xl font-light tracking-[0.5em] uppercase text-center drop-shadow-lg px-4">
                      {hero.title}
                    </h1>
                  </div>
                )}
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* SNS Section - Placeholder as per Figma */}
      <section className="py-12 md:py-24 bg-brand-black flex justify-center">
        <div className="text-center w-full max-w-[1440px] px-4 md:px-8">
          {/* Box Container for 1, 2 and 3 */}
          <div className="bg-brand-light/[0.01] py-12 md:py-16 px-6 md:px-12 flex flex-col items-center gap-12 lg:gap-16 border-y border-brand-light/5">
            {/* 1. Small Batches Only (Top) */}
<<<<<<< HEAD
            <p className="font-univers-39 tracking-[0.2em] md:tracking-[1em] text-brand-light uppercase opacity-80 text-[16px] md:text-[24px] text-center leading-tight font-light whitespace-nowrap">
=======
            <p className="tracking-[0.2em] md:tracking-[1em] text-brand-light uppercase opacity-80 text-[16px] md:text-[24px] text-center leading-tight font-light whitespace-nowrap">
>>>>>>> 51711f9e812bcbd7f4fae318a162b88a401f618e
              SMALL BATCHES ONLY
            </p>

            <div className="w-full flex flex-col items-center justify-center gap-8">
              {/* 2. Ment Area (Left) */}
              <div className="relative w-fit mx-auto">
                <p className="text-[10px] md:text-[14px] text-brand-light/40 tracking-[0.1em] md:tracking-[0.15em] leading-[2.2] md:leading-[2.5] uppercase font-light text-center lg:text-left">
                  Small-batch production centered on metal. <br className="hidden lg:block" />
                  Driven by sensibility, <br className="hidden lg:block" />
                  defined by uniqueness, <br className="hidden lg:block" />
                  rooted in minimalism.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="pb-12 bg-brand-black w-full flex justify-center">
<<<<<<< HEAD
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-[10px] md:text-[12px] text-brand-light/30 font-light tracking-[0.1em] uppercase">
            회사명 : DEW&ODE
          </p>
          <p className="text-[10px] md:text-[12px] text-brand-light/30 font-light tracking-[0.1em] uppercase">
            대표메일 : office@dewnode.com
          </p>
          <p className="text-[10px] md:text-[12px] text-brand-light/30 font-light tracking-[0.1em] uppercase">
            CONTACT : INSTAGRAM, EMAIL
          </p>
        </div>
      </section>

=======
         <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-[10px] md:text-[12px] text-brand-light/30 font-light tracking-[0.1em] uppercase">
              회사명 : DEW&ODE
            </p>
            <p className="text-[10px] md:text-[12px] text-brand-light/30 font-light tracking-[0.1em] uppercase">
              대표메일 : office@dewnode.com
            </p>
            <p className="text-[10px] md:text-[12px] text-brand-light/30 font-light tracking-[0.1em] uppercase">
              CONTACT : INSTAGRAM, EMAIL
            </p>
         </div>
      </section>
      
>>>>>>> 51711f9e812bcbd7f4fae318a162b88a401f618e
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