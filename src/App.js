import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

function App() {
  const mic = SpeechRecognition ? new SpeechRecognition() : null;
  mic.continous = true;
  mic.interimResults = true;
  mic.lang = "en-US";

  const [listining, setListining] = useState(false);
  const [note, setNote] = useState("");
  const [sevedNote, setSevedNote] = useState([]);

  // useEffect(() => {
  //   if (!!SpeechRecognition) {
  //     hadleListen();
  //   }
  //   return () => {};
  // }, [listining]);

  const hadleListen = (listining) => {
    if (listining) {
      mic.start();
      mic.onend = (event) => {
        console.log("Continue...");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic onclick");
      };
    }
    mic.onstart = () => {
      console.log("Mic is on");
    };
    mic.onresult = (event) => {
      const text = Array.from(event.results)
        .map((res) => res[0])
        .map((res) => res.transcript)
        .join("");
      console.log("==> Text: ", text);
      setNote(text);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };
  const handleSaveNote = () => {
    if (!note) {
      return;
    }
    setSevedNote([...sevedNote, note]);
    setNote("");
  };
  return (
    <>
      <div className="container">
        <header>
          <h1>{listining ? "Listining..." : "Start Now!"}</h1>
          <button
            onClick={() => {
              hadleListen(!listining);
              setListining(!listining);
            }}
          >
            {listining ? (
              <>
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
              </>
            ) : (
              <>
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
              </>
            )}
          </button>
          <button onClick={handleSaveNote}>Save</button>
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
        ></textarea>
      </div>
      <div className="container">
        <h3>Seved Notes</h3>
        {sevedNote.length > 0 ? (
          sevedNote.map((note, index) => <p>{note}</p>)
        ) : (
          <p className="warn">No notes saved yet</p>
        )}
      </div>
    </>
  );
}

export default App;
