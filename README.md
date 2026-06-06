# QUANTUM Financial Intelligence 🤖
## Institutional-Grade Multi-Agent Financial Research Platform

QUANTUM is an advanced, production-ready multi-agent investment research and decision-support system. It orchestrates parallel AI agent nodes to process real-time market data, financial statements, and news headlines, delivering a unified Market Bias synthesis report.

---

## 🚀 Architectural Capabilities

* **Real-Time Market Feeds**: Integrates `yfinance` to parse active market statistics and OHLCV price histories.
* **Exchange Suffix Auto-Resolution**: Detects common Indian stocks (e.g. `RELIANCE`, `TCS`, `INFY`) and auto-appends `.NS` for seamless Yahoo Finance querying, alongside standard US tickers (e.g., `AAPL`, `TSLA`).
* **Multi-Timeframe Audits**: Aggregates and evaluates technical variables across `15m`, `1h`, `4h`, `1d`, and `1w` price streams (resampling 1h data into 4h intervals via Pandas).
* **Dual-Mode Sentiment Agent**: Classifies media coverage via an offline keyword-matching lexicon with event triggers, or dynamically upgrades to a zero-shot LLM using **Google Gemini 1.5** when `GEMINI_API_KEY` is present.
* **Explainable Consensus Decisioning**: The Master Agent synthesizes results using a **40-35-25 weighted matrix**, outputting a unified non-advice **Market Bias** (`Bullish`, `Bearish`, `Neutral`), risk categories, and specific watchlist triggers.
* **Interactive Live Charts**: Embeds real-time **TradingView** candle widgets with interval selectors matching client preferences.
* **Visual Pipeline Timeline**: Illustrates step-by-step pipeline execution (`Market Data Ingest` ➔ `Technical Audits` ➔ `Fundamental Evaluations` ➔ `Sentiment Mapping` ➔ `Master Synthesis`) to track agent coordination in real-time.

---

## 📁 Repository Map

```
QUANTUM-AI-RESEARCH-AGENT/
│
├── backend/                    ← FastAPI Python Backend Gateway
│   ├── main.py                 ← Server entry point (cors & config loader)
│   ├── requirements.txt        ← Backend dependencies (yfinance, pandas, google-generativeai)
│   ├── render.yaml             ← Render infrastructure-as-code configuration
│   ├── agents/
│   │   ├── technical_agent.py  ← Volatility, support, resistance, and multi-timeframe checks
│   │   ├── fundamental_agent.py← Health, valuation, and compound growth scorers
│   │   ├── sentiment_agent.py  ← News lexicon scorer & zero-shot Gemini analyzer
│   │   └── master_agent.py     ← Weighted consensus matrix & narrative synthesizer
│   ├── services/
│   │   ├── stock_service.py    ← Real-time Yahoo Finance OHLCV & resampler
│   │   ├── news_service.py     ← Real-time news extractor and tagger
│   │   └── cache_service.py    ← In-memory thread-safe 5-min TTL cache
│   ├── models/
│   │   └── schemas.py          ← Pydantic v2 schemas and validation models
│   └── api/
│       └── routes.py           ← API endpoints, dotenv loader, and error handlers
│
├── frontend/                   ← React client application
│   ├── vercel.json             ← SPA routing configuration for Vercel
│   └── src/
│       ├── main.jsx            ← React renderer
│       ├── App.jsx             ← Dashboard state, timeline, and layout coordinator
│       ├── api.js              ← Axios client pointing to port 8000
│       ├── index.css           ← CSS theme tokens, glassmorphism, and animations
│       └── components/
│           ├── Header.jsx      ← Navbar switcher
│           ├── SearchBar.jsx   ← Quick-ticker bar
│           ├── KpiCards.jsx    ← Summarizes price, bias, confidence, and risk
│           ├── AgentCard.jsx   ← Multi-layout card displaying sub-agent details
│           ├── RecommendationCard.jsx ← Master Synthesis Report and agent weight charts
│           ├── StockInfoCard.jsx   ← Detailed company metrics
│           └── TradingViewChart.jsx ← Renders dynamic TradingView chart and selector
│
├── docs/                       ← Developer Architecture & Implementation Documentation
│   ├── architecture.md         ← Server-client topology and caching overview
│   ├── agent-flow.md           ← Sub-agent algorithms and weighting math
│   ├── api-design.md           ← Schema endpoints contracts
│   ├── security.md             ← Isolation controls, validation, and diagnostics
│   └── deployment.md           ← Step-by-step Vercel and Render configurations
│
├── .env.example                ← Environment template
└── README.md                   ← Master project guidebook
```

---

## 👥 Team Collaboration & Branch Ownership

To support parallel development during the Capgemini Buildathon, the repository uses a feature-branch model. The project is split into key areas with dedicated branch owners:

| Branch Name | Primary Owner | Module/Scope |
|:---|:---|:---|
| `frontend-ui` | **Abhinav** | React application, UI widgets, dashboards, visualizations |
| `backend-data` | **Priyansh** | FastAPI endpoints, stock services, database logic |
| `technical-agent` | **Ummehani** | Technical analysis agent modules, custom indicators |
| `fundamental-sentiment` | **Suhani** | Fundamental metrics and sentiment analysis agents |
| `architecture-docs` | **Vedant** | System diagrams, API specifications, markdown docs |

For detailed development guidelines, branching protocols, and merging instructions, see [CONTRIBUTING.md](file:///c:/Users/DELL/OneDrive/Desktop/Stock%20research%20Agent/CONTRIBUTING.md) and [TEAM_WORKFLOW.md](file:///c:/Users/DELL/OneDrive/Desktop/Stock%20research%20Agent/TEAM_WORKFLOW.md).

---

## ⚡ Quick Start (Local Setup)

### 1. Copy Environment File & Configure
Copy `.env.example` to `.env` in the root workspace directory:
```bash
cp .env.example .env
```
*(Optional: Set your `GEMINI_API_KEY` to activate advanced generative news classification.)*

### 2. Boot Backend Server
```bash
cd backend
pip install -r requirements.txt
python main.py
```
* Backend starts at `http://localhost:8000`. 
* Interactive Swagger Docs are available at `http://localhost:8000/docs`.

### 3. Launch React Client
In a new terminal:
```bash
cd frontend
npm install
npm run dev
```
* Access the client dashboard at `http://localhost:5173`.

---

## 📂 System Documentation

For detailed analysis of design decisions, review the following guides:
* [Architecture Design](file:///c:/Users/singh/QUANTAM-AI-RESEARCH-AGENT/docs/architecture.md)
* [Multi-Agent Consensus Flow](file:///c:/Users/singh/QUANTAM-AI-RESEARCH-AGENT/docs/agent-flow.md)
* [API Contract Design](file:///c:/Users/singh/QUANTAM-AI-RESEARCH-AGENT/docs/api-design.md)
* [Security & Safety Safeguards](file:///c:/Users/singh/QUANTAM-AI-RESEARCH-AGENT/docs/security.md)
* [Hosting & Deployment Guide](file:///c:/Users/singh/QUANTAM-AI-RESEARCH-AGENT/docs/deployment.md)

---

> ⚠️ **Disclaimer**: For educational purposes only. This platform represents quantitative analysis and does not provide financial or investment advice.
