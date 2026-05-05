import { useCallback, useEffect, useState } from "react";
import InjectPanel from "./components/InjectPanel.jsx";
import LogChart from "./components/LogChart.jsx";
import LogTable from "./components/LogTable.jsx";
import StatsBar from "./components/StatsBar.jsx";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

async function requestJson(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    let message = `Request failed: ${response.status}`;
    try {
      const payload = await response.json();
      if (payload?.error) {
        message = payload.error;
      }
    } catch {
      // Intentionally ignore parse errors and keep fallback message.
    }
    throw new Error(message);
  }
  return response.json();
}

function App() {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({ INFO: 0, WARN: 0, ERROR: 0, total: 0 });
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");

  const fetchLogs = useCallback(async () => {
    const data = await requestJson(`${API_BASE}/logs`);
    setLogs(Array.isArray(data) ? data : []);
  }, []);

  const fetchStats = useCallback(async () => {
    const data = await requestJson(`${API_BASE}/logs/stats`);
    setStats({
      INFO: data?.INFO ?? 0,
      WARN: data?.WARN ?? 0,
      ERROR: data?.ERROR ?? 0,
      total: data?.total ?? 0
    });
  }, []);

  const refreshAll = useCallback(async () => {
    try {
      setError("");
      await Promise.all([fetchLogs(), fetchStats()]);
    } catch (err) {
      setError(err.message || "Unable to fetch data from backend.");
    } finally {
      setLoadingLogs(false);
      setLoadingStats(false);
    }
  }, [fetchLogs, fetchStats]);

  useEffect(() => {
    refreshAll();
    const timer = setInterval(refreshAll, 3000);
    return () => clearInterval(timer);
  }, [refreshAll]);

  const handleInject = async (payload) => {
    try {
      setPosting(true);
      setError("");
      await requestJson(`${API_BASE}/logs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      await refreshAll();
    } catch (err) {
      setError(err.message || "Failed to post log.");
    } finally {
      setPosting(false);
    }
  };

  const handleClear = async () => {
    try {
      setError("");
      await requestJson(`${API_BASE}/logs`, { method: "DELETE" });
      await refreshAll();
    } catch (err) {
      setError(err.message || "Failed to clear logs.");
    }
  };

  return (
    <div className="app-shell">
      <header>
        <h1>Log Monitoring Dashboard</h1>
        <p>Realtime logs from Flask + MongoDB</p>
      </header>

      {error ? (
        <p className="error-banner">
          {error}. Make sure Flask backend is running on <strong>http://localhost:5000</strong>.
        </p>
      ) : null}

      <StatsBar stats={stats} loading={loadingStats} />

      <div className="top-grid">
        <InjectPanel onInject={handleInject} posting={posting} />
        <LogChart stats={stats} />
      </div>

      <LogTable logs={logs} loading={loadingLogs} onClear={handleClear} />
    </div>
  );
}

export default App;