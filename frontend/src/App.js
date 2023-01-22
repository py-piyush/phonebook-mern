import { useState, useEffect } from "react";
import "./App.css";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import NewPersonForm from "./components/NewPersonForm";
import services from "./services/personService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    services.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addNewNameandNumber = (event) => {
    event.preventDefault();
    const personObj = { name: newName, number: newNumber };
    const check = persons.find((p) => p.name === personObj.name);
    if (check) {
      alert("Person already exist!");
      return;
    }
    services
      .create(personObj)
      .then((returnedPerson) => setPersons(persons.concat(returnedPerson)));
    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (id) => {
    const personToDelete = persons.find((p) => p.id === id);
    const confirm = window.confirm(`Delete "${personToDelete.name}" ?`);
    if (!confirm) return;
    services.deletePerson(id).then(() => {
      setPersons(persons.filter((p) => p.id !== id));
    });
  };

  let displayPerson = persons.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Contacts</h1>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add new</h2>
      <NewPersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addNewNameandNumber={addNewNameandNumber}
      />
      <h2>Numbers</h2>
      <Persons displayPerson={displayPerson} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
