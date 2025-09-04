import Hero from "@/components/Hero";
import WhyChoose from "@/components/WhyChoose";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Calculator from "@/components/Calculator";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div>
      <Hero />
      <WhyChoose />
      <About />
      <Gallery />
      <Calculator />
      <Contact />
    </div>
  );
}
