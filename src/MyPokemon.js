import { useEffect, useState } from 'react';
import './MyPokemon.css';
import PokemonThumbnail from "./components/PokemonThumbnail";
import SearchBar from "./components/SearchBar";

function MyPokemon() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]); // New state for filtered Pokémon
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query

  const getAllPokemon = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next);

    function createPokemonObject(result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        const data = await res.json();

        setAllPokemons((currentList) => [...currentList, data]);
      });
    }
    createPokemonObject(data.results);
    await console.log(allPokemons)
  };

  useEffect(() => {
    getAllPokemon();
  }, []);

  useEffect(() => {
    console.log(allPokemons);
  }, [allPokemons]);

  // Filter Pokémon based on the search query
  useEffect(() => {
    const filtered = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPokemons(filtered);
  }, [allPokemons, searchQuery]);

  return (
    <div className="app-container">
      <h1>Pokemon Evolution</h1>
      <SearchBar
        searchQuery={searchQuery}
        onSearch={(query) => setSearchQuery(query)} // Update searchQuery state
      />
      <div className="pokemon-container">
        <div className="all-container">
          {filteredPokemons.map((pokemon, index) => (
            <PokemonThumbnail
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.sprites.other.dream_world.front_default}
              type={pokemon.types[0].type.name}
              key={index}
            />
          ))}
        </div>
        <button className="load-more" onClick={getAllPokemon}>
          <b>Load more</b>
        </button>
      </div>
    </div>
  );
}

export default MyPokemon;
