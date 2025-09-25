"use client";

import { useState } from "react";
import "./emailSubscribe.css";
import RainbowSpinner from "../RainbowSpinner/RainbowSpinner";

export default function EmailSubscribe() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState();
  const [status, setStatus] = useState("ready");

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!email) {
      return setError("Please enter an email");
    }
    setStatus("submitting");

    fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then(async (response) => {
        const data = await response.json();

        if (response.ok) {
          setStatus("success");
          setEmail("");
        } else {
          setError(data.error || "An error occurred. Please try again.");
          setStatus("ready");
        }
      })
      .catch((err) => {
        setError("An error occurred. Please try again.");
        setStatus("ready");
      });
  }

  return (
    <form
      className={`email-subscribe email-subscribe--${status}`}
      onSubmit={onSubmit}
    >
      <label htmlFor="email-subscribe">
        <div className="email-subscribe__sell">
          To hear about upcoming events, enter your email
        </div>
      </label>
      <div className="email-subscribe__pill">
        <div className="email-subscribe__inliner">
          <div className="email-subscribe__input">
            <input
              id="email-subscribe"
              type="email"
              value={email}
              onInput={(e) => setEmail(e.target.value)}
              disabled={status !== "ready"}
            />
          </div>
          <button type="submit" disabled={status !== "ready"}>
            Subscribe
          </button>
        </div>
        <div
          className={`email-subscribe__spinner email-subscribe__spinner--${
            status === "submitting" ? "submitting" : "dormant"
          }`}
        >
          <RainbowSpinner height={100} />
          <div className="email-subscribe__spinner-text">
            {status === "submitting" ? "loading..." : ""}
          </div>
        </div>
        {status === "success" && (
          <div className={`email-subscribe__success`}>
            <div className="email-subscribe__emojo">🥳</div>
            <div>
              <strong>Done!</strong>
              Check your email to confirm.
            </div>
            <div className="email-subscribe__emojo">🌈</div>
          </div>
        )}
      </div>
      <p className="email-subscribe__error" aria-hidden={!error}>
        {error ? error : ""}
      </p>
    </form>
  );
}
