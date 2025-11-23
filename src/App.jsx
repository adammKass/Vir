import Navbar from "./components/Navbar";
import { heroSlides } from "./constants";
import Section from "./components/Section";
import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import { syncScroll } from "./scrollStore";

function App() {
  // Implementing lenis for smooth scrolling
  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      const lenis = lenisRef.current?.lenis;

      if (lenis) {
        lenis.raf(time);
      }

      requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }, []);

  // ⭐ Add scroll sync here
  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    const handler = (e) => {
      syncScroll(e);
    };

    lenis.on("scroll", handler);

    return () => {
      lenis.off("scroll", handler);
    };
  }, []);
  return (
    <>
      <ReactLenis root ref={lenisRef} />
      <Navbar></Navbar>
      {
        // Snapping Container - not working beacuse of lenis
        /* <div className="h-dvh overflow-y-scroll snap-y snap-mandatory"> */
      }

      {/* <Hero /> */}

      {/* Passing text from constants.js to Section.jsx */}
      {heroSlides.map((slide, index) => (
        <Section
          key={index}
          name={slide.name}
          image={slide.image}
          subheading={slide.subheading}
        />
      ))}
      {/* </div> */}
    </>
  );
}

export default App;
