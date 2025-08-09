import { useState } from "react";
import "./App.css";

// Your WhatsApp Tool component (reused from before)
const WhatsAppTool = () => {
  const [number, setNumber] = useState("");
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, "");
    setNumber(inputValue);
  };
  const handleCopyLink = () => {
    if (number) {
      const url = `https://wa.me/${number}`;
      navigator.clipboard
        .writeText(url)
        .then(() => {
          alert("Link copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy link: ", err);
        });
    } else {
      alert("Please enter a phone number first.");
    }
  };
  const whatsappUrl = number ? `https://wa.me/${number}` : "#";
  return (
    <div className="container">
      <h1>WhatsApp Link Generator</h1>
      <p>Enter a phone number to generate a WhatsApp chat link.</p>
      <div className="input-group">
        <input
          type="text"
          name="number"
          value={number}
          onChange={handleNumberChange}
          placeholder="e.g., 919876543210"
        />
      </div>
      {number && (
        <div className="link-section">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="chat-link"
          >
            Chat on WhatsApp with: {number}
          </a>
          <button className="copy-button" onClick={handleCopyLink}>
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
};

// A new component for a Text Counter Tool
const TextCounterTool = () => {
  const [text, setText] = useState("");
  const wordCount = text.split(/\s+/).filter((word) => word.length > 0).length;
  const charCount = text.length;

  return (
    <div className="container">
      <h1>Text Counter</h1>
      <p>Enter your text below to count words and characters.</p>
      <div className="input-group">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing here..."
          rows={5}
        />
      </div>
      <div className="text-stats">
        <p>Word Count: {wordCount}</p>
        <p>Character Count: {charCount}</p>
      </div>
    </div>
  );
};

// The main App component with state to manage which tool to show
function App() {
  const [activeTool, setActiveTool] = useState<
    "whatsapp" | "text-counter" | null
  >(null);

  return (
    <div className="app-container">
      {activeTool === null && (
        <div className="tool-selection">
          <button
            onClick={() => setActiveTool("whatsapp")}
            className="tool-button whatsapp"
          >
            WhatsApp Tool
          </button>
          <button
            onClick={() => setActiveTool("text-counter")}
            className="tool-button text-counter"
          >
            Text Counter Tool
          </button>
        </div>
      )}

      {activeTool === "whatsapp" && <WhatsAppTool />}
      {activeTool === "text-counter" && <TextCounterTool />}

      {activeTool !== null && (
        <button onClick={() => setActiveTool(null)} className="back-button">
          &lt; Back to Tools
        </button>
      )}
    </div>
  );
}

export default App;
