"use client";

interface GoldImagePlaceholderProps {
  type: 'ring' | 'necklace' | 'bracelet' | 'earring' | 'coin' | 'bar';
  className?: string;
  width?: number;
  height?: number;
}

export const GoldImagePlaceholder: React.FC<GoldImagePlaceholderProps> = ({
  type,
  className = '',
  width = 200,
  height = 200
}) => {
  const getSVGContent = () => {
    switch (type) {
      case 'ring':
        return `
          <svg width="${width}" height="${height}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#ffd700;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#ffa400;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#b8860b;stop-opacity:1" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="80" fill="url(#goldGradient)" stroke="#daa520" stroke-width="3"/>
            <circle cx="100" cy="100" r="60" fill="none" stroke="#fff" stroke-width="2" opacity="0.3"/>
            <circle cx="100" cy="100" r="40" fill="#ffd700" opacity="0.7"/>
            <circle cx="100" cy="100" r="25" fill="#fff" opacity="0.9"/>
            <text x="100" y="175" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#ffa400" font-weight="bold">حلقه طلایی</text>
          </svg>
        `;

      case 'necklace':
        return `
          <svg width="${width}" height="${height}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#ffd700;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#ffa400;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#b8860b;stop-opacity:1" />
              </linearGradient>
            </defs>
            <path d="M30 60 Q100 20 170 60 Q170 140 100 180 Q30 140 30 60" fill="url(#goldGradient)" stroke="#daa520" stroke-width="3"/>
            <ellipse cx="100" cy="120" rx="25" ry="15" fill="#fff" opacity="0.8"/>
            <circle cx="85" cy="50" r="3" fill="#ffd700"/>
            <circle cx="115" cy="50" r="3" fill="#ffd700"/>
            <circle cx="100" cy="70" r="2" fill="#ffd700"/>
            <circle cx="90" cy="85" r="2" fill="#ffd700"/>
            <circle cx="110" cy="85" r="2" fill="#ffd700"/>
            <text x="100" y="185" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#ffa400" font-weight="bold">گردنبند طلا</text>
          </svg>
        `;

      case 'bracelet':
        return `
          <svg width="${width}" height="${height}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#ffd700;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#ffa400;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#b8860b;stop-opacity:1" />
              </linearGradient>
            </defs>
            <ellipse cx="100" cy="100" rx="70" ry="30" fill="none" stroke="url(#goldGradient)" stroke-width="8"/>
            <ellipse cx="100" cy="100" rx="60" ry="25" fill="none" stroke="#daa520" stroke-width="2"/>
            <rect x="85" y="75" width="30" height="50" rx="15" fill="url(#goldGradient)"/>
            <circle cx="85" cy="100" r="3" fill="#fff"/>
            <circle cx="115" cy="100" r="3" fill="#fff"/>
            <circle cx="100" cy="85" r="2" fill="#fff"/>
            <circle cx="100" cy="115" r="2" fill="#fff"/>
            <text x="100" y="175" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#ffa400" font-weight="bold">دستبند طلا</text>
          </svg>
        `;

      case 'earring':
        return `
          <svg width="${width}" height="${height}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#ffd700;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#ffa400;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#b8860b;stop-opacity:1" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="35" fill="url(#goldGradient)" stroke="#daa520" stroke-width="3"/>
            <circle cx="100" cy="100" r="20" fill="#fff" opacity="0.9"/>
            <circle cx="100" cy="100" r="10" fill="url(#goldGradient)"/>
            <circle cx="100" cy="100" r="5" fill="#fff"/>
            <line x1="100" y1="65" x2="100" y2="85" stroke="url(#goldGradient)" stroke-width="2"/>
            <circle cx="100" cy="60" r="3" fill="url(#goldGradient)"/>
            <text x="100" y="175" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#ffa400" font-weight="bold">گوشواره طلا</text>
          </svg>
        `;

      case 'coin':
        return `
          <svg width="${width}" height="${height}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#ffd700;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#ffa400;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#b8860b;stop-opacity:1" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="70" fill="url(#goldGradient)" stroke="#daa520" stroke-width="3"/>
            <circle cx="100" cy="100" r="60" fill="none" stroke="#fff" stroke-width="1" opacity="0.3"/>
            <circle cx="100" cy="100" r="50" fill="none" stroke="#daa520" stroke-width="1"/>
            <text x="100" y="95" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#b8860b" font-weight="bold">طلا</text>
            <text x="100" y="110" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#daa520">24K</text>
            <circle cx="80" cy="80" r="2" fill="#fff"/>
            <circle cx="120" cy="80" r="2" fill="#fff"/>
            <circle cx="80" cy="120" r="2" fill="#fff"/>
            <circle cx="120" cy="120" r="2" fill="#fff"/>
            <text x="100" y="175" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#ffa400" font-weight="bold">سکه طلا</text>
          </svg>
        `;

      case 'bar':
        return `
          <svg width="${width}" height="${height}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#ffd700;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#ffa400;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#b8860b;stop-opacity:1" />
              </linearGradient>
            </defs>
            <rect x="40" y="70" width="120" height="60" rx="8" fill="url(#goldGradient)" stroke="#daa520" stroke-width="3"/>
            <rect x="50" y="80" width="100" height="40" rx="4" fill="none" stroke="#fff" stroke-width="1" opacity="0.5"/>
            <text x="100" y="95" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#b8860b" font-weight="bold">طلا</text>
            <text x="100" y="110" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#daa520">24K 999</text>
            <line x1="60" y1="85" x2="60" y2="115" stroke="#fff" stroke-width="1" opacity="0.7"/>
            <line x1="80" y1="85" x2="80" y2="115" stroke="#fff" stroke-width="1" opacity="0.7"/>
            <line x1="100" y1="85" x2="100" y2="115" stroke="#fff" stroke-width="1" opacity="0.7"/>
            <line x1="120" y1="85" x2="120" y2="115" stroke="#fff" stroke-width="1" opacity="0.7"/>
            <line x1="140" y1="85" x2="140" y2="115" stroke="#fff" stroke-width="1" opacity="0.7"/>
            <text x="100" y="175" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#ffa400" font-weight="bold">شمش طلا</text>
          </svg>
        `;

      default:
        return `
          <svg width="${width}" height="${height}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" fill="#1e2d4d" stroke="#ffa400" stroke-width="3"/>
            <circle cx="100" cy="100" r="60" fill="none" stroke="#ffd700" stroke-width="2" opacity="0.5"/>
            <text x="100" y="95" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#ffa400" font-weight="bold">طلا</text>
            <text x="100" y="110" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#ffd700">Gold</text>
            <text x="100" y="175" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#ffa400" font-weight="bold">محصول طلا</text>
          </svg>
        `;
    }
  };

  return (
    <div
      className={`inline-block ${className}`}
      dangerouslySetInnerHTML={{ __html: getSVGContent() }}
    />
  );
};
