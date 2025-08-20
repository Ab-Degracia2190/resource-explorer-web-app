import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import type { Pokemon } from '@/base/types/pokemon';
import { fetchPokemon } from '@/base/services/pokemonApi';
import { useFavorites, useTheme } from '@/base/hooks/pokemon';
import PrimaryLoader from '@/components/partials/loaders/Primary';
import PrimaryButton from '@/components/partials/buttons/Primary';
import PokemonDetail from './Details';
import ErrorMessage from '@/components/pages/errors/pokemon-searches/NotAvailable';

const PokemonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [favorites, toggleFavorite] = useFavorites();
  const [isDark, toggleTheme] = useTheme();
  
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      if (!id) {
        navigate('/');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const pokemonData = await fetchPokemon(id);
        setPokemon(pokemonData);
      } catch (err) {
        setError('Failed to load Pokemon details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [id, navigate]);

  const handleBack = () => {
    // Go back to the previous page or home
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <PrimaryLoader size="lg" />
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-full p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">Pokemon Explorer</h1>
            <PrimaryButton
              label={isDark ? <Sun /> : <Moon />}
              onClick={toggleTheme}
              className="!bg-gradient-to-r !from-gray-600 !to-gray-700 hover:!from-gray-700 hover:!to-gray-800 !p-3 !rounded-full"
            />
          </div>
          <ErrorMessage 
            message={error || 'Pokemon not found'} 
            onRetry={() => window.location.reload()} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">Pokemon Explorer</h1>
          <PrimaryButton
            label={isDark ? <Sun /> : <Moon />}
            onClick={toggleTheme}
            className="!bg-gradient-to-r !from-gray-600 !to-gray-700 hover:!from-gray-700 hover:!to-gray-800 !p-3 !rounded-full"
          />
        </div>
        
        <PokemonDetail
          pokemon={pokemon}
          onBack={handleBack}
          isFavorite={favorites.has(pokemon.id)}
          onToggleFavorite={() => toggleFavorite(pokemon.id)}
        />
      </div>
    </div>
  );
};

export default PokemonDetailPage;