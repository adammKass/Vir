import Navbar from "./components/Navbar";
import { heroSlides } from "./constants";
import Section from "./components/Section";
import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import { frame, cancelFrame } from "framer-motion";
import "lenis/dist/lenis.css";

function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    function update(data) {
      const time = data.timestamp;
      lenisRef.current?.lenis?.raf(time);
    }

    frame.update(update, true);

    return () => cancelFrame(update);
  }, []);

  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      <Navbar></Navbar>

      {/* <Hero /> */}

      {/* Passing text from constants.js to Section.jsx */}
      {heroSlides.map((slide, index) => (
        <Section
          key={index}
          name={slide.name}
          image={slide.image}
          imageMobile={slide.imageMobile}
          subheading={slide.subheading}
        />
      ))}
    </>
  );
}

export default App;
