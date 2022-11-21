const express = require("express");
const app = express();

app.use(express.json())

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true,
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript ",
        date: "2019-05-30T18:39:34.091Z",
        important: false,
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: true,
    },
];

//access to the root of the server
app.get("/", (request, response) => {
    response.send("<h1>Api Part3 FullStack-BootCamp</h1>");
});

//get all notes
app.get("/api/notes", (request, response) => {
    response.json(notes);
});

//get a single note
app.get("/api/notes/:id", (request, response) => {
    const id = Number(request.params.id);
    const note = notes.find((note) => note.id === id);

    if (note) {
        response.json(note);
    } else {
        response.status(404).end();
    }
});

//delete a note
app.delete("/api/notes/:id", (request, response) => {
    const id = Number(request.params.id);
    notes = notes.filter((note) => note.id !== id);

    response.status(204).end();
});

//create a note
app.post("/api/notes", (request, response) => {
    const note = request.body;
    
    if (!note || !note.content) {
        return response.status(400).json({
            error: "note.content is missing",
        });
    }
    //generate an id
    const ids = notes.map((note) => note.id);
    const maxId = Math.max(...ids);

    const newNote = {
        id: maxId + 1,
        content: note.content,
        important:
            typeof note.important !== "undefined" ? note.important : false,
        date: new Date().toISOString(),
    };

    //add the new note to the notes array
    notes = notes.concat(newNote);

    //send the new note to the client
    response.status(201).json(newNote);
});

app.use((request, response) => {
  response.status(404).json({
    error: 'Not found'
  })
})

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})