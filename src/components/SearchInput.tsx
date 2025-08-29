'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface Props {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar(props:Props){
  const { onSearch, placeholder = "Search products..." }=props;
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(query);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query, onSearch]);

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="relative w-[30vw]">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
}