import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MapPin, Loader2 } from 'lucide-react';
import {
  searchLocations,
  LocationResult,
  normalizeText,
} from '../services/weatherApi';

interface SearchBarProps {
  onSearch: (location: LocationResult) => void;
  isLoading: boolean;
}

export const SearchBar = ({
  onSearch,
  isLoading,
}: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState<LocationResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Prevent dropdown from reopening after selecting a location
  const selectingLocation = useRef(false);
  const isValidCityName = (value: string) => {
  return /^[a-zA-Z\s]+$/.test(value.trim());
};
useEffect(() => {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    setLocations([]);
    setShowDropdown(false);
    return;
  }

  if (selectingLocation.current) {
    selectingLocation.current = false;
    return;
  }

  // Don't search invalid city names
  if (!isValidCityName(trimmedQuery)) {
    setLocations([]);
    setShowDropdown(true);
    return;
  }

  const timer = setTimeout(async () => {
    setIsSearching(true);

    try {
      const results = await searchLocations(trimmedQuery);

      setLocations(results);
      setShowDropdown(true);
    } finally {
      setIsSearching(false);
    }
  }, 350);

  return () => clearTimeout(timer);
}, [query]);

  // ==========================================
  // SUBMIT SEARCH
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const city = query.trim();

  if (!city || isLoading) {
    return;
  }

  setIsSearching(true);

  try {
    const results = await searchLocations(city);

    if (results.length === 0) {
      setLocations([]);
      setShowDropdown(true);
      return;
    }

    // Normalize the user's search
    const normalizedCity = normalizeText(city);

    // First try exact name match
    const exactMatch = results.find(
      (location) =>
        normalizeText(location.name) === normalizedCity
    );

    // Use exact match if available,
    // otherwise use the best result returned by the API.
    const selectedLocation = exactMatch || results[0];

    setShowDropdown(false);
    setLocations([]);

    onSearch(selectedLocation);

  } finally {
    setIsSearching(false);
  }
};

  // ==========================================
  // SELECT LOCATION FROM DROPDOWN
  // ==========================================

  const handleLocationSelect = (location: LocationResult) => {
    selectingLocation.current = true;
    setQuery(location.name);
    setShowDropdown(false);
    setLocations([]);
    onSearch(location);
  };

  // ==========================================
  // CLEAR SEARCH
  // ==========================================

  const handleClear = () => {
    setQuery('');
    setLocations([]);
    setShowDropdown(false);
    selectingLocation.current = false;
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto mb-8 px-1 sm:px-0"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.1,
      }}
    >
      <div className="relative group">

        {/* ==========================================
            GLOW
        ========================================== */}

        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-light-primary/20 to-blue-400/20 dark:from-dark-primary/20 dark:to-blue-300/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />

        {/* ==========================================
            SEARCH AREA
        ========================================== */}

        <div className="relative">

          <div className="relative flex items-center w-full min-w-0 glass-strong rounded-2xl p-2 shadow-lg transition-all duration-300 group-focus-within:shadow-xl group-focus-within:shadow-light-primary/20 dark:group-focus-within:shadow-dark-primary/20">

            {/* Search Icon */}
            <Search className="w-5 h-5 shrink-0 text-light-textSecondary dark:text-dark-textSecondary ml-2 sm:ml-3" />

            {/* ==========================================
                INPUT
            ========================================== */}

            <input
              type="text"
              value={query}
              onChange={(e) => {
  const value = e.target.value;

  // Allow only letters and spaces
  if (value === '' || /^[a-zA-Z\s]*$/.test(value)) {
    setQuery(value);
    setShowDropdown(true);

    selectingLocation.current = false;
  }
}}
              onFocus={() => {
                if (locations.length > 0) {
                  setShowDropdown(true);
                }
              }}
              placeholder="Search for a city..."
              className="flex-1 min-w-0 w-full px-2 sm:px-4 py-3 bg-transparent border-none outline-none text-light-text dark:text-dark-text placeholder-light-textSecondary/50 dark:placeholder-dark-textSecondary/50 text-sm sm:text-base"
              disabled={isLoading}
              aria-label="Search city"
              autoComplete="off"
            />

            {/* ==========================================
                LOCATION SEARCH LOADING
            ========================================== */}

            {isSearching && (
              <Loader2 className="w-5 h-5 mr-2 text-light-primary dark:text-dark-primary animate-spin shrink-0" />
            )}

            {/* ==========================================
                CLEAR BUTTON
            ========================================== */}

            {query && !isSearching && (
              <motion.button
                type="button"
                onClick={handleClear}
                className="p-2 shrink-0 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={isLoading}
                aria-label="Clear search"
              >
                <X className="w-4 h-4 text-light-textSecondary dark:text-dark-textSecondary" />
              </motion.button>
            )}

            {/* ==========================================
                SEARCH BUTTON
            ========================================== */}

            <motion.button
              type="submit"
              disabled={
                isLoading ||
                !query.trim()
              }
              className="shrink-0 px-4 sm:px-6 py-3 text-sm sm:text-base bg-gradient-to-r from-light-primary to-blue-500 dark:from-dark-primary dark:to-blue-400 text-white rounded-xl font-medium shadow-lg shadow-light-primary/30 dark:shadow-dark-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-xl hover:shadow-light-primary/40 dark:hover:shadow-dark-primary/40 hover:-translate-y-0.5 active:translate-y-0"
              whileHover={{
                scale:
                  !isLoading && query.trim()
                    ? 1.02
                    : 1,
              }}
              whileTap={{
                scale:
                  !isLoading && query.trim()
                    ? 0.98
                    : 1,
              }}
            >
              {isLoading
                ? 'Searching...'
                : 'Search'}
            </motion.button>

          </div>

          {/* ==========================================
              LOCATION DROPDOWN
          ========================================== */}

          <AnimatePresence>
            {showDropdown && query.trim() && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -8,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -8,
                  scale: 0.98,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="absolute z-50 left-0 right-0 top-full mt-2 overflow-hidden rounded-2xl glass-strong border border-white/30 dark:border-white/10 shadow-2xl"
              >

                {/* ==========================================
                    SEARCHING
                ========================================== */}

                {isSearching ? (
                  <div className="flex items-center justify-center gap-2 px-4 py-5 text-sm text-light-textSecondary dark:text-dark-textSecondary">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Searching locations...
                  </div>

                ) : locations.length > 0 ? (

                  /* ==========================================
                     LOCATION RESULTS
                  ========================================== */

                  <div className="py-2 max-h-80 overflow-y-auto">

                    {locations.map((location) => (
                      <motion.button
                        key={`${location.id}-${location.latitude}-${location.longitude}`}
                        type="button"
                        onClick={() =>
                          handleLocationSelect(location)
                        }
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                        whileHover={{
                          x: 3,
                        }}
                      >

                        {/* Location Icon */}
                        <div className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center bg-slate-300/80 dark:bg-slate-900/70 border border-slate-400/50 dark:border-white/10 shadow-md">

                          <MapPin className="w-5 h-5 text-light-primary dark:text-dark-primary" />

                        </div>

                        {/* Location Details */}
                        <div className="flex-1 min-w-0">

                          {/* City */}
                          <p className="font-semibold text-sm sm:text-base text-light-text dark:text-dark-text truncate">
                            {location.name}
                          </p>

                          {/* State + Country */}
                          <p className="text-xs sm:text-sm text-light-textSecondary dark:text-dark-textSecondary truncate">
                            {location.admin1
                              ? `${location.admin1}, `
                              : ''}
                            {location.country}
                          </p>

                        </div>

                        {/* Country Code */}
                        <span className="shrink-0 text-xs font-semibold px-2 py-1 rounded-lg bg-black/5 dark:bg-white/10 text-light-textSecondary dark:text-dark-textSecondary">
                          {location.country_code}
                        </span>

                      </motion.button>
                    ))}

                  </div>

                ) : (

                  /* ==========================================
                     NO RESULTS
                  ========================================== */

                  <div className="px-4 py-5 text-center">

                    <MapPin className="w-6 h-6 mx-auto mb-2 text-light-textSecondary/50 dark:text-dark-textSecondary/50" />

                    <p className="text-sm font-medium text-light-text dark:text-dark-text">
                      No locations found
                    </p>

                    <p className="text-xs mt-1 text-light-textSecondary dark:text-dark-textSecondary">
                      Try another city name
                    </p>

                  </div>
                )}

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </motion.form>
  );
};