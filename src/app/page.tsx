import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Services from "@/components/Services";
import Results from "@/components/Results";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Story />
      <Problem />
      <Solution />
      <Services />
      <Results />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
