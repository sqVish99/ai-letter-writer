import React, { useState } from "react";
import openaiservice from "./services/openaiservice";
import "./App.css";

const getCurrentDate = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

function App() {
  const [name, setName] = useState("");
  const [myrole, setMyrole] = useState("");
  const [writingTo, setWritingTo] = useState("");
  const [recrole, setRecrole] = useState("");
  const [prompt, setPrompt] = useState("");
  const [letterType, setLetterType] = useState("");
  const [letter, setLetter] = useState("");

  const handleGenerateLetter = async () => {
    if (prompt.trim() && name.trim() && myrole.trim() && writingTo.trim() && recrole.trim() && letterType.trim()) {
      const fullPrompt = `I am ${name}. I am a ${myrole}. I am writing to ${writingTo}, a ${recrole}. Write a concise letter. Letter type: ${letterType}. ${prompt}. Keep it factual. Do not ask for more information, as this is a one shot request, Fill in the date as ${getCurrentDate()}.`;
      const generatedLetter = await openaiservice.generateLetter(fullPrompt);
      const formattedLetter = generatedLetter.replace(/\n/g, "<br>");
      setLetter(formattedLetter);
    } else {
      setLetter("Please enter all the details to generate the letter.");
    }
  };

  return (
    <div className="wrapper">
      <h1>Letter Writer</h1>
      <div className="input-container">
        <input
          type="text"
          className="name-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name..."
        />
        <input
          type="text"
          className="my-role-input"
          value={myrole}
          onChange={(e) => setMyrole(e.target.value)}
          placeholder="Enter your designation..."
        />
      </div>
      <div className="input-container">
        <input
          type="text"
          className="writing-to-input"
          value={writingTo}
          onChange={(e) => setWritingTo(e.target.value)}
          placeholder="Enter the recipient's name..."
        />
        <input
          type="text"
          className="designation-to-input"
          value={recrole}
          onChange={(e) => setRecrole(e.target.value)}
          placeholder="Enter the recipient's designation..."
        />
      </div>
      <select
        className="letter-type-select"
        value={letterType}
        onChange={(e) => setLetterType(e.target.value)}
      >
        <option value="" disabled>
          Select letter type...
        </option>
        <option value="Formal">Formal</option>
        <option value="Informal">Informal</option>
        <option value="Business">Business</option>
      </select>
      <textarea
        className="prompt-textarea"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter the details for your letter..."
      ></textarea>
      <button className="generate-button" onClick={handleGenerateLetter}>
        Generate Letter
      </button>
      {letter && (
        <div className="generated-letter">
          <h2>Your Generated Letter:</h2>
          <p dangerouslySetInnerHTML={{ __html: letter }}></p>
        </div>
      )}
    </div>
  );
}

export default App;
