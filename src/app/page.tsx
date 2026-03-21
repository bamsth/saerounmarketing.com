import Hero from "@/components/Hero";
import ScarcityBanner from "@/components/ScarcityBanner";
import Story from "@/components/Story";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Services from "@/components/Services";
import Results from "@/components/Results";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <ScarcityBanner />
      <Story />
      <Problem />
      <Solution />
      <Services />
      <Results />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingCTA />
    </main>
  );
}
