import React, { useEffect, useState } from 'react';
import './MyPokemon.css';
import PokemonThumbnail from './components/PokemonThumbnail';
import SearchBar from './components/SearchBar';
import InfiniteScroll from 'react-infinite-scroll-component'; // Import InfiniteScroll

function MyPokemon() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');
  const [searchQuery, setSearchQuery] = useState('');

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
  };

  useEffect(() => {
    getAllPokemon();
  }, []);

  useEffect(() => {
    console.log(allPokemons);
  }, [allPokemons]);

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
        onSearch={(query) => setSearchQuery(query)}
      />
      <InfiniteScroll
        dataLength={filteredPokemons.length} // This is important to prevent reloading data on component updates
        next={getAllPokemon} // Fetch more data when the user scrolls down
        hasMore={loadMore !== null} // Check if there's more data to load
        loader={<h4>Loading...</h4>} // Loader component
      >
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
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default MyPokemon;
