import React, { useState, useEffect } from 'react';
import { Home, RotateCcw } from 'lucide-react';

interface Pokemon {
  name: string;
  emoji: string;
  color: string;
}

const NotFoundPage: React.FC = () => {
  const [currentPokemon, setCurrentPokemon] = useState<number>(0);
  const [isFloating, setIsFloating] = useState<boolean>(true);

  const pokemons: Pokemon[] = [
    { name: 'Pikachu', emoji: '⚡', color: 'text-yellow-400' },
    { name: 'Charmander', emoji: '🔥', color: 'text-red-400' },
    { name: 'Squirtle', emoji: '💧', color: 'text-blue-400' },
    { name: 'Bulbasaur', emoji: '🌱', color: 'text-green-400' },
    { name: 'Jigglypuff', emoji: '🎵', color: 'text-pink-400' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPokemon((prev) => (prev + 1) % pokemons.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [pokemons.length]);

  const handleGoHome = (): void => {
    // In a real app, this would navigate to home
    window.location.href = '/';
  };

  const handleTryAgain = (): void => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background Stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Pokeball */}
      <div
        className={`absolute top-10 right-10 w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg ${
          isFloating ? 'animate-bounce' : ''
        } cursor-pointer transition-transform hover:scale-110`}
        onClick={() => setIsFloating(!isFloating)}
      >
        <div className="w-full h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-t-full"></div>
        <div className="w-full h-1 bg-gray-800"></div>
        <div className="w-full h-7 bg-gradient-to-br from-gray-100 to-gray-200 rounded-b-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-100"></div>
      </div>

      <div className="text-center z-10 max-w-2xl mx-auto">
        {/* Main Content */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-bold text-white mb-4 tracking-wider drop-shadow-2xl">
            4
            <span className="inline-block animate-spin text-yellow-400">0</span>
            4
          </div>
          
          {/* Pokemon Element */}
          <div className="mb-6">
            <div className="text-6xl mb-4 animate-pulse">
              {pokemons[currentPokemon].emoji}
            </div>
            <div className={`text-2xl font-semibold ${pokemons[currentPokemon].color} mb-2 transition-colors duration-500`}>
              A wild {pokemons[currentPokemon].name} appeared!
            </div>
          </div>

          <div className="text-gray-200 text-lg mb-2">
            But the page you're looking for has fainted...
          </div>
          <div className="text-gray-300 text-base mb-8">
            It seems this page escaped from the tall grass!
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleGoHome}
            className="cursor-pointer group flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 hover:scale-105"
          >
            <Home className="w-5 h-5 group-hover:animate-pulse" />
            Return to Pokemon Center
          </button>
          
          <button
            onClick={handleTryAgain}
            className="cursor-pointer group flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 hover:scale-105"
          >
            <RotateCcw className="w-5 h-5 group-hover:animate-spin" />
            Try Again
          </button>
        </div>

        {/* Fun Message */}
        <div className="mt-8 text-gray-400 text-sm">
          <p className="animate-pulse">
            💫 Tip: Click the Pokeball above to stop it from bouncing! 💫
          </p>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>
  );
};

export default NotFoundPage;