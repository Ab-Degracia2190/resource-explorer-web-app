import React, { useState } from 'react';
import type { Pokemon } from '@/base/types/pokemon';
import PrimaryButton from '@/components/partials/buttons/Primary';

interface PokemonDetailProps {
  pokemon: Pokemon;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({
  pokemon,
  onBack,
  isFavorite,
  onToggleFavorite
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="max-w-5xl mx-auto">
      <PrimaryButton
        label="← Back to List"
        onClick={onBack}
        className="mb-8 text-xs md:text-sm !bg-gradient-to-r !from-gray-600 !to-gray-700 hover:!from-gray-700 hover:!to-gray-800"
      />

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="grid lg:grid-cols-2 gap-8 p-8">
          {/* Image Section */}
          <div className="space-y-6">
            <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-inner">
              {pokemon.sprites?.other?.['official-artwork']?.front_default && !imageError ? (
                <>
                  <img
                    src={pokemon.sprites.other['official-artwork'].front_default}
                    alt={pokemon.name}
                    className={`max-w-[80%] max-h-[80%] transition-all duration-500 ${imageLoaded ? 'opacity-100 transform scale-110' : 'opacity-0'}`}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                  />
                  {!imageLoaded && (
                    <div className="w-48 h-48 bg-gray-200 dark:bg-gray-600 rounded-full animate-pulse" />
                  )}
                </>
              ) : (
                <div className="w-48 h-48 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-6xl font-bold text-gray-500 dark:text-gray-400">?</span>
                </div>
              )}
              
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-8 h-8 border-2 border-gray-400 rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 border-2 border-gray-400 rounded-full"></div>
                <div className="absolute top-1/3 right-8 w-4 h-4 border-2 border-gray-400 rounded-full"></div>
              </div>
            </div>
            
            <PrimaryButton
              label={isFavorite ? "💖 Remove from Favorites" : "💖 Add to Favorites"}
              onClick={onToggleFavorite}
              className={`w-full text-xs md:text-sm ${isFavorite 
                ? '!bg-gradient-to-r !from-red-500 !to-pink-500 hover:!from-red-600 hover:!to-pink-600' 
                : '!bg-gradient-to-r !from-gray-500 !to-gray-600 hover:!from-gray-600 hover:!to-gray-700'
              }`}
            />
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <span className="text-xs md:text-sm font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                  #{pokemon.id.toString().padStart(3, '0')}
                </span>
              </div>
              <h1 className="text-xl md:text-4xl font-bold capitalize text-gray-900 dark:text-white mb-4">
                {pokemon.name}
              </h1>

              {pokemon.types && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {pokemon.types.map((type) => (
                    <span
                      key={type.type.name}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold uppercase tracking-wide text-xs md:text-sm shadow-lg"
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Physical Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <h3 className="text-xs md:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Height</h3>
                <p className="text-xs md:text-2xl font-bold text-gray-900 dark:text-white">
                  {pokemon.height ? (pokemon.height / 10).toFixed(1) : '?'} m
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <h3 className="text-xs md:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Weight</h3>
                <p className="text-xs md:text-2xl font-bold text-gray-900 dark:text-white">
                  {pokemon.weight ? (pokemon.weight / 10).toFixed(1) : '?'} kg
                </p>
              </div>
            </div>

            {/* Abilities */}
            {pokemon.abilities && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <h3 className="text-xs md:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Abilities</h3>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((ability, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs md:text-sm bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-gray-500 font-medium capitalize"
                    >
                      {ability.ability.name.replace('-', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Base Stats */}
            {pokemon.stats && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <h3 className="text-xs md:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">Base Stats</h3>
                <div className="space-y-3">
                  {pokemon.stats.map((stat, index) => (
                    <div key={stat.stat.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="capitalize text-gray-700 dark:text-gray-300 font-medium text-xs md:text-sm">
                          {stat.stat.name.replace('-', ' ')}
                        </span>
                        <span className="text-gray-900 dark:text-white font-bold text-xs md:text-sm">
                          {stat.base_stat}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            width: `${Math.min((stat.base_stat / 150) * 100, 100)}%`,
                            animationDelay: `${index * 100}ms`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experience */}
            {pokemon.base_experience && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <h3 className="text-xs md:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Base Experience</h3>
                <p className="text-xs md:text-2xl font-bold text-gray-900 dark:text-white">
                  {pokemon.base_experience} XP
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;