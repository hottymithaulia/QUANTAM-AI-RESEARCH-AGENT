// App.jsx — Upgraded Financial Intelligence Dashboard
// Incorporates the TradingView widget, multi-agent orchestration timeline, 
// and upgraded sub-agent metrics.

import React, { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import KpiCards from "./components/KpiCards";
import AgentCard from "./components/AgentCard";
import RecommendationCard from "./components/RecommendationCard";
import StockInfoCard from "./components/StockInfoCard";
import ArchitecturePage from "./components/ArchitecturePage";
import TradingViewChart from "./components/TradingViewChart";
import NewsInsights from "./components/NewsInsights";
import { analyzeStock, getStockData } from "./api";


const WORKFLOW_STAGES = [
  { id: 1, label: "Market Data Retrieved" },
  { id: 2, label: "Technical Core Audited" },
  { id: 3, label: "Fundamentals Evaluated" },
  { id: 4, label: "News Sentiment Mapped" },
  { id: 5, label: "Master Report Synthesized" },
];

function App() {
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [isLoading, setIsLoading] = useState(false);
  const [workflowStep, setWorkflowStep] = useState(0); // 0 = idle, 1-5 stages
  const [error, setError] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [stockInfoData, setStockInfoData] = useState(null);

  // Small helper to sleep during workflow visualization
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function handleSearch(symbol) {
    setIsLoading(true);
    setError(null);
    setAnalysisData(null);
    setStockInfoData(null);
    setWorkflowStep(1); // Stage 1: Fetching data

    try {
      // Begin fetching real data in parallel
      const fetchPromise = Promise.all([
        analyzeStock(symbol),
        getStockData(symbol)
      ]);

      // Stage 1 animation pause
      await delay(500);
      setWorkflowStep(2); // Stage 2: Technical Agent

      await delay(400);
      setWorkflowStep(3); // Stage 3: Fundamental Agent

      await delay(400);
      setWorkflowStep(4); // Stage 4: Sentiment Agent

      await delay(400);
      setWorkflowStep(5); // Stage 5: Synthesis

      // Await actual response
      const [analysis, stockInfo] = await fetchPromise;

      await delay(300);
      setAnalysisData(analysis);
      setStockInfoData(stockInfo);
    } catch (err) {
      setWorkflowStep(0);
      if (err.code === "ERR_NETWORK") {
        setError("Cannot establish connection with the FastAPI gateway. Ensure python backend is running on port 8000.");
      } else {
        setError(err.response?.data?.detail || "Analysis pipeline failed. Verify ticker format.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen pb-12" style={{ background: "linear-gradient(135deg, #050510 0%, #0c0c20 50%, #050510 100%)" }}>
      {/* Subtle background nodes pattern */}
      <div
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.15) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {currentPage === "Architecture" ? (
        <ArchitecturePage />
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative">
          {/* Dashboard Title */}
          <div className="text-center mb-8">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-black gradient-text tracking-tight mb-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              QUANTUM Financial Intelligence
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto font-light">
              Enter a US ticker (e.g. AAPL) or Indian NSE stock (e.g. INFY or RELIANCE.NS) 
              to execute the multi-agent consensus analysis pipeline.
            </p>
          </div>

          {/* Search Input */}
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />

          {/* ── Orchestration Pipeline Timeline ── */}
          {isLoading && (
            <div className="quantum-card border-purple-500/20 bg-purple-900/5 mb-8">
              <p className="text-center text-xs font-bold uppercase tracking-wider text-purple-400 mb-5">
                Consensus Orchestration Flow
              </p>
              
              <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-2 relative">
                {/* Horizontal line for desktop connecting stages */}
                <div className="hidden md:block absolute top-[18px] left-[5%] right-[5%] h-0.5 bg-[#1e1e4a] -z-10" />

                {WORKFLOW_STAGES.map((stage) => {
                  const isActive = workflowStep === stage.id;
                  const isCompleted = workflowStep > stage.id;
                  
                  return (
                    <div key={stage.id} className="flex-1 flex md:flex-col items-center gap-3 md:gap-2 text-center z-10">
                      {/* Status Circle */}
                      <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold font-mono transition-all duration-300 ${
                        isActive 
                          ? "bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-600/50 animate-pulse" 
                          : isCompleted
                          ? "bg-[#0f0f2a] border-emerald-500 text-emerald-400"
                          : "bg-[#050510] border-[#1e1e4a] text-slate-600"
                      }`}>
                        {isCompleted ? "✓" : stage.id}
                      </div>
                      
                      {/* Label */}
                      <div className="flex flex-col text-left md:text-center">
                        <span className={`text-xs font-bold tracking-tight transition-colors duration-300 ${
                          isActive ? "text-purple-400" : isCompleted ? "text-slate-300" : "text-slate-650 text-slate-500"
                        }`}>
                          {stage.label}
                        </span>
                        {isActive && (
                          <span className="text-[10px] text-purple-500 font-mono animate-pulse mt-0.5">
                            Processing...
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Error Banner */}
          {error && !isLoading && (
            <div className="quantum-card border-red-500/30 bg-red-950/10 mb-8 fade-in-up">
              <div className="flex items-start gap-3">
                <span className="text-xl">⚠️</span>
                <div>
                  <h4 className="text-red-400 font-bold text-sm">Orchestration Error</h4>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Results Grid */}
          {analysisData && !isLoading && (
            <div className="flex flex-col gap-6">
              
              {/* TradingView Widget Chart Integration */}
              <TradingViewChart symbol={analysisData.stock} />

              {/* Quick Info Summary */}
              {stockInfoData && (
                <StockInfoCard
                  symbol={analysisData.stock}
                  stockInfo={stockInfoData}
                />
              )}

              {/* KPI Summary Block */}
              <KpiCards data={analysisData} />

              {/* Specialized Sub-Agent Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AgentCard
                  title="Technical Analysis Agent"
                  icon="📈"
                  verdict={analysisData.technical.trend}
                  confidence={analysisData.technical.confidence}
                  reason={analysisData.technical.reason}
                  details={analysisData.technical}
                  delay={0.05}
                />
                <AgentCard
                  title="Fundamental Analysis Agent"
                  icon="🏦"
                  verdict={analysisData.fundamental.fundamental}
                  confidence={analysisData.fundamental.confidence}
                  reason={analysisData.fundamental.reason}
                  details={analysisData.fundamental}
                  delay={0.1}
                />
                <AgentCard
                  title="Headline Sentiment Agent"
                  icon="📰"
                  verdict={analysisData.sentiment.sentiment}
                  confidence={analysisData.sentiment.confidence}
                  reason={analysisData.sentiment.reason}
                  details={analysisData.sentiment}
                  delay={0.15}
                />
              </div>

              {/* Real-time Harvested News Insights Feed */}
              {analysisData.sentiment.articles && (
                <NewsInsights articles={analysisData.sentiment.articles} />
              )}

              {/* Master Synthesis Consolidation */}
              <RecommendationCard
                finalDecision={analysisData.final_decision}
                symbol={analysisData.stock}
              />

              
            </div>
          )}

          {/* Empty Prompt State */}
          {!analysisData && !isLoading && !error && (
            <div className="text-center py-24 bg-[#0a0a1a]/30 rounded-3xl border border-[#1e1e4a]/30 quantum-card select-none">
              <span className="text-5xl block mb-4 filter drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">🛡️</span>
              <p className="text-slate-400 text-sm font-bold tracking-wide uppercase">Consensus Dashboard Idle</p>
              <p className="text-slate-600 text-xs mt-2 max-w-md mx-auto font-light">
                Submit a valid stock symbol above. The backend will spawn specialized nodes to analyze real-time price variables, company records, and media streams.
              </p>
            </div>
          )}
        </main>
      )}
    </div>
  );
}

export default App;
