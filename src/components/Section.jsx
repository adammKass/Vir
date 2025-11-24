import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import CTAButton from "./CTAButton";

// Section parallax effect, seperate image and text containers for parallax effect

const Section = ({ name, image, imageMobile, subheading }) => {
  const isMobile = window.innerWidth < 768;

  // Some forwarding ref black magic for section snapping with lenis, ont reallz understand it

  const localRef = useRef(null);

  // Assign both local and forwarded ref

  // Trigger on Scroll
  const { scrollYProgress } = useScroll({
    target: localRef,
    offset: ["start end", "end start"],
    // smooth: 0.1,
  });

  // Different values for text and image for parallax effect
  const yBg = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["-10%", "10%"] : ["-40%", "40%"]
  );
  const yText = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["-0%", "0%"] : ["-200%", "200%"]
  );

  const scaleBg = useTransform(scrollYProgress, [0, 1], [1.4, 1.7]);

  return (
    // Overflow hidden to prevent overflow from image
    <section
      ref={localRef}
      className="relative min-h-lvh flex flex-col items-center md:items-start justify-end overflow-hidden snap-start"
    >
      {/* Image container, height slightly larger for parallax effect - image comes in faster, if bigger height not included -> white area */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          y: yBg,
          scale: scaleBg,
          transform: scrollYProgress.get() > 0 ? "translateZ(0)" : "none",
        }}
      >
        {/* Dark overlay for better text visibility */}
        {/* <div className="absolute inset-0 bg-black/20"></div> */}

        <picture>
          <source media="(max-width: 768px)" srcSet={imageMobile} />
          <img
            src={image}
            className="w-full h-full object-cover"
            loading="eager" // important for parallax
            fetchPriority="high"
            // Critical:
            style={{
              transform: "translateZ(0)",
            }}
            // Add this to prevent layout thrashing
            width="100%"
            height="100%"
          />
        </picture>
      </motion.div>
      {/* Text container */}
      <motion.div
        style={{ y: yText }}
        className="content text-white md:self-start text-left flex flex-col gap-4 mb-[10vh] lg:bg-linear-to-r lg:from-black/20 lg:to-transparent lg:to-60% py-4"
      >
        <h2 className="font-serif font-bold text-2xl portrait:text-5xl lg:text-8xl uppercase">
          {name}
        </h2>
        <p className="text-sm sm:text-base max-w-prose">{subheading}</p>
        <CTAButton path="#" text="Learn More" />
      </motion.div>
    </section>
  );
};
export default Section;
