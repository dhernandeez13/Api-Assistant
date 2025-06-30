import { useApiContext } from "../contexts/ApiContext"
import { useState } from "react"

function ApiCard({ api }) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useApiContext()
    const favorite = isFavorite(api.id)

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) {
            removeFromFavorites(api.id)
        } else {
            addToFavorites(api)
        }
    }

    const shortDescription = api.description
        ? api.description.length > 120
            ? api.description.slice(0, 120) + "..."
            : api.description
        : "Sin descripción";

    const imageUrl = api.owner?.avatar_url || "https://avatars.githubusercontent.com/u/9919?v=4";

    return (
        <div className="relative rounded-lg overflow-hidden bg-white dark:bg-gray-900 shadow-lg flex flex-col h-full transition-transform duration-200 hover:-translate-y-1 transition-colors">
            <div className="relative flex items-center justify-center h-48 bg-gray-200 dark:bg-gray-800">
                <img src={imageUrl} alt="avatar" className="w-24 h-24 rounded-full object-cover shadow-md" />
                <button
                    className={`favorite-btn absolute top-3 right-3 text-2xl z-10 transition-colors duration-200 ${favorite ? "text-red-500" : "text-gray-400 dark:text-gray-300"}`}
                    onClick={onFavoriteClick}
                    style={{ background: 'none', border: 'none', outline: 'none', boxShadow: 'none' }}
                >
                    ♥
                </button>
            </div>
            <div className="p-4 flex-1 flex flex-col gap-2">
                <h3 className="mb-1 text-base font-semibold text-gray-900 dark:text-white">
                    <a href={api.html_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {api.full_name}
                    </a>
                </h3>
                <p className="mb-2 text-gray-700 dark:text-gray-300 text-sm">{shortDescription}</p>
                <div className="flex flex-wrap gap-4 mb-2 text-sm">
                    <span title="Favorites" className="flex items-center gap-1 text-yellow-500 dark:text-yellow-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="feather feather-star">
                            <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847L19.335 24 12 19.897 4.665 24 6 15.27l-6-5.847 8.332-1.268z"/>
                        </svg>
                        {api.stargazers_count}
                    </span>
                    <span title="Forks" className="flex items-center gap- text-green-600 dark:text-green-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-git-branch">
                            <circle cx="6" cy="6" r="3"/>
                            <circle cx="6" cy="18" r="3"/>
                            <circle cx="18" cy="6" r="3"/>
                            <path d="M6 9v6a3 3 0 0 0 3 3h3"/>
                            <line x1="18" y1="9" x2="18" y2="21"/>
                        </svg>
                        {api.forks_count}
                    </span>
                    <span title="Issues" className="flex items-center gap-1 text-pink-500 dark:text-pink-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M8 2.75a5.25 5.25 0 1 0 0 10.5A5.25 5.25 0 0 0 8 2.75ZM1.25 8a6.75 6.75 0 1 1 13.5 0A6.75 6.75 0 0 1 1.25 8Zm6.5-2.25a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0v-3.5ZM8 11.25a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" fill="currentColor"/></svg>
                        {api.open_issues_count}
                    </span>
                    <span title="Language" className="flex items-center gap-1 text-blue-500 dark:text-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-code">
                            <polyline points="16 18 22 12 16 6"/>
                            <polyline points="8 6 2 12 8 18"/>
                        </svg>
                        {api.language || "Desconocido"}
                    </span>
                    <span title="User" className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                        </svg>
                        {api.owner?.login}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ApiCard