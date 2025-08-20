import React from 'react';
import { SortAsc } from 'lucide-react';

interface SortOption {
  value: string;
  label: string;
}

interface SortInputProps {
  value: string;
  onChange: (value: string) => void;
  options: SortOption[];
  className?: string;
}

const SortInput: React.FC<SortInputProps> = ({
  value,
  onChange,
  options,
  className = ""
}) => {
  return (
    <div className={`relative ${className}`}>
      <SortAsc className="absolute left-3 top-4 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-xs pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none cursor-pointer"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {/* Custom dropdown arrow */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default SortInput;