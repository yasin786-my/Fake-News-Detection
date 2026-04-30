const HISTORY_KEY = 'rag_news_history';
const MAX_ITEMS = 10;

export const saveToHistory = (analysis) => {
  try {
    const history = getHistory();
    const item = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      content: analysis.content.substring(0, 120) + '...',
      verdict: analysis.verdict,
      confidence: analysis.confidence,
      fullData: analysis,
    };
    const updated = [item, ...history].slice(0, MAX_ITEMS);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) { return []; }
};

export const getHistory = () => {
  try {
    const s = localStorage.getItem(HISTORY_KEY);
    return s ? JSON.parse(s) : [];
  } catch (e) { return []; }
};

export const clearHistory = () => {
  try { localStorage.removeItem(HISTORY_KEY); } catch (e) {}
};

export const deleteHistoryItem = (id) => {
  try {
    const updated = getHistory().filter(i => i.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) { return getHistory(); }
};
