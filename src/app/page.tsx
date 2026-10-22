import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { Work } from "@/components/sections/Work";
import { Skills } from "@/components/sections/Skills";
import { Path } from "@/components/sections/Path";
import { Certificates } from "@/components/sections/Certificates";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { TimelineDock } from "@/components/timeline/TimelineDock";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <About />
        <Work />
        <Skills />
        <Path />
        <Certificates />
        <Contact />
      </main>
      <Footer />
      <TimelineDock />
    </>
  );
}
