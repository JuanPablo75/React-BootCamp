import { useState, useEffect } from "react";


import { Note } from "./components/Note.js";
import noteService from "./services/notes.js";

function App(props) {
    const [notes, setNotes] = useState(props.notes);
    const [newNote, setNewNote] = useState("");
    const [showAll, setShowAll] = useState(true);

    useEffect(() => {
        noteService
          .getAll()
          .then(initialNotes => {
            setNotes(initialNotes);
          });
    }, []);

    const toggleImportanceOf = (id) => {
        const note = notes.find((n) => n.id === id);
        const changedNote = { ...note, important: !note.important };

        noteService
          .update(id, changedNote)
          .then(returnedNote => {
            setNotes(notes.map((note) => (note.id !== id ? note : returnedNote))
            )
          .catch(error => {
            alert(
              `the note '${note.content}' was already deleted from server`	
            );
            setNotes(notes.filter((n) => n.id !== id));
            });
        });
    };

    const handleInputChange = (event) => {
        setNewNote(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const noteToAddToState = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
        };

        noteService
        .create(noteToAddToState)
        .then(returnedNote => {
            setNotes(notes.concat(returnedNote));
            setNewNote("");
        });
    };

    const handleShowAll = () => setShowAll(() => !showAll);

    if (typeof notes === "undefined" || notes.length === 0) {
        return "There is not notes";
    }

    return (
        <div>
            <h1>Notes</h1>
            <button onClick={() => handleShowAll()}>
                show {showAll ? "important" : "all"}
            </button>
            <ol>
                {notes
                    .filter((note) => {
                        if (showAll === true) return true;
                        return note.important === true;
                    })
                    .map((note) => (
                        <Note
                            key={note.id}
                            note={note}
                            toggleImportance={() => toggleImportanceOf(note.id)}
                        /> //use allways unique keys
                    ))}
            </ol>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={handleInputChange}
                    value={newNote}
                />
                <button>Create note</button>
            </form>
        </div>
    );
}

export default App;
