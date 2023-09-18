import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PokemonDetails.css'


function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
   // Define a function to fetch Pokémon data by ID
   async function fetchPokemonData() {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!response.ok) {
        throw new Error('Pokemon not found');
      }
      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      console.error(`Error fetching Pokémon data: ${error.message}`);
    }
  }

  // Call the fetchPokemonData function to load data when the component mounts
  fetchPokemonData();
  console.log(pokemon)
}, [id]);

if (!pokemon) {
  return <div>Loading...</div>;
}

const { name, image, types, species, sprites, height, weight, abilities, base_experience, stats } = pokemon;
       let newheight = height / 3.28084;
       let Newheight= Math.round(newheight);
       let newweight = weight * 0.2204622622 ;
       let Newweight = Number(newweight.toFixed(1))
    return (
      <div className='pokemon-details'>
        <h1>Pokemon Details</h1> 
        {pokemon.sprites.other.dream_world.front_default && (
        <img
          className='pokemon-image'
          src={pokemon.sprites.other.dream_world.front_default}
          alt={`${name} sprite`}
        />
      )}
      <br />
      <br />
      <div className='pokemon-name'>
        <h1>Name: {name}</h1>
        <h2> 00{id}</h2>
      </div>
      <br />
        <div className='pokemon-type'>
        <h2>Type </h2>
        <ul>
          {types.map((type) => (
            <h3 key={type.type.name} >
              {type.type.name} {type.name}
            </h3>
          ))}
        </ul>
        </div>
        
        <br/>
        <div className='pokemon-sprites'>
          <h2>Sprites</h2>
          <ul>
            <h3>Front_Default</h3>
            <img className='front-image' src={sprites.front_default} alt='front_default' />
            <h3>Front_Shiny</h3>
            <img className='front-shiny' src={sprites.front_shiny} alt='front_shiny' />
            <h3>Back_Default: </h3> 
            <img className='back-image' src={sprites.back_default} alt='back_default'  />
            <h3>Back_shiny</h3>
            <img className='back-shiny' src={sprites.back_shiny} alt='back_shiny' />
          </ul>
        </div>
        <br />
        <div className='pokemon-ability'>
          <h2>Abilities</h2>
          <ul>
            {abilities.map((ability) => (
              <h3 key={ability.ability.name} >
                {ability.ability.name}{ability.name}
              </h3>
            ))}
          </ul>
        </div>
        <h3 className='pokemon-specie'>Specie: {species.name} </h3>
        <br />
        <div className='pokemon-body'>
          <h3>Height: {Newheight} ft</h3>
          <h3>Weight: {Newweight} lbs</h3>
        </div>
        <h3 className='pokemon-base'>Base Experience: {base_experience}</h3>
        <br />
        <div className='pokemon-stats'>
          <h2>Stats</h2>
          <ul>
            {stats.map((stat) => (
              <h3 key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </h3>
            ))}
          </ul>
        </div>
        {/* Add more details here */}
      </div>
    );
  }
  
  export default PokemonDetails;
  