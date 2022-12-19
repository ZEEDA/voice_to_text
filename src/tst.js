import React, { useState } from "react";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const Tst = () => {
  const [note, setnote] = useState("");
  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  const diagnostic = document.querySelector(".output");
  const bg = document.querySelector("html");

  document.body.onclick = () => {
    recognition.start();
    console.log("Ready to receive a color command.");
  };

  recognition.onresult = (event) => {
    const color = event.results[0][0].transcript;
    console.log(color);
    setnote(`Result received: ${color}`);
    bg.style.backgroundColor = color;
  };
  return (
    <div
      className="output"
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >{note}</div>
  );
};

export default Tst;
