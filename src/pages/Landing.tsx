
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import KeyBenefits from "@/components/landing/KeyBenefits";
import Workflow from "@/components/landing/Workflow";
import PricingSection from "@/components/landing/PricingSection";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

export default function Landing() {
  return (
    <div className="bg-white dark:bg-background min-h-screen flex flex-col">
      <Header />
      <Hero />
      <KeyBenefits />
      <Workflow />
      <PricingSection />
      <FAQ />
      <Footer />
    </div>
  );
}
