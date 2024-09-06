"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import GridLayout from "@/components/GridLayout";

export default function AutosuggestInput() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [posterUrls, setPosterUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Refs to manage focus and blur events
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Fetch suggestions based on input value
  useEffect(() => {
    if (inputValue) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get(
            "http://127.0.0.1:5000/suggestions",
            {
              params: { query: inputValue },
            }
          );
          setSuggestions(response.data);
          console.log("Fetched suggestions:", response.data); // Debugging
        } catch (err) {
          console.error("Error fetching suggestions", err);
        }
      };

      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  // Fetch recommendations based on input value
  useEffect(() => {
    if (inputValue) {
      const fetchRecommendations = async () => {
        setLoading(true);
        try {
          const response = await axios.get("http://127.0.0.1:5000/recommend", {
            params: { book_name: inputValue },
          });
          const { books, posters } = response.data;
          setRecommendations(books.slice(0, 3)); // Only take the top 3 books
          setPosterUrls(posters.slice(0, 3)); // Only take the top 3 posters
          setError(null);
        } catch (err) {
          setError("Error fetching recommendations");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchRecommendations();
    } else {
      setRecommendations([]);
      setPosterUrls([]);
    }
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow click handling
    setTimeout(() => {
      if (!suggestionsRef.current?.contains(document.activeElement)) {
        setIsFocused(false);
      }
    }, 100);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setSuggestions([]); // Clear suggestions after selection
    setIsFocused(false);
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="w-full flex h-10 w-full rounded-md border dark:border-white border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
      />
      {isFocused && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 bg-white border border-gray-200 p-2 w-full max-h-64 overflow-y-auto z-10 dark:text-black"
          onMouseDown={(e) => e.preventDefault()} // Prevent blur on click
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
      <Button
        className="mt-4 w-full mx-auto"
        onClick={() => {
          // Trigger recommendation fetch when Submit is clicked
          // This is redundant if recommendations are already being fetched on input change
        }}
        disabled={loading}
      >
        {loading ? "Loading..." : "Submit"}
      </Button>

      {error && <p className="text-red-500">{error}</p>}

      {recommendations.length > 0 && (
        <div className="flex flex-row justify-start mt-4 space-x-4">
          <GridLayout
            recommendations={recommendations}
            posterUrls={posterUrls}
          />
        </div>
      )}
    </div>
  );
}
