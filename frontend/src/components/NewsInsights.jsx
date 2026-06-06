// NewsInsights.jsx — Displays real stock-related news harvested by the pipeline.
// Includes sentiment tag tags, publisher sources, and publication dates.

import React from "react";

function NewsInsights({ articles }) {
  if (!articles || articles.length === 0) {
    return (
      <div className="quantum-card mb-6">
        <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
          <span>📰</span> Recent News Insights
        </h3>
        <p className="text-slate-500 text-xs font-light">No recent news headlines available for this symbol.</p>
      </div>
    );
  }

  function getSentimentColor(sent) {
    const s = sent ? sent.toLowerCase() : "";
    if (s === "positive") return "text-emerald-400 border-emerald-500/20 bg-emerald-500/5";
    if (s === "negative") return "text-red-400 border-red-500/20 bg-red-500/5";
    return "text-slate-400 border-slate-550/20 bg-slate-500/5";
  }

  return (
    <div className="quantum-card mb-6 fade-in-up" style={{ animationDelay: "0.45s" }}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1e1e4a]/60 pb-3 mb-4">
        <div>
          <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Real-Time Streams</span>
          <h3 className="text-white font-bold text-sm mt-0.5 flex items-center gap-2">
            <span>📰</span> Harvested News Insights
          </h3>
        </div>
        <span className="px-2 py-0.5 rounded bg-purple-900/20 border border-purple-500/20 text-purple-400 text-[10px] font-mono font-bold">
          {articles.length} Feeds Harvester
        </span>
      </div>

      {/* Headlines List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[300px] overflow-y-auto pr-1">
        {articles.map((article, idx) => (
          <div 
            key={idx} 
            className="flex flex-col gap-2 p-3 bg-[#0a0a1a]/60 rounded-xl border border-[#1e1e4a]/40 hover:border-purple-500/30 transition-all duration-200"
          >
            {/* Title */}
            <a 
              href={article.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white text-xs font-medium hover:text-purple-400 transition-colors leading-relaxed line-clamp-2"
            >
              {article.title}
            </a>

            {/* Meta tags */}
            <div className="flex flex-wrap items-center gap-2 mt-auto pt-1 border-t border-[#1e1e4a]/20 text-[9px] font-medium text-slate-500">
              <span className="bg-[#101030] px-1.5 py-0.5 rounded border border-[#202050] text-slate-400">
                {article.source}
              </span>
              <span>•</span>
              <span>{article.publish_time}</span>
              <span className={`ml-auto px-1.5 py-0.5 rounded border font-bold uppercase tracking-wider text-[8px] ${getSentimentColor(article.sentiment)}`}>
                {article.sentiment}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsInsights;
