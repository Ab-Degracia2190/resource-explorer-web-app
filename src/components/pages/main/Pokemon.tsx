import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sun, Moon } from 'lucide-react';

// Types
import type { Pokemon } from '@/base/types/pokemon';

// Hooks
import { useURLState, useDebounce, useFavorites, useTheme } from '@/base/hooks/pokemon';

// Services
import { fetchPokemonList, fetchPokemon, getPokemonIdFromUrl } from '@/base/services/pokemonApi';

// Components
import PrimaryLoader from '@/components/partials/loaders/Primary';
import PrimaryButton from '@/components/partials/buttons/Primary';
import SearchInput from '@/components/partials/inputs/Search';
import FilterInput from '@/components/partials/inputs/Filter';
import SortInput from '@/components/partials/inputs/Sort';
import FavoritesToggle from '@/components/partials/toggles/Favorites';
import PokemonCard from '@/components/pages/pokemons/index';
import Pagination from '@/components/partials/paginations/Pagination';
import ErrorMessage from '@/components/pages/errors/pokemon-searches/NotAvailable';

function Pokemon() {
  const navigate = useNavigate();
  const [urlParams, updateURL] = useURLState();
  const [favorites, toggleFavorite] = useFavorites();
  const [isDark, toggleTheme] = useTheme();
  
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [searchInput, setSearchInput] = useState(urlParams.q);
  
  const debouncedSearch = useDebounce(searchInput, 300);
  
  const pokemonTypes = useMemo(() => [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison',
    'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
  ], []);

  const sortOptions = useMemo(() => [
    { value: 'id', label: 'Sort by ID' },
    { value: 'name', label: 'Sort by Name' },
    { value: 'height', label: 'Sort by Height' },
    { value: 'weight', label: 'Sort by Weight' }
  ], []);

  // Fetch Pokemon list
  const fetchData = useCallback(async (abortController?: AbortController) => {
    try {
      setLoading(true);
      setError(null);
      
      const offset = (urlParams.page - 1) * 20;
      const data = await fetchPokemonList(offset, 20);
      
      if (abortController?.signal.aborted) return;
      
      // Fetch detailed data for each Pokemon
      const detailedPokemon = await Promise.all(
        data.results.map(async (p) => {
          const id = getPokemonIdFromUrl(p.url);
          try {
            return await fetchPokemon(id);
          } catch (err) {
            return {
              id,
              name: p.name,
              url: p.url
            };
          }
        })
      );
      
      if (abortController?.signal.aborted) return;
      
      setPokemon(detailedPokemon);
      setTotalCount(data.count);
    } catch (err) {
      if (!abortController?.signal.aborted) {
        setError('Failed to load Pokemon data. Please check your connection and try again.');
      }
    } finally {
      if (!abortController?.signal.aborted) {
        setLoading(false);
      }
    }
  }, [urlParams.page]);

  // Update search in URL when debounced value changes
  useEffect(() => {
    if (debouncedSearch !== urlParams.q) {
      updateURL({ q: debouncedSearch, page: 1 });
    }
  }, [debouncedSearch, urlParams.q, updateURL]);

  // Fetch data when URL params change
  useEffect(() => {
    const abortController = new AbortController();
    fetchData(abortController);
    return () => abortController.abort();
  }, [fetchData]);

  // Filter and sort Pokemon
  const filteredAndSortedPokemon = useMemo(() => {
    let filtered = [...pokemon];

    // Search filter
    if (urlParams.q) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(urlParams.q.toLowerCase()) ||
        p.id.toString().includes(urlParams.q)
      );
    }

    // Type filter
    if (urlParams.type) {
      filtered = filtered.filter(p => 
        p.types?.some(t => t.type.name === urlParams.type)
      );
    }

    // Favorites filter
    if (urlParams.favorites) {
      filtered = filtered.filter(p => favorites.has(p.id));
    }

    // Sort
    filtered.sort((a, b) => {
      switch (urlParams.sort) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'height':
          return (b.height || 0) - (a.height || 0);
        case 'weight':
          return (b.weight || 0) - (a.weight || 0);
        default:
          return a.id - b.id;
      }
    });

    return filtered;
  }, [pokemon, urlParams.q, urlParams.type, urlParams.favorites, urlParams.sort, favorites]);

  const totalPages = Math.ceil(totalCount / 20);

  // Handle clear filters
  const handleClearFilters = () => {
    setSearchInput('');
    updateURL({ q: '', type: '', favorites: false, page: 1 });
  };

  // Handle Pokemon selection - navigate to detail page
  const handlePokemonSelect = (pokemon: Pokemon) => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
      <div className="w-full p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center justify-between w-full md:w-auto">
            <div>
              <h1 className="text-lg md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Pokemon Explorer
              </h1>
              <p className="text-xs md:text-lg text-gray-600 dark:text-gray-400">
                Discover and explore the world of Pokemon
              </p>
            </div>
            {/* Theme toggle button - inline on mobile, separate on desktop */}
            <div className="md:hidden">
              <PrimaryButton
                label={isDark ? <Sun /> : <Moon />}
                onClick={toggleTheme}
                className="!bg-gradient-to-r !from-gray-600 !to-gray-700 hover:!from-gray-700 hover:!to-gray-800 !p-3 !rounded-full"
              />
            </div>
          </div>
          {/* Theme toggle button - separate on desktop */}
          <div className="hidden md:block">
            <PrimaryButton
              label={isDark ? <Sun /> : <Moon />}
              onClick={toggleTheme}
              className="!bg-gradient-to-r !from-gray-600 !to-gray-700 hover:!from-gray-700 hover:!to-gray-800 !p-3 !rounded-full"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
            <SearchInput
              value={searchInput}
              onChange={setSearchInput}
              placeholder="Search Pokemon..."
            />

            <FilterInput
              value={urlParams.type}
              onChange={(type) => updateURL({ type, page: 1 })}
              options={pokemonTypes}
              placeholder="All Types"
            />

            <SortInput
              value={urlParams.sort}
              onChange={(sort) => updateURL({ sort })}
              options={sortOptions}
            />

            <FavoritesToggle
              isActive={urlParams.favorites}
              favoriteCount={favorites.size}
              onClick={() => updateURL({ favorites: !urlParams.favorites, page: 1 })}
            />
          </div>

          {(urlParams.q || urlParams.type || urlParams.favorites) && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <PrimaryButton
                label="Clear All Filters"
                onClick={handleClearFilters}
                className="!bg-gradient-to-r !from-gray-500 !to-gray-600 hover:!from-gray-600 hover:!to-gray-700 !py-2 !px-4 !text-sm"
              />
            </div>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-16">
            <PrimaryLoader size="lg" />
          </div>
        ) : error ? (
          <ErrorMessage 
            message={error} 
            onRetry={() => fetchData()} 
          />
        ) : filteredAndSortedPokemon.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Pokemon Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {urlParams.q || urlParams.type || urlParams.favorites 
                ? 'Try adjusting your filters or search terms'
                : 'No Pokemon data available'
              }
            </p>
            {(urlParams.q || urlParams.type || urlParams.favorites) && (
              <PrimaryButton
                label="Clear Filters"
                onClick={handleClearFilters}
                className="!bg-gradient-to-r !from-blue-500 !to-purple-500"
              />
            )}
          </div>
        ) : (
          <>
            {/* Results Info */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-lg">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {filteredAndSortedPokemon.length}
                </span>
                {' '}Pokemon found
                {(urlParams.q || urlParams.type || urlParams.favorites) && (
                  <span className="ml-2 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                    filtered
                  </span>
                )}
              </p>
            </div>

            {/* Pokemon Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {filteredAndSortedPokemon.map((p) => (
                <PokemonCard
                  key={p.id}
                  pokemon={p}
                  onSelect={() => handlePokemonSelect(p)}
                  isFavorite={favorites.has(p.id)}
                  onToggleFavorite={() => toggleFavorite(p.id)}
                />
              ))}
            </div>

            {/* Pagination */}
            {!urlParams.q && !urlParams.type && !urlParams.favorites && (
              <Pagination
                currentPage={urlParams.page}
                totalPages={totalPages}
                onPageChange={(page) => updateURL({ page })}
                className="mb-8"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Pokemon;