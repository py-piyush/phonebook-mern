import { useState, useEffect } from "react";
import "./App.css";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import getAll from "./services/personService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  let displayPerson = persons.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Contacts</h1>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Numbers</h2>
      <Persons displayPerson={displayPerson} />
    </div>
  );
};

export default App;
