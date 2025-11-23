import { MotionValue, animate } from "motion";

export const scrollY = new MotionValue(0);
export const scrollYProgress = new MotionValue(0);

export function syncScroll(e) {
  const { scroll, limit } = e;
  animate(scrollY, scroll, { duration: 0.0001 });
  animate(scrollYProgress, scroll / limit, { duration: 0.0001 });
}
