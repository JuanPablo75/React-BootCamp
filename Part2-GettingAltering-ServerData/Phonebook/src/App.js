import React, { useState, useEffect } from "react";

import personService from "./services/persons";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filterQuery, setFilterQuery] = useState("");
    const [message, setMessage] = useState(null);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        personService.getAll().then((initialPersons) => {
            setPersons(initialPersons);
        });
    }, []);

    const handleChange = (setValue) => (event) => setValue(event.target.value);

    const handleAddNewPerson = (event) => {
        event.preventDefault();

        const newPerson = { name: newName, number: newNumber };
        const foundPerson = persons.find((person) => person.name === newName);

        if (foundPerson) {
            if (
                window.confirm(
                    `${newName} is already added to phonebook, replace the old number with a new one?`
                )
            ) {
                personService
                    .update(foundPerson.id, newPerson)
                    .then((returnedPerson) => {
                        setPersons(
                            persons.map((person) =>
                                person.id !== foundPerson.id
                                    ? person
                                    : returnedPerson
                            )
                        );
                        setNewName("");
                        setNewNumber("");
                    })
                    .catch((_error) => {
                        setStatus("error");
                        setMessage(
                            `Information of '${newName}' has already been removed from server`
                        );
                        
                        setTimeout(() => {
                            setMessage(null);
                            setStatus(null);
                        }, 5000);

                        setPersons(
                            persons.filter(
                                (person) => person.id !== foundPerson.id
                            )
                        );
                    });
            }
        } else {
            personService.create(newPerson).then((returnedPerson) => {
                setPersons(persons.concat(returnedPerson));

                setStatus("success");
                setMessage(`Added '${returnedPerson.name}'`);
                setTimeout(() => {
                    setStatus(null);
                    setMessage(null);
                }, 5000);

                setNewName("");
                setNewNumber("");
            });
        }
    };

    const handleRemovePerson = (id, name) => () => {
        if (window.confirm(`Delete ${name}?`)) {
            personService.remove(id).then(() => {
                setPersons(persons.filter((person) => person.name !== name));
            });
        }
    };

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={message} status={status} />
            <Filter
                query={filterQuery}
                handleChange={handleChange(setFilterQuery)}
            />
            <h2>Add a new</h2>
            <PersonForm
                name={newName}
                number={newNumber}
                handleChangeName={handleChange(setNewName)}
                handleChangeNumber={handleChange(setNewNumber)}
                handleAddPerson={handleAddNewPerson}
            />
            <h2>Numbers</h2>
            <Persons
                persons={persons}
                query={filterQuery}
                handleRemovePerson={handleRemovePerson}
            />
        </div>
    );
};

export default App;
