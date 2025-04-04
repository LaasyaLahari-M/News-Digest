# 📰 NewsHub — Personalized AI-Powered News Dashboard

NewsHub is a full-stack web app that delivers personalized news summaries using AI. Users can define their preferences and receive a curated, concise, and 
sentiment-tagged news feed.

---

## 🚀 Tech Stack

| Layer       | Tooling                       |
|------------|-------------------------------|
| Frontend   | [Bolt.new](https://bolt.new)  |
| Backend    | [Nhost](https://nhost.io/) + Hasura (PostgreSQL + Auth) |
| Workflow Automation | [n8n](https://n8n.io) |
| AI Summarization | [OpenRouter](https://openrouter.ai) |
| News Feed  | [NewsAPI](https://newsapi.org/) or GNews |

---

## 🛠️ Features

- 🔐 Auth via Nhost (email/password)
- 🙋 User preference selection (topics, keywords, sources)
- 🗞️ Fetches latest news based on preferences
- 🤖 Summarizes articles using OpenRouter
- 💡 Sentiment & explanation added via AI
- 📊 Saved in PostgreSQL (`processed_article` table)
- 🖥️ Curated frontend dashboard with interaction (read/save/share)

---

## 🧰 Project Structure

newshub/
│
├── frontend/                  # Built with Bolt.new (React app)
│   ├── src/
│   │   ├── components/        # UI components (e.g., Dashboard, Preferences)
│   │   ├── pages/             # Page-level components (Home, Login, etc.)
│   │   ├── graphql/           # Queries and mutations
│   │   ├── apollo/            # Apollo Client setup
│   │   └── App.tsx            # Main app file
│   ├── public/
│   └── .env                   # Frontend environment variables
│
├── backend/                   # Nhost project (Hasura + PostgreSQL)
│   ├── migrations/            # Database schema migrations
│   ├── metadata/              # Hasura metadata (permissions, RLS, etc.)
│   └── nhost.config.yaml      # Nhost configuration
│
├── n8n-workflows/             # Automated AI workflow (n8n JSON exports)
│   └── news-ai-workflow.json  # Full workflow for fetching + summarizing news
│
├── .env                       # Global environment variables
├── README.md                  # Project documentation
└── LICENSE

📦 TODO / Future Improvements
 Add user login via social OAuth

 Add article read/save/share tracking

 Pagination + infinite scroll

 Daily summary email using n8n
