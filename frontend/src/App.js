import { useState, useEffect } from "react";
import "./App.css";
import Persons from "./components/Persons";
import getAll from "./services/personService";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    getAll().then((initialPersons) => {
      console.log(initialPersons);
      setPersons(initialPersons);
    });
  }, []);
  return (
    <div>
      <h1>Contacts</h1>
      <h2>Numbers</h2>
      <Persons displayPerson={persons} />
    </div>
  );
};

export default App;
