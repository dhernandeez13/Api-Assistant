import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

// Modern trash icon SVG
const TrashIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M9 3a1 1 0 0 0-1 1v1H4.75A.75.75 0 0 0 4 5.75c0 .414.336.75.75.75h14.5a.75.75 0 0 0 0-1.5H16V4a1 1 0 0 0-1-1H9Zm1 2V4h4v1h-4Z" />
    <path fillRule="evenodd" d="M6.25 7A.75.75 0 0 0 5.5 7.75v10A3.25 3.25 0 0 0 8.75 21h6.5A3.25 3.25 0 0 0 18.5 17.75v-10a.75.75 0 0 0-.75-.75h-11Zm1.5 2.25a.75.75 0 0 1 1.5 0v7.5a.75.75 0 0 1-1.5 0v-7.5Zm4.5-.75a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-1.5 0v-7.5a.75.75 0 0 1 .75-.75Zm3 .75a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 1.5 0v-7.5Z" clipRule="evenodd" />
  </svg>
);

const History = () => {
  const [history, setHistory] = useState([]);
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/login");
      return;
    }
    try {
      const data = JSON.parse(localStorage.getItem("apiHistory") || "[]");
      setHistory(data);
    } catch (e) {
      setHistory([]);
    }
  }, [userLoggedIn, navigate]);

  const clearHistory = () => {
    localStorage.removeItem("apiHistory");
    setHistory([]);
  };

  return (
    <div className="p-4 pt-20 mt-10 min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-xl mx-auto relative">
        {/* Contenedor centrado para el icono y el título */}
        <div className="relative mb-6">
          <h2 className="text-2xl font-bold text-center">API History</h2>
          <button
            onClick={clearHistory}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-red-500 hover:text-white dark:hover:bg-red-600 transition-colors duration-200 shadow disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={history.length === 0}
            title="Clear history"
          >
            <TrashIcon className="w-7 h-7" />
          </button>
        </div>
        {history.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400">You haven't visited any API yet.</div>
        ) : (
          <ul className="space-y-4">
            {history.map((item, idx) => (
              <li
                key={item.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow opacity-0 animate-pop-in"
                style={{ animationDelay: `${idx * 80}ms`, animationFillMode: 'forwards' }}
              >
                <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-full object-cover border border-gray-300 dark:border-gray-600" />
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-lg text-blue-700 dark:text-white hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-200 underline-offset-4 hover:underline focus:underline focus:outline-none"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Custom animation for pop-in */}
      <style>{`
        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.95) translateY(20px); }
          60% { opacity: 1; transform: scale(1.03) translateY(-2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-pop-in {
          opacity: 0;
          transform: scale(0.95) translateY(20px);
          animation: pop-in 0.5s cubic-bezier(.4,0,.2,1) forwards;
        }
      `}</style>
    </div>
  );
};

export default History; 