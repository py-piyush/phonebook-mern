const Persons = ({ displayPerson, handleDelete }) => (
  <div className="contacts">
    {displayPerson.map((person) => (
      <div className="contact" key={person.id}>
        <p>{person.name}</p>
        <p>{person.number}</p>

        <button className="btn delete" onClick={() => handleDelete(person.id)}>
          Delete
        </button>
      </div>
    ))}
  </div>
);

export default Persons;
