import { useState, useEffect } from "react";
import "./App.css";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import NewPersonForm from "./components/NewPersonForm";
import Notification from "./components/Notification";
import services from "./services/personService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    services.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const notify = (message, type) => {
    setMsg({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setMsg(null);
    }, 3000);
  };

  const addNewNameandNumber = (event) => {
    event.preventDefault();
    const personObj = { name: newName, number: newNumber };
    const check = persons.find((p) => p.name === personObj.name);
    if (check) {
      if (
        window.confirm(
          `${check.name} already exists. Do you want to update the number for ${check.name}?`
        )
      ) {
        updateNumber(check.id);
        return;
      }
    }
    services
      .create(personObj)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        notify(`${returnedPerson.name} added successfully!`, "success");
      })
      .catch((error) => {
        notify(error.response.data.error, "error");
        console.log(error.response.data.error);
      });
    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (id) => {
    const personToDelete = persons.find((p) => p.id === id);
    const confirm = window.confirm(`Delete "${personToDelete.name}" ?`);
    if (!confirm) return;
    services
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== id));
        notify(`${personToDelete.name} deleted successfully!`, "success");
      })
      .catch((error) => {
        notify(error.response.data.error, "error");
      });
  };

  const updateNumber = (id) => {
    const updatePerson = persons.find((p) => p.id === id);
    const changedNumber = { ...updatePerson, number: newNumber };
    services
      .update(id, changedNumber)
      .then((returnedPerson) => {
        setPersons(persons.map((p) => (p.id === id ? returnedPerson : p)));
        notify(`Phone number updated for ${returnedPerson.name}`, "success");
      })
      .catch((error) => {
        notify(error.response.data.error, "error");
      });
    setNewName("");
    setNewNumber("");
  };

  let displayPerson = persons.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <Notification message={msg} />
      <h2>Add new</h2>
      <NewPersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addNewNameandNumber={addNewNameandNumber}
      />
      <h2>Contact List</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <Persons displayPerson={displayPerson} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
