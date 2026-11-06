import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import DashboardPreview from "@/components/DashboardPreview";
import WhyXross from "@/components/WhyXross";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <Features />
        <DashboardPreview />
        <WhyXross />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
