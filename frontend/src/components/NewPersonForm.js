const NewPersonForm = (props) => {
  return (
    <form onSubmit={props.addNewNameandNumber}>
      <div className="txt_field">
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={props.newName}
          onChange={(event) => props.setNewName(event.target.value)}
        />
      </div>
      <div className="txt_field">
        <label htmlFor="number">Number: </label>
        <input
          type="text"
          id="number"
          name="number"
          value={props.newNumber}
          onChange={(event) => props.setNewNumber(event.target.value)}
        />
      </div>

      <button className="btn add" type="submit">
        Add
      </button>
    </form>
  );
};

export default NewPersonForm;
