import React, { useState, useRef, useEffect } from "react";
import LoremIpsum from "./LoremIpsum";
import "../App.css";

const ScrollableSection = () => {
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const prevScrollTime = useRef(0);
  const prevScrollY = useRef(0);

  const handleScroll = (event) => {
    const currentScrollY = event.currentTarget.scrollTop;
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

  return (
    <section className="scroll-area">
      <div className="scroll-idicator">
        <span>Scroll speed is: </span>
        <span className="speed-value">{scrollSpeed.toFixed(2)} </span>
        <span> pixels per second</span>
        <div
          className="progress-bar"
          style={{
            width: `${(scrollSpeed * 100).toFixed(2)}%`, // Converts scrollSpeed to percentage
          }}
        />
      </div>
      <div className="scrollable-section" onScroll={handleScroll}>
        <LoremIpsum />
      </div>
    </section>
  );
};

export default ScrollableSection;
