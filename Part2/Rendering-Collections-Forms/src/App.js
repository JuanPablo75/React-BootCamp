import "./App.css";
import { Note } from "./Note.js";
import { useState } from "react";

function App(props) {
   
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  const handleInputChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const noteToAddToState = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };
    console.log(noteToAddToState);
    setNotes([...notes, noteToAddToState]);
    setNewNote("");
  };

  const handleShowAll = () => setShowAll(() => !showAll);

  if (typeof notes === "undefined" || notes.length === 0) {
    return "There is not notes";
  }

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={handleShowAll}>
        {showAll ? "Show only important" : "Show all"}
      </button>
      <ol>
        {notes
          .filter((note) => {
            if (showAll === true) return true;
            return note.important === true;
          })
          .map((note) => (
            <Note key={note.id} content={note.content} date={note.date} /> //use allways unique keys
          ))}
      </ol>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleInputChange} value={newNote} />
        <button>Create note</button>
      </form>
    </div>
  );
}

export default App;
