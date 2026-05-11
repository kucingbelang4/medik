'use client';

import React from 'react';

interface SearchResultItemProps {
  id: string;
  title: string;
  description: string;
  category: 'Medicine' | 'Illness';
  tags: string[];
  source: string;
}

export function SearchResultItem({ 
  id, 
  title, 
  description, 
  category, 
  tags,
  source 
}: SearchResultItemProps) {
  const categoryColor = category === 'Medicine' ? 'text-primary' : 'text-secondary';
  const borderColor = category === 'Medicine' ? 'border-primary' : 'border-secondary';
  const hoverColor = category === 'Medicine' ? 'group-hover:text-primary' : 'group-hover:text-secondary';
  
  return (
    <article className={`bg-surface-container-lowest p-lg rounded-xl shadow-[0px_4px_20px_rgba(30,41,59,0.05)] hover:shadow-lg transition-all duration-300 border-l-4 ${borderColor} group`}>
      {/* Header with category and bookmark */}
      <div className="flex justify-between items-start mb-sm">
        <span className={`font-label-sm text-label-sm uppercase tracking-widest ${categoryColor} font-bold`}>
          {category}
        </span>
        <button className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors cursor-pointer" aria-label="Bookmark">
          bookmark
        </button>
      </div>
      
      {/* Title */}
      <h2 className={`font-h3 text-h3 text-on-surface mb-sm ${hoverColor} transition-colors`}>
        <a href={`/drug/${id}`} className="hover:underline">
          {title}
        </a>
      </h2>
      
      {/* Description */}
      <p className="font-body-md text-body-md text-on-surface-variant mb-md line-clamp-2">
        {description}
      </p>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-xs">
        {tags.map((tag) => (
          <span key={tag} className="px-3 py-1 bg-surface-container-low rounded-md font-label-sm text-label-sm text-on-surface-variant">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export default SearchResultItem;