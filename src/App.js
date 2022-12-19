import "./App.css";
import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function App() {
  const [lang, setLang] = useState("en-US");
  const [note, setNote] = useState("");
  const [sevedNote, setSevedNote] = useState([]);
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
  } = useSpeechRecognition();

  useEffect(() => {
    if (finalTranscript !== "") {
      // console.log("Got final result:", finalTranscript);
    }
  }, [interimTranscript, finalTranscript]);

  useEffect(() => {
    if (transcript) {
      setNote(transcript);
    }
    return () => {};
  }, [transcript]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log(
      "Your browser does not support speech recognition software! Try Chrome desktop, maybe?"
    );
  }
  const listenContinuously = (lang) => {
    SpeechRecognition.startListening({
      continuous: true,
      language: lang,
    });
  };
  const handleSaveNote = () => {
    if (!note) {
      return;
    }
    setSevedNote([...sevedNote, note]);
    resetTranscript();
    setNote("");
  };
  return (
    <>
      <div className="container">
        <header>
          <h1>{listening ? "listening..." : "Start Now!"}</h1>
          {listening ? (
            <button type="button" onClick={SpeechRecognition.stopListening}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-stop-fill"
                viewBox="0 0 16 16"
              >
                <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z" />
              </svg>
              <span className="text">Stop</span>
            </button>
          ) : (
            <button type="button" onClick={() => listenContinuously(lang)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-play-fill"
                viewBox="0 0 16 16"
              >
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
              </svg>
              <span className="text">Start</span>
            </button>
          )}
          <button onClick={handleSaveNote}>Save</button>
          <select
            name="lang"
            id=""
            onChange={(e) => {
              let _value = e.currentTarget.value;
              setLang(_value);
              if (!listening) {
                return;
              }
              SpeechRecognition.stopListening();
              setTimeout(() => {
                listenContinuously(_value);
              }, 400);
            }}
            value={lang}
          >
            <option value="en-US">En</option>
            <option value="ar-EG">Ar</option>
          </select>
        </header>
        <textarea
          name="speech_to_text"
          id="speech_to_text"
          cols="30"
          rows="10"
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
          }}
          dir={lang.split("-")[0] === "ar" ? "rtl" : ""}
        ></textarea>
      </div>
      <div className="container">
        <h3>Seved Notes</h3>
        {sevedNote.length > 0 ? (
          sevedNote.map((note, index) => <p key={index}>{note}</p>)
        ) : (
          <p className="warn">No notes saved yet</p>
        )}
      </div>
    </>
  );
}

export default App;
