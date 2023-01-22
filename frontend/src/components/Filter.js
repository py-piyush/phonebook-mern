const Filter = ({ filter, setFilter }) => {
  return (
    <>
      Search:
      <input
        type="text"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
    </>
  );
};

export default Filter;
