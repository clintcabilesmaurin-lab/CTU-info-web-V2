import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);

  useGSAP(() => {
    const targets = ref.current?.querySelectorAll("[data-reveal]");
    if (!targets?.length) return;
    gsap.fromTo(
      targets,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.1,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 86%",
          once: true
        }
      }
    );
  }, { scope: ref });

  return <div className={className} ref={ref}>{children}</div>;
}
