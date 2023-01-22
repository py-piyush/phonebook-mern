const NewPersonForm = (props) => {
  return (
    <form onSubmit={props.addNewNameandNumber}>
      <label htmlFor="name">Name: </label>
      <input
        type="text"
        id="name"
        name="name"
        value={props.newName}
        onChange={(event) => props.setNewName(event.target.value)}
      />
      <label htmlFor="number">Number: </label>
      <input
        type="text"
        id="number"
        name="number"
        value={props.newNumber}
        onChange={(event) => props.setNewNumber(event.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default NewPersonForm;
