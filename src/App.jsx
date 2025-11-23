import Navbar from "./components/Navbar";
import { heroSlides } from "./constants";
import Section from "./components/Section";
import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";

function App() {
  // Implementing lenis for smooth scrolling
  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time);
    }

    const rafId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(rafId);
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
