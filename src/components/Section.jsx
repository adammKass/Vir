import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

// Section parallax effect, seperate image and text containers for parallax effect

const Section = ({ name, image, subheading }) => {
  // Trigger on Scroll
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Different values for text and image for parallax effect
  const yBg = useTransform(scrollYProgress, [0, 1], ["-40%", "40%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["-200%", "200%"]);

  return (
    // Overflow hidden to prevent overflow from image
    <section
      ref={sectionRef}
      className="relative h-dvh flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Image container, height slightly larger for parallax effect - image comes in faster, if bigger height not included -> white area */}
      <motion.div
        className="absolute w-full h-[120%] -z-10"
        style={{ top: yBg }}
      >
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/20"></div>
        <img className="w-full h-full object-cover" src={image} alt={name} />
      </motion.div>
      {/* Text container */}
      <motion.div
        style={{ y: yText }}
        className="content text-white text-center flex flex-col gap-4"
      >
        <h2 className="font-sans font-bold text-2xl lg:text-6xl uppercase">
          {name}
        </h2>
        <p className="text-sm sm:text-base">{subheading}</p>
      </motion.div>
    </section>
  );
};
export default Section;
