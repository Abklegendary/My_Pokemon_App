import './SearchBar.css';
function SearchBar({ searchQuery, onSearch }) {
    return (
      <form className="search-form">
        <input
          className="search-input"
          type="text"
          placeholder="Search pokemon..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
        />
      </form>
    );
  }
  
  export default SearchBar;
  