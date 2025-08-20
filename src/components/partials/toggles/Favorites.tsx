import React from 'react';
import { Star } from 'lucide-react';

interface FavoritesToggleProps {
  isActive: boolean;
  favoriteCount: number;
  onClick: () => void;
  className?: string;
}

const FavoritesToggle: React.FC<FavoritesToggleProps> = ({
  isActive,
  favoriteCount,
  onClick,
  className = ""
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-4 py-2 text-xs rounded-lg transition-all duration-200 font-medium cursor-pointer ${
        isActive
          ? 'bg-yellow-500 text-white shadow-lg hover:bg-yellow-600 transform hover:scale-105'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600'
      } ${className}`}
    >
      <Star className={`h-4 w-4 ${isActive ? 'fill-current' : ''}`} />
      <span>
        Favorites {favoriteCount > 0 && `(${favoriteCount})`}
      </span>
    </button>
  );
};

export default FavoritesToggle;