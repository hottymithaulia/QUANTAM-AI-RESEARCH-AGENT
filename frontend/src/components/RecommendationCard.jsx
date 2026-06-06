// RecommendationCard.jsx (Repurposed as Master Synthesis Report)
// Displays the consolidated Master Agent intelligence, key drivers, 
// watchlist items, risk assessment, and agent weight contribution.

import React from "react";

function RecommendationCard({ finalDecision, symbol }) {
  const { market_bias, confidence, risk, key_drivers, watchlist_factors, summary } = finalDecision;

  // Bias styling configuration
  function getTheme(bias) {
    const b = bias ? bias.toLowerCase() : "";
    if (b === "bullish") return {
      bg: "from-emerald-900/20 to-emerald-900/5",
      border: "border-emerald-500/30",
      badge: "bg-emerald-500 text-white shadow-emerald-500/20",
      glow: "0 0 40px rgba(16, 185, 129, 0.15)",
      icon: "📈",
      text: "text-emerald-400",
    };
    if (b === "bearish") return {
      bg: "from-red-900/20 to-red-900/5",
      border: "border-red-500/30",
      badge: "bg-red-500 text-white shadow-red-500/20",
      glow: "0 0 40px rgba(239, 68, 68, 0.15)",
      icon: "📉",
      text: "text-red-400",
    };
    // Neutral
    return {
      bg: "from-amber-900/20 to-amber-900/5",
      border: "border-amber-500/30",
      badge: "bg-amber-500 text-white shadow-amber-500/20",
      glow: "0 0 40px rgba(245, 158, 11, 0.15)",
      icon: "↔️",
      text: "text-amber-400",
    };
  }

  const theme = getTheme(market_bias);

  return (
    <div
      className={`rounded-2xl border ${theme.border} bg-gradient-to-br ${theme.bg} p-6 mb-6 fade-in-up`}
      style={{ boxShadow: theme.glow, animationDelay: "0.4s" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1e1e4a]/60 pb-4 mb-5">
        <div>
          <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Consolidated Intelligence</span>
          <h3 className="text-white font-bold text-lg mt-0.5">Master Synthesis Report</h3>
        </div>
        <span className="text-3xl">{theme.icon}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Market Bias & Confidence Circle */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center text-center p-4 bg-black/25 rounded-2xl border border-[#1e1e4a]/40">
          <span className="text-slate-500 font-mono text-xs uppercase tracking-wider">{symbol} Bias</span>
          <div className={`text-5xl font-black ${theme.text} mt-2 mb-4`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {market_bias}
          </div>
          
          {/* Progress bar circle representation or simple visual container */}
          <div className="relative w-28 h-28 flex items-center justify-center mb-4">
            {/* Visual SVG Progress Ring */}
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="56" cy="56" r="46" stroke="#1e1e4a" strokeWidth="6" fill="transparent" />
              <circle 
                cx="56" cy="56" r="46" 
                stroke={market_bias === "Bullish" ? "#10b981" : market_bias === "Bearish" ? "#ef4444" : "#f59e0b"} 
                strokeWidth="7" 
                fill="transparent" 
                strokeDasharray="289"
                strokeDashoffset={289 - (289 * (confidence || 50)) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-white font-mono">{confidence}%</span>
              <span className="text-[9px] text-slate-500 font-semibold uppercase">Confidence</span>
            </div>
          </div>

          <div className="text-slate-400 text-xs font-medium">
            Assessed Risk Level: <span className={`font-bold ${risk === "Low" ? "text-emerald-400" : risk === "High" ? "text-red-400" : "text-amber-400"}`}>{risk}</span>
          </div>
        </div>

        {/* Right column: Explanations, Drivers, Watchlists */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Narrative Summary */}
          <div className="bg-[#0a0a1a]/40 p-4 rounded-xl border border-[#1e1e4a]/40">
            <h4 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span>🧠</span> Synthesis Narrative
            </h4>
            <p className="text-slate-200 text-sm leading-relaxed font-light">{summary}</p>
          </div>

          {/* Key Drivers */}
          <div>
            <h4 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span>⚡</span> Key Decision Drivers
            </h4>
            <ul className="text-xs space-y-2 text-slate-300">
              {key_drivers && key_drivers.map((drv, i) => (
                <li key={i} className="flex gap-2 items-start bg-black/10 p-2 rounded-lg border border-white/5">
                  <span className="text-purple-400">✦</span>
                  <span className="leading-relaxed">{drv}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Watchlist Factors */}
          <div>
            <h4 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span>📌</span> Watchlist & Risk Triggers
            </h4>
            <ul className="text-xs space-y-2 text-slate-300">
              {watchlist_factors && watchlist_factors.map((fct, i) => (
                <li key={i} className="flex gap-2 items-start bg-black/10 p-2 rounded-lg border border-white/5">
                  <span className="text-cyan-400">▪</span>
                  <span className="leading-relaxed">{fct}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Agent Weight Contribution Visualization ── */}
      <div className="mt-6 border-t border-[#1e1e4a]/60 pt-5">
        <h4 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <span>📊</span> Agent Weighted Influence
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {/* Tech 40% */}
          <div className="bg-[#0a0a1a]/50 p-3 rounded-xl border border-[#1e1e4a]/40">
            <div className="flex justify-between font-semibold mb-1">
              <span className="text-purple-400">Technical Analysis</span>
              <span className="text-white">40% Weight</span>
            </div>
            <div className="w-full h-1.5 bg-[#1a1a3a] rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: "40%" }} />
            </div>
          </div>
          {/* Fund 35% */}
          <div className="bg-[#0a0a1a]/50 p-3 rounded-xl border border-[#1e1e4a]/40">
            <div className="flex justify-between font-semibold mb-1">
              <span className="text-indigo-400">Fundamental Analysis</span>
              <span className="text-white">35% Weight</span>
            </div>
            <div className="w-full h-1.5 bg-[#1a1a3a] rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: "35%" }} />
            </div>
          </div>
          {/* Sent 25% */}
          <div className="bg-[#0a0a1a]/50 p-3 rounded-xl border border-[#1e1e4a]/40">
            <div className="flex justify-between font-semibold mb-1">
              <span className="text-cyan-400">Headline Sentiment</span>
              <span className="text-white">25% Weight</span>
            </div>
            <div className="w-full h-1.5 bg-[#1a1a3a] rounded-full overflow-hidden">
              <div className="h-full bg-cyan-400 rounded-full" style={{ width: "25%" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-[10px] text-slate-600 mt-5 leading-normal">
        ⚠️ <strong>Regulatory Disclaimer:</strong> This report represents automated quantitative synthesis of market indicators. 
        It does not represent investment advice, recommendation, or offer to buy/sell securities. All decisions require independent validation.
      </p>
    </div>
  );
}

export default RecommendationCard;
