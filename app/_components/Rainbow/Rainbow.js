"use client";
import { useEffect, useState } from "react";
import "./rainbow.css";
import { allStripes } from "./rainbows";

function doLocalStorage(action, ...args) {
  try {
    return localStorage[action](...args);
  } catch (e) {}
}

/**
 * A rainbow flag toggler inspired by/largely cribbed from queerjs.com
 * @see https://github.com/queerjs/website/blob/master/src/components/rainbow/RainbowWithClicker.js
 */
export default function Rainbow({ isClickable = false }) {
  const [isMounted, setIsMounted] = useState(false);
  const [stripeIndex, setStripeIndex] = useState(
    JSON.parse(doLocalStorage("getItem", "flagIndex") || "0")
  );
  useEffect(() => {
    // sync preference to localStorage
    doLocalStorage("setItem", "flagIndex", stripeIndex);
  }, [stripeIndex]);

  useEffect(() => {
    // don't server-render rainbows
    Promise.resolve().then(() => setIsMounted(true));
  }, []);

  const rainbow = allStripes[stripeIndex];
  const stripes = [...rainbow.stripes, ...Array.from({ length: 10 })];
  const name = `${rainbow.name} flag`;

  useEffect(() => {
    document.body.style.setProperty(
      "--rainbow",
      `linear-gradient(to right, ${rainbow.stripes
        .map((stripe) => stripe.colour)
        .join(",")})`
    );
  }, [rainbow.stripes]);
  if (!isMounted) {
    return null;
  }

  const rainbowDom = (
    <div className="rainbow__wrapper">
      {stripes.map(({ colour = "black", size = 0 } = {}, i) => (
        <div
          key={i}
          style={{
            background: colour,
            flex: size,
          }}
        ></div>
      ))}
    </div>
  );

  if (!isClickable) {
    return rainbowDom;
  }

  return (
    <button
      className="rainbow"
      title={name}
      aria-live="assertive"
      onClick={() =>
        setStripeIndex(allStripes[stripeIndex + 1] ? stripeIndex + 1 : 0)
      }
    >
      <div className="sr-only">{name} - click to change</div>
      {rainbowDom}
    </button>
  );
}
