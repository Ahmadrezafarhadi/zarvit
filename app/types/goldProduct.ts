export interface GoldProduct {
  id: string;
  name: string;
  image: string;
  weight: number; // in grams
  purity: number; // in karats (18, 21, 22, 24)
  price: number; // in Toman
  note?: string; // optional note like "Handmade", "New Design"
  category: 'ring' | 'bracelet' | 'necklace' | 'coin' | 'earring' | 'bar';
}
