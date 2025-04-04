# 📰 NewsHub — Personalized AI-Powered News Dashboard

NewsHub is a full-stack web app that delivers personalized news summaries using AI. Users can define their preferences and receive a curated, concise, and sentiment-tagged news feed.

---

## 🚀 Tech Stack

| Layer       | Tooling                         |
|------------|---------------------------------|
| Frontend   | [Bolt.new](https://bolt.new)    |
| Backend    | [Nhost](https://nhost.io/) + Hasura (PostgreSQL + Auth) |
| Workflow Automation | [n8n](https://n8n.io)   |
| AI Summarization | [OpenRouter](https://openrouter.ai) |
| News Feed  | [NewsAPI](https://newsapi.org/) or GNews |

---

## 🛠️ Features

- 🔐 Auth via Nhost (email/password)
- 🙋 User preference selection (topics, keywords, sources)
- 🗞️ Fetches latest news based on preferences
- 🤖 Summarizes articles using OpenRouter
- 💡 Sentiment & explanation added via AI
- 📊 Data stored in Hasura (`processed_article` table)
- 🖥️ Interactive frontend (read/save/share articles)

---

## 🧰 Project Structure

```
newshub/
│
├── frontend/                  # Built with Bolt.new (React app)
│   ├── src/
│   │   ├── components/        # UI components (e.g., Dashboard, Preferences)
│   │   ├── pages/             # Page-level components (Home, Login, etc.)
│   │   ├── graphql/           # GraphQL queries & mutations
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
│   └── news-ai-workflow.json  # Workflow for fetching + summarizing news
│
├── .env                       # Global environment variables
├── README.md                  # Project documentation
└── LICENSE
```

---

## ⚙️ Setup Instructions

1. **Clone this repo**  
   ```bash
   git clone https://github.com/your-username/newshub.git
   cd newshub
   ```

2. **Set up Nhost backend**  
   Deploy the backend using [Nhost Console](https://console.nhost.io/).

3. **Run frontend**  
   Set environment variables in `frontend/.env`:
   ```
   VITE_GRAPHQL_ENDPOINT=https://<your-subdomain>.hasura.app/v1/graphql
   VITE_HASURA_ADMIN_SECRET=your-secret
   ```

   Then run:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Import n8n workflow**  
   - Go to your [n8n instance](https://n8n.io)
   - Import `n8n-workflows/news-ai-workflow.json`
   - Configure News API & OpenRouter keys
   - Set Webhook URL in Hasura Action

---

## ✅ To-Do / Roadmap

- [x] Setup Hasura schema & permissions
- [x] Build n8n automation flow
- [x] Create frontend with Bolt
- [x] Integrate GraphQL in frontend
- [ ] Add auth-protected routes
- [ ] Enable notifications / refresh options
- [ ] Deploy to production (Vercel / Railway)

