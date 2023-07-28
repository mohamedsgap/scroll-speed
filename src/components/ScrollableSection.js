import { useRef } from "react";

import useScrollSpeed from "./hooks/useScrollSpeed";
import LoremIpsum from "./LoremIpsum";

import "../App.css";

const ScrollableSection = () => {
  const scrollableRef = useRef(null);
  const scrollSpeed = useScrollSpeed(scrollableRef);

  return (
    <section className="scroll-area">
      <div className="scroll-idicator">
        <span>Scroll speed is: </span>
        <span className="speed-value">{scrollSpeed.toFixed(2)} </span>
        <span>pixels per millisecond</span>
        <div
          className="progress-bar"
          style={{
            width: `${(scrollSpeed * 100).toFixed(2)}%`, // Converts scrollSpeed to percentage
          }}
        />
      </div>
      <div className="scrollable-section" ref={scrollableRef}>
        <LoremIpsum />
      </div>
    </section>
  );
};

export default ScrollableSection;
