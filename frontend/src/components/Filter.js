const Filter = ({ filter, setFilter }) => {
  return (
    <div className="search">
      Search:
      <input
        type="text"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
    </div>
  );
};

export default Filter;
