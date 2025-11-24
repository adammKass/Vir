import { motion, useScroll, useTransform } from "motion/react";
import { forwardRef, useRef } from "react";
import { scrollYProgress } from "../utils/scrollStore";
import CTAButton from "./CTAButton";

// Section parallax effect, seperate image and text containers for parallax effect

const Section = ({ name, image, imageMobile, subheading }) => {
  // Some forwarding ref black magic for section snapping with lenis, ont reallz understand it

  const localRef = useRef(null);

  // Assign both local and forwarded ref

  // Trigger on Scroll
  const { scrollYProgress } = useScroll({
    target: localRef,
    offset: ["start end", "end start"],
  });

  // Different values for text and image for parallax effect
  const yBg = useTransform(scrollYProgress, [0, 1], ["-40%", "40%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["-200%", "200%"]);

  return (
    // Overflow hidden to prevent overflow from image
    <section
      ref={localRef}
      className="relative min-h-lvh flex flex-col items-center md:items-start justify-end overflow-hidden"
    >
      {/* Image container, height slightly larger for parallax effect - image comes in faster, if bigger height not included -> white area */}
      <motion.div className="absolute w-full h-[120%] -z-10" style={{ y: yBg }}>
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/20"></div>
        <picture className="w-full h-full object-cover">
          <source media="(max-width: 768px)" srcSet={imageMobile} />
          <img
            className="w-full h-full object-cover object-top"
            src={image}
            alt={name}
          />
        </picture>
      </motion.div>
      {/* Text container */}
      <motion.div
        style={{ y: yText }}
        className="content text-white text-center md:text-left flex flex-col gap-4 mb-[10vh]"
      >
        <h2 className="font-serif font-bold text-2xl lg:text-6xl uppercase">
          {name}
        </h2>
        <p className="text-sm sm:text-base max-w-prose">{subheading}</p>
        <CTAButton path="#" text="Learn More" />
      </motion.div>
    </section>
  );
};
export default Section;
