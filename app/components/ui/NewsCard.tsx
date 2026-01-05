"use client";

import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { getTimeAgo } from '../../utils/timeFormat';

interface NewsCardProps {
  title: string;
  description: string;
  link: string;
  source: string;
  publishedAt: string;
  isNew?: boolean;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  title,
  description,
  link,
  source,
  publishedAt,
  isNew = false
}) => {
  const timeAgo = getTimeAgo(publishedAt);

  return (
    <article className="bg-card-bg border border-border rounded-lg p-4 hover:border-primary/50 transition-colors group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-sm leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {title}
            </Link>
          </h3>

          <p className="text-gray-300 text-xs leading-relaxed line-clamp-3 mb-3">
            {description}
          </p>

          <div className="flex items-center justify-between text-xs">
            <span className="text-primary font-medium">{source}</span>
            <span className="text-gray-400">{timeAgo}</span>
          </div>
        </div>

        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-3 p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors shrink-0"
        >
          <ExternalLink size={16} />
        </Link>
      </div>

      {isNew && (
        <div className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
          جدید
        </div>
      )}
    </article>
  );
};
