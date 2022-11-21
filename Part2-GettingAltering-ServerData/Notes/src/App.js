
import { Note } from "./Note.js";
import { useEffect, useState } from "react";
import React from "react";
import { getAllNotes } from "./services/notes/getAllNotes";
import { createNote } from "./services/createNote";

function App(props) {
  //STATES
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getAllNotes().then((notes) => {
      setNotes(notes);
      setLoading(false);
    });
  }, 1000);

//NewNote Setter by event => input text => newNote
  const handleInputChange = (event) => {
    setNewNote(event.target.value);
  };

//Submit button handler
  const handleSubmit = (event) => {
    event.preventDefault(); // -> prevent submit default reload page

    const noteToAddToState = {
      userId: 1,
      title: newNote,
      body: newNote,
    };

    createNote(noteToAddToState).then((newNote) => {
      setNotes((prevNotes) => prevNotes.concat(newNote));
    });

    console.log(noteToAddToState);
    setNewNote(""); // reset input
  };

  /*if (typeof !notes) {
    return <h2>There is not notes</h2>;
  }
  */

  return (
    <div>
      <h1>Notes</h1>
      {loading ? "Loading..." : ""}
      <ol>
        {notes.map((note) => (
          <Note key={note.id} title={note.title} body={note.body} />
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
