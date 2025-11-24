import Navbar from "./components/Navbar";
import { heroSlides } from "./constants";
import Section from "./components/Section";
import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import { syncScroll } from "./utils/scrollStore";

function App() {
  const sectionRefs = useRef([]);
  sectionRefs.current = [];

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

  let isScrolling;
  const snapDuration = 1.2;

  function snapToClosestSection() {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    const scrollPos = lenis.scroll;
    const sections = sectionRefs.current;

    // Find closest section top
    let closest = sections[0];
    let minDist = Math.abs(sections[0].offsetTop - scrollPos);

    for (let s of sections) {
      const dist = Math.abs(s.offsetTop - scrollPos);
      if (dist < minDist) {
        minDist = dist;
        closest = s;
      }
    }

    lenis.scrollTo(closest, {
      duration: 1.0,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
  }
  // ⭐ Add scroll sync here
  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    const handler = (e) => {
      clearTimeout(isScrolling);

      // When user stops scrolling for 150ms → snap
      isScrolling = setTimeout(() => {
        snapToClosestSection();
      }, 150);
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
          ref={(el) => {
            if (el) sectionRefs.current.push(el);
          }}
          key={index}
          name={slide.name}
          image={slide.image}
          imageMobile={slide.imageMobile}
          subheading={slide.subheading}
        />
      ))}
      {/* </div> */}
    </>
  );
}

export default App;
