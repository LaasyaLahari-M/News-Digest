import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useUserData } from '@nhost/react';
import {
  Newspaper,
  BookmarkPlus,
  Share2,
  CheckCircle,
  Settings,
  TrendingUp,
  TrendingDown,
  Minus,
  Search,
  LogOut
} from 'lucide-react';
import { GET_USER_PREFERENCES, UPDATE_USER_PREFERENCES } from './graphql/queries';
import type { Article, UserPreferences } from './types';
import { Auth } from './components/Auth';
import { useNhostClient } from '@nhost/react';

// Mock data for demonstration
const mockArticles: Article[] = [
  {
    id: 1,
    title: "The Future of Renewable Energy",
    summary: "New breakthrough in solar technology promises to revolutionize clean energy production...",
    source: "Tech Daily",
    timestamp: "2h ago",
    sentiment: "positive",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 2,
    title: "Global Market Update",
    summary: "Markets show mixed signals as international trade tensions continue to affect global economy...",
    source: "Financial Times",
    timestamp: "4h ago",
    sentiment: "negative",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 3,
    title: "Breakthrough in AI Research",
    summary: "Scientists develop new neural network architecture that significantly improves efficiency...",
    source: "Tech Review",
    timestamp: "6h ago",
    sentiment: "neutral",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
  },
];

const categories = [
  "Technology",
  "Business",
  "Science",
  "Health",
  "Politics",
  "Entertainment",
];

function App() {
  const user = useUserData();
  const nhost = useNhostClient();
  const { data, loading } = useQuery<{ user_preferences: UserPreferences[] }>(GET_USER_PREFERENCES);
  const [updatePreferences] = useMutation(UPDATE_USER_PREFERENCES);

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    data?.user_preferences[0]?.categories || ["Technology", "Business"]
  );
  const [savedArticles, setSavedArticles] = useState<number[]>(
    data?.user_preferences[0]?.savedArticles || []
  );
  const [readArticles, setReadArticles] = useState<number[]>(
    data?.user_preferences[0]?.readArticles || []
  );

  if (!user) {
    return <Auth />;
  }

  const updateUserPreferences = async () => {
    try {
      await updatePreferences({
        variables: {
          id: user.id,
          categories: selectedCategories,
          savedArticles,
          readArticles,
        },
      });
    } catch (error) {
      console.error('Failed to update preferences:', error);
    }
  };

  const handleLogout = async () => {
    await nhost.auth.signOut();
  };

  const toggleCategory = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newCategories);
    updateUserPreferences();
  };

  const toggleSaved = (articleId: number) => {
    const newSavedArticles = savedArticles.includes(articleId)
      ? savedArticles.filter(id => id !== articleId)
      : [...savedArticles, articleId];
    
    setSavedArticles(newSavedArticles);
    updateUserPreferences();
  };

  const toggleRead = (articleId: number) => {
    const newReadArticles = readArticles.includes(articleId)
      ? readArticles.filter(id => id !== articleId)
      : [...readArticles, articleId];
    
    setReadArticles(newReadArticles);
    updateUserPreferences();
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="text-green-500" size={20} />;
      case 'negative':
        return <TrendingDown className="text-red-500" size={20} />;
      default:
        return <Minus className="text-gray-500" size={20} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Newspaper className="text-blue-600" size={28} />
            <h1 className="text-2xl font-bold text-gray-900">NewsHub</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Settings size={24} className="text-gray-600" />
            </button>
            <button
              onClick={handleLogout}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
              title="Sign out"
            >
              <LogOut size={24} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Your Categories</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${selectedCategories.includes(category)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockArticles.map(article => (
            <article
              key={article.id}
              className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all
                ${readArticles.includes(article.id) ? 'opacity-75' : ''}`}
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{article.title}</h3>
                  {getSentimentIcon(article.sentiment)}
                </div>
                <p className="text-gray-600 text-sm mb-4">{article.summary}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{article.source} • {article.timestamp}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleRead(article.id)}
                      className={`p-2 rounded-full hover:bg-gray-100
                        ${readArticles.includes(article.id) ? 'text-green-500' : 'text-gray-400'}`}
                    >
                      <CheckCircle size={20} />
                    </button>
                    <button
                      onClick={() => toggleSaved(article.id)}
                      className={`p-2 rounded-full hover:bg-gray-100
                        ${savedArticles.includes(article.id) ? 'text-blue-500' : 'text-gray-400'}`}
                    >
                      <BookmarkPlus size={20} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 text-gray-400">
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;