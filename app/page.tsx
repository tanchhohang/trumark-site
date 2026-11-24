import { Header } from "../features/header/Header";
import { Hero } from "../features/hero/Hero";
import { About } from "../features/about/About";
import { Expertise } from "../features/expertise/Expertise";
import { FeaturedWork } from "../features/work/FeaturedWork";
import { Footer } from "../features/footer/Footer";
import { Panels } from "../features/dialogs/Panels";
import { WhatsAppCtas } from "../features/contact/WhatsAppCtas";
import { PageMotion } from "../shared/PageMotion";

export const metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <main>
        <About />
        <Expertise />
        <FeaturedWork />
      </main>
      <Footer />
      <Panels />
      <WhatsAppCtas />
      <PageMotion />
    </>
  );
}
