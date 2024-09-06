"use client";
import { useState } from "react";

interface GridItemProps {
  bookTitle: string;
  posterUrl: string;
}

interface GridLayoutProps {
  recommendations: string[];
  posterUrls: string[];
}

const GridItem: React.FC<GridItemProps> = ({ bookTitle, posterUrl }) => {

  return (
    <div className="max-w-sm p-4 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
      {/* Image Container */}
      <div className="relative mb-4 pb-[100%]">
        {/* Adjust padding-bottom for portrait aspect ratio */}
        <img
          src={posterUrl}
          alt={`Poster of ${bookTitle}`}
          className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
        />
      </div>

      {/* Book Title */}
      <h2 className="text-lg font-bold mb-2">{bookTitle}</h2>
    </div>
  );
};


const GridLayout: React.FC<GridLayoutProps> = ({ recommendations, posterUrls }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 m-8">
      {recommendations.slice(0, 3).map((bookTitle, index) => (
        <GridItem
          key={index}
          bookTitle={bookTitle}
          posterUrl={posterUrls[index] || 'default-image-url.png'} // Provide a default image URL if needed
        />
      ))}
    </div>

  );
};

export default GridLayout;
