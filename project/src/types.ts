export interface Article {
  id: number;
  title: string;
  summary: string;
  source: string;
  timestamp: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  image: string;
}

export interface UserPreferences {
  id: string;
  categories: string[];
  savedArticles: number[];
  readArticles: number[];
}