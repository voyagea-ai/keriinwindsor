import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import ScrollFilm from "@/components/home/ScrollFilm";
import MangoMoment from "@/components/home/MangoMoment";
import WhyUs from "@/components/home/WhyUs";
import Varieties from "@/components/home/Varieties";
import PreOrderBand from "@/components/home/PreOrderBand";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <ScrollFilm />
      <MangoMoment />
      <WhyUs />
      <Varieties />
      <PreOrderBand />
      <FinalCTA />
    </>
  );
}
