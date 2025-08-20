import type { Pokemon, PokemonListResponse } from '../types/pokemon';

// Pokemon API functions
const API_BASE = 'https://pokeapi.co/api/v2';

export async function fetchPokemonList(offset: number = 0, limit: number = 20): Promise<PokemonListResponse> {
  const response = await fetch(`${API_BASE}/pokemon?offset=${offset}&limit=${limit}`);
  if (!response.ok) throw new Error('Failed to fetch Pokemon list');
  return response.json();
}

export async function fetchPokemon(idOrName: string | number): Promise<Pokemon> {
  const response = await fetch(`${API_BASE}/pokemon/${idOrName}`);
  if (!response.ok) throw new Error('Failed to fetch Pokemon details');
  const data = await response.json();
  return {
    ...data,
    id: data.id,
    name: data.name,
    url: `${API_BASE}/pokemon/${data.id}`
  };
}

export function getPokemonIdFromUrl(url: string): number {
  const matches = url.match(/\/(\d+)\//);
  return matches ? parseInt(matches[1]) : 0;
}