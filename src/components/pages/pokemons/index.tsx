import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import type { Pokemon } from '@/base/types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
  onSelect: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  onSelect,
  isFavorite,
  onToggleFavorite
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-gray-200 dark:border-gray-700">
      <div onClick={onSelect} className="p-6">
        <div className="aspect-square mb-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">
          {pokemon.sprites?.front_default && !imageError ? (
            <>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className={`w-20 h-20 transition-all duration-300 ${imageLoaded ? 'opacity-100 transform scale-110' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
              {!imageLoaded && (
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-600 rounded-full animate-pulse" />
              )}
            </>
          ) : (
            <div className="w-20 h-20 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-500 dark:text-gray-400">
                ?
              </span>
            </div>
          )}
          
          {/* Pokemon ID badge */}
          <div className="absolute top-2 right-2 bg-black/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-mono">
            #{pokemon.id}
          </div>
        </div>

        <h3 className="font-bold text-lg capitalize text-gray-900 dark:text-white mb-3 text-center">
          {pokemon.name}
        </h3>

        {pokemon.types && (
          <div className="flex flex-wrap gap-1 justify-center">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 font-medium uppercase tracking-wide"
              >
                {type.type.name}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="px-6 pb-6">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className={`cursor-pointer text-xs w-full flex items-center justify-center gap-2 py-3 rounded-lg transition-all duration-200 font-medium ${
            isFavorite
              ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 shadow-lg transform hover:scale-105'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600'
          }`}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          {isFavorite ? 'Favorited' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;