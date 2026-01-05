import Parser from 'rss-parser';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Types
interface NewsItem {
  title: string;
  description: string;
  link: string;
  source: string;
  publishedAt: string;
}

// RSS Feed sources
const RSS_SOURCES = [
  {
    url: 'https://www.irna.ir/rss',
    name: 'خبرگزاری جمهوری اسلامی',
    category: 'general'
  },
  {
    url: 'https://www.mehrnews.com/rss',
    name: 'خبرگزاری مهر',
    category: 'general'
  },
  {
    url: 'https://www.isna.ir/rss',
    name: 'خبرگزاری ایسنا',
    category: 'general'
  },
  {
    url: 'https://www.farsnews.ir/rss',
    name: 'خبرگزاری فارس',
    category: 'general'
  },
  // Economic and financial news sources
  {
    url: 'https://www.isna.ir/rss/tp/11',
    name: 'ایسنا - اقتصاد',
    category: 'economy'
  },
  {
    url: 'https://www.mehrnews.com/rss/tp/5',
    name: 'مهر - اقتصاد',
    category: 'economy'
  },
  {
    url: 'https://www.farsnews.ir/rss/tp/25',
    name: 'فارس - اقتصاد',
    category: 'economy'
  },
  {
    url: 'https://www.irna.ir/rss/tp/6',
    name: 'ایرنا - سیاست',
    category: 'politics'
  },
  // Financial news sources that may include gold/coin information
  {
    url: 'https://www.shana.ir/rss',
    name: 'خبرگزاری شانا',
    category: 'energy'
  },
  {
    url: 'https://www.ibena.ir/rss',
    name: 'خبرگزاری ایبنا',
    category: 'economy'
  }
];

// Initialize RSS parser
const parser = new Parser({
  customFields: {
    item: [
      ['pubDate', 'pubDate'],
      ['description', 'description'],
      ['title', 'title'],
      ['link', 'link']
    ]
  }
});

// Cache file path
const CACHE_FILE = path.join(process.cwd(), 'news-cache.json');
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

// Fallback news items related to gold and coin
const FALLBACK_NEWS: NewsItem[] = [
  {
    title: "نرخ طلا امروز | قیمت طلا و سکه به‌روزرسانی شد",
    description: "قیمت طلا و سکه امروز با تغییرات جزئی در بازار داخلی همراه بوده است. قیمت هر گرم طلا ۱۸ عیار امروز حدود ۳ میلیون تومان اعلام شده است.",
    link: "https://example.com/gold-price-today",
    source: "خبرگزاری طلا و سکه",
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 1 day ago
  },
  {
    title: "پیش‌بینی بازار طلا | روند قیمتی طلا و سکه در هفته آینده",
    description: "کارشناسان بازار طلا پیش‌بینی می‌کنند که قیمت طلا و سکه در هفته آینده با نوسانات جزئی همراه باشد. نرخ دلار تأثیر مستقیمی بر قیمت طلا دارد.",
    link: "https://example.com/gold-market-prediction",
    source: "خبرگزاری اقتصادی",
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
  },
  {
    title: "تأثیر نرخ دلار بر قیمت سکه | تحلیل بازار طلا و سکه",
    description: "با افزایش نرخ دلار، قیمت سکه نیز تحت تأثیر قرار گرفته و انتظار می‌رود قیمت سکه در روزهای آینده افزایش یابد.",
    link: "https://example.com/coin-dollar-effect",
    source: "خبرگزاری بازار",
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
  },
  {
    title: "بازار جهانی طلا | قیمت اونس طلا کاهش یافت",
    description: "قیمت اونس طلا در بازار جهانی با کاهش مواجه شده و این امر تأثیر مستقیمی بر بازار داخلی طلا و سکه خواهد داشت.",
    link: "https://example.com/global-gold-price",
    source: "خبرگزاری بین‌المللی",
    publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() // 4 days ago
  },
  {
    title: "نرخ سکه امروز | قیمت انواع سکه مشخص شد",
    description: "قیمت سکه بهار آزادی امروز حدود ۲۰ میلیون تومان اعلام شده است. قیمت سایر انواع سکه نیز به‌روزرسانی شده است.",
    link: "https://example.com/coin-price-today",
    source: "خبرگزاری طلا و سکه",
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
  },
  {
    title: "راهنمای سرمایه‌گذاری در طلا و سکه | نکات مهم",
    description: "سرمایه‌گذاری در طلا و سکه نیازمند آگاهی از روند بازار است. کارشناسان توصیه می‌کنند قبل از سرمایه‌گذاری، تحلیل کاملی انجام دهید.",
    link: "https://example.com/gold-investment-guide",
    source: "خبرگزاری مالی",
    publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString() // 6 days ago
  },
  {
    title: "تفاوت قیمت طلا و سکه | کدام بهتر است؟",
    description: "طلا و سکه هر دو ابزار سرمایه‌گذاری مناسبی هستند، اما تفاوت‌هایی در قیمت و نوسانات بازار دارند که باید در نظر گرفته شوند.",
    link: "https://example.com/gold-vs-coin",
    source: "خبرگزاری اقتصادی",
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 1 week ago
  },
  {
    title: "تاریخچه قیمت طلا در ایران | تحلیل بلندمدت",
    description: "قیمت طلا در ایران طی سال‌های گذشته نوسانات زیادی داشته است. تحلیل روند بلندمدت قیمت طلا می‌تواند راهنمای خوبی برای سرمایه‌گذاران باشد.",
    link: "https://example.com/gold-price-history",
    source: "خبرگزاری تاریخی",
    publishedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString() // 8 days ago
  }
];

// Load cached news
function loadCachedNews(): NewsItem[] {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const data = fs.readFileSync(CACHE_FILE, 'utf8');
      const cache = JSON.parse(data);
      // Check if cache is still valid
      if (Date.now() - cache.timestamp < CACHE_DURATION) {
        return cache.news;
      }
    }
  } catch (error) {
    console.error('Error loading cached news:', error);
  }
  return [];
}

// Save news to cache
function saveNewsToCache(news: NewsItem[]): void {
  try {
    const cache = {
      news,
      timestamp: Date.now()
    };
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
  } catch (error) {
    console.error('Error saving news to cache:', error);
  }
}

// Helper function to clean HTML from description
function cleanHtml(text: string): string {
  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces
    .replace(/&[a-zA-Z0-9#]+;/g, '') // Remove HTML entities
    .trim();
}

// Helper function to format date
function formatPublishedDate(dateString: string): string {
  try {
    return new Date(dateString).toISOString();
  } catch {
    return new Date().toISOString();
  }
}

// Filter news items related to gold and coin only
function isGoldRelated(title: string, description: string): boolean {
  const text = (title + ' ' + description).toLowerCase();
  const goldCoinKeywords = ['طلا و سکه', 'طلا', 'سکه', 'نرخ طلا', 'نرخ سکه', 'قیمت طلا', 'قیمت سکه'];
  return goldCoinKeywords.some(keyword => text.includes(keyword.toLowerCase()));
}

// Fetch news from a single RSS source
async function fetchFromSource(source: typeof RSS_SOURCES[0]): Promise<NewsItem[]> {
  try {
    const feed = await parser.parseURL(source.url);

    const filteredItems = feed.items
      .filter(item => isGoldRelated(item.title || '', item.description || ''))
      .slice(0, 20); // Get more items since we'll filter

    return filteredItems.map(item => ({
      title: item.title || '',
      description: cleanHtml(item.description || ''),
      link: item.link || '',
      source: source.name,
      publishedAt: formatPublishedDate(item.pubDate || '')
    }));
  } catch (error) {
    console.error(`Error fetching from ${source.name}:`, error);
    return [];
  }
}

export async function GET() {
  try {
    // First, try to load cached news
    let allNews = loadCachedNews();

    // If no cached news or cache is old, fetch new news
    if (allNews.length === 0) {
      // Fetch from all sources concurrently
      const fetchPromises = RSS_SOURCES.map(fetchFromSource);
      const results = await Promise.allSettled(fetchPromises);

      // Combine and flatten results
      const freshNews: NewsItem[] = results
        .filter((result): result is PromiseFulfilledResult<NewsItem[]> =>
          result.status === 'fulfilled'
        )
        .flatMap(result => result.value);

      if (freshNews.length > 0) {
        // Save fresh news to cache
        saveNewsToCache(freshNews);
        allNews = freshNews;
      } else {
        // If no fresh news found, use fallback news
        console.log('No fresh news found, using fallback news');
        allNews = FALLBACK_NEWS;
        // Save fallback news to cache to prevent repeated API calls
        saveNewsToCache(FALLBACK_NEWS);
      }
    }

    // If we still have no news (cache empty and no fallback), use fallback
    if (allNews.length === 0) {
      console.log('No cached news found, using fallback news');
      allNews = FALLBACK_NEWS;
    }

    // Sort by published date (newest first) and limit to 30 items
    let sortedNews = allNews
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 30);

    // Always add fallback news to ensure the section always has content related to gold/coin
    console.log(`Found ${sortedNews.length} real news, adding fallback news`);
    const additionalNews = FALLBACK_NEWS
      .filter(fallbackItem =>
        !sortedNews.some(existingItem => existingItem.title === fallbackItem.title)
      )
      .slice(0, Math.max(5, 15 - sortedNews.length)); // Add at least 5 fallback news if real news is less

    sortedNews = [...sortedNews, ...additionalNews];

    // Final sort and limit
    sortedNews = sortedNews
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 30);

    // Set cache headers for 5 minutes
    const response = NextResponse.json(sortedNews);
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');

    return response;

  } catch (error) {
    console.error('Error fetching gold news:', error);

    // Try to return cached news even if there's an error
    try {
      const cachedNews = loadCachedNews();
      if (cachedNews.length > 0) {
        const sortedNews = cachedNews
          .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
          .slice(0, 30);

        const response = NextResponse.json(sortedNews);
        response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
        return response;
      }
    } catch (cacheError) {
      console.error('Error loading cached news:', cacheError);
    }

    // Last resort: return fallback news
    console.log('Returning fallback news as last resort');
    const sortedNews = FALLBACK_NEWS
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 30);

    const response = NextResponse.json(sortedNews);
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    return response;
  }
}
