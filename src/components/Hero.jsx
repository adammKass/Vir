import heroSlideshow01 from "../assets/images/hero-slideshow-01.jpg";

// Hero without parallax effect, seperate image and text containers for parallax effect

const Hero = () => {
  return (
    <main className="relative min-h-svh flex flex-col justify-center">
      {/* image container */}
      <div className="absolute inset-0 -z-10">
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/20 z-10" />
        <img
          className="w-full h-full object-cover"
          src={heroSlideshow01}
          alt="hero"
        />
      </div>
      {/* Text container */}
      <div className="content text-center text-white flex flex-col gap-8 items-center">
        <h1 className="font-bold font-sans text-6xl text-center uppercase">
          Hero Section
        </h1>
        <p>
          Magna fugiat sint nulla exercitation ex aute aliqua anim ut non in
          excepteur amet. Et commodo et adipisicing dolore consequat cupidatat.
          Irure dolor amet Lorem enim.
        </p>
        <button className="btn btn-accent w-fit text-2xl text-white uppercase">
          Click now
        </button>
      </div>
    </main>
  );
};
export default Hero;
