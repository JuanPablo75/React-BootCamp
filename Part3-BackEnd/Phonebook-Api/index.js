const express = require("express");
const app = express();
const logger = require("./loggerMiddleware");

app.use(express.json());
app.use(logger);

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1,
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2,
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3,
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4,
    },
];

app.get("/", (request, response) => {
    response.send("<h1>PhoneBook Api-REST</h1>");
});

app.get("/info", (request, response) => {
    const responseText = `
    <h1>Phonebook Api-REST</h1>
    <p>Has info for ${persons.length} people</p>
    ${new Date()}
    `;
    response.send(responseText);
});

app.get("/api/persons", (request, response) => {
    response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find((person) => person.id === id);

    if (person) {
        response.json(person);
    } else {
        unknownEndpoint(request, response);
    }
});

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter((person) => person.id !== id);

    response.status(204).end();
});

app.post("/api/persons", (request, response) => {
    const person = request.body;

    if (!person || !person.name || !person.number) {
        return response.status(400).json({
            error: "person.name or person.number is missing",
        });
    }

    const foundPerson = persons.find((p) => p.name === request.body.name);

    if (foundPerson) {
        return response.status(400).json({
            error: "name must be unique",
        });
    }

    const ids = persons.map((person) => person.id);
    const maxId = Math.max(...ids);

    const newPerson = {
        id: maxId + 1,
        name: person.name,
        number: person.number,
        //date: new Date().toISOString(),
    };

    persons = persons.concat(newPerson);

    response.status(201).json(newPerson);
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
