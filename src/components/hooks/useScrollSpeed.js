import { useState, useRef, useEffect } from "react";

const useScrollSpeed = (elementRef) => {
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const prevScrollTime = useRef(0);
  const prevScrollY = useRef(0);

  const handleScroll = (event) => {
    const currentScrollY = event.target.scrollTop;
    const currentTime = performance.now();

    // Calculate time passed and distance scrolled since the previous scroll event
    const timePassed = currentTime - prevScrollTime.current;
    const distanceScrolled = Math.abs(currentScrollY - prevScrollY.current);

    // Calculate the scroll speed (pixels per millisecond)
    const speed = distanceScrolled / timePassed;

    // Update the scroll speed state
    setScrollSpeed(speed);

    // Update previous scrollY and scroll time for the next event
    prevScrollY.current = currentScrollY;
    prevScrollTime.current = currentTime;
  };

  useEffect(() => {
    if (elementRef.current) {
      // Attach the event listener when the element is available
      elementRef.current.addEventListener("scroll", handleScroll);

      // Clean up the event listener when the hook is unmounted or the element changes
      return () => {
        elementRef.current.removeEventListener("scroll", handleScroll);
      };
    }
  }, [elementRef]);

  return scrollSpeed;
};

export default useScrollSpeed;
