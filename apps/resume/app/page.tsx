"use client";

import {
  AboutSection,
  Experiences,
  SocialNetworks,
  Introduction,
  Navigation,
  Footer,
  Tracker,
  FlagToggle,
  Resume,
} from "@/ui";

import { useSectionRef } from "@/lib";

export default function Home() {
  const { selectedIndex, experienceRef, aboutRef } = useSectionRef();

  return (
    <div className="group/spotlight relative custom-scrollbar">
      <Tracker />
      <FlagToggle />

      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <div>
              <Introduction />
              <Navigation selectedIndex={selectedIndex} />
            </div>
            <SocialNetworks />
          </header>
          <main id="content" className="pt-24 lg:w-1/2 lg:py-24">
            <section
              id="introduction"
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
              ref={aboutRef}
            >
              <AboutSection />
            </section>
            <section
              id="experience"
              className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
              ref={experienceRef}
            >
              <Experiences />
              <div>
                <Resume />
              </div>
            </section>
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
}
