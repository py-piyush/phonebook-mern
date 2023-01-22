const Persons = ({ displayPerson, handleDelete }) =>
  displayPerson.map((person) => (
    <p key={person.id}>
      {person.name} {person.number}
      <button onClick={() => handleDelete(person.id)}>Delete</button>
    </p>
  ));

export default Persons;
