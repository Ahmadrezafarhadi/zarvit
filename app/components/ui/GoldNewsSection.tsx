"use client";

import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { NewsCard } from './NewsCard';
import { Button } from './Button';
import { RefreshCw, AlertCircle, Filter } from 'lucide-react';

// Types
interface NewsItem {
  title: string;
  description: string;
  link: string;
  source: string;
  publishedAt: string;
}

type CategoryFilter = 'all' | 'gold' | 'coin';

interface GoldNewsSectionProps {
  maxItems?: number;
  showFilters?: boolean;
}

// Skeleton loading component
const NewsSkeleton: React.FC = () => (
  <div className="space-y-4">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="bg-card-bg border border-border rounded-lg p-4 animate-pulse">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-3 bg-gray-700 rounded w-full"></div>
            <div className="h-3 bg-gray-700 rounded w-2/3"></div>
            <div className="flex justify-between items-center pt-2">
              <div className="h-3 bg-gray-700 rounded w-16"></div>
              <div className="h-3 bg-gray-700 rounded w-12"></div>
            </div>
          </div>
          <div className="ml-3 w-8 h-8 bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    ))}
  </div>
);

// Error component
const NewsError: React.FC<{ onRetry: () => void }> = ({ onRetry }) => (
  <div className="text-center py-8">
    <AlertCircle className="mx-auto h-12 w-12 text-red-400 mb-4" />
    <h3 className="text-lg font-medium text-white mb-2">
      خطا در بارگذاری اخبار
    </h3>
    <p className="text-gray-400 mb-4">
      متاسفانه در دریافت اخبار مشکلی پیش آمده است
    </p>
    <Button onClick={onRetry} variant="outline" size="sm">
      <RefreshCw size={16} className="ml-2" />
      تلاش مجدد
    </Button>
  </div>
);

// Category filter component
const CategoryFilter: React.FC<{
  activeFilter: CategoryFilter;
  onFilterChange: (filter: CategoryFilter) => void;
}> = ({ activeFilter, onFilterChange }) => {
  const filters: { value: CategoryFilter; label: string }[] = [
    { value: 'all', label: 'همه' },
    { value: 'gold', label: 'طلا' },
    { value: 'coin', label: 'سکه' }
  ];

  return (
    <div className="flex items-center gap-2 mb-6">
      <Filter size={16} className="text-gray-400" />
      <div className="flex gap-1">
        {filters.map((filter) => (
          <Button
            key={filter.value}
            variant={activeFilter === filter.value ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => onFilterChange(filter.value)}
            className="px-3 py-1 text-xs"
          >
            {filter.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export const GoldNewsSection: React.FC<GoldNewsSectionProps> = ({
  maxItems = 12,
  showFilters = true
}) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/gold-news');
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }

      const data: NewsItem[] = await response.json();
      setNews(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطای ناشناخته');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Auto refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(fetchNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter news based on category
  const filteredNews = React.useMemo(() => {
    if (categoryFilter === 'all') return news;

    return news.filter(item => {
      const title = item.title.toLowerCase();
      const description = item.description.toLowerCase();
      const text = title + ' ' + description;

      if (categoryFilter === 'gold') {
        // Show news containing gold-related terms
        return text.includes('طلا') || item.source.toLowerCase().includes('طلا');
      }

      if (categoryFilter === 'coin') {
        // Show news containing coin-related terms
        return text.includes('سکه') || item.source.toLowerCase().includes('سکه');
      }

      return true;
    });
  }, [news, categoryFilter]);

  const displayedNews = filteredNews.slice(0, maxItems);

  return (
    <section className="py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            اخبار روز طلا و سکه
          </h2>

          {lastUpdated && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <RefreshCw size={14} />
              <span>
                آخرین بروزرسانی: {lastUpdated.toLocaleTimeString('fa-IR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          )}
        </div>

        {showFilters && (
          <CategoryFilter
            activeFilter={categoryFilter}
            onFilterChange={setCategoryFilter}
          />
        )}

        <Card className="p-6">
          {loading ? (
            <NewsSkeleton />
          ) : error ? (
            <NewsError onRetry={fetchNews} />
          ) : displayedNews.length > 0 ? (
            <div className="space-y-4">
              {displayedNews.map((item, index) => (
                <NewsCard
                  key={`${item.link}-${index}`}
                  {...item}
                  isNew={index < 3} // Mark first 3 items as new
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">هیچ خبری یافت نشد</p>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};
