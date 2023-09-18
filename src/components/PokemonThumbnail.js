import React from 'react';
import { Link } from 'react-router-dom';
import './PokemonThumbnails.css'

function PokemonThumbnail({ id, name, image, type }) {
  const typeClass= `type-${type.toLowerCase()}`
  return (

    <div className={`thumbnail-container ${typeClass}`}>
    <Link to={`/pokemon/${id}`}>
        <img  className='thumbnail-image' src={image} alt={name} />
      </Link>
        <h3>00{id}</h3>
        <h3 className='thumbnail-name' >{name}</h3>
        <p className='thumbnail-type' >Type: {type}</p>
    
    </div>
  );
}

export default PokemonThumbnail;
