import { useApiContext } from "../contexts/ApiContext"
import { useState } from "react"

function ApiCard({ api }) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useApiContext()
    const favorite = isFavorite(api.id)
    const [copied, setCopied] = useState(false)

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) {
            removeFromFavorites(api.id)
        } else {
            addToFavorites(api)
        }
    }

    async function onShareClick(e) {
        e.preventDefault()
        const url = api.html_url
        const title = api.full_name
        const text = api.description || "Mira esta API: " + title
        if (navigator.share) {
            try {
                await navigator.share({ title, text, url })
            } catch (err) {
                // El usuario canceló o hubo error
            }
        } else {
            try {
                await navigator.clipboard.writeText(url)
                setCopied(true)
                setTimeout(() => setCopied(false), 1200)
            } catch (err) {
                // Error al copiar
            }
        }
    }

    const shortDescription = api.description
        ? api.description.length > 120
            ? api.description.slice(0, 120) + "..."
            : api.description
        : "No description available";

    const imageUrl = api.owner?.avatar_url || "https://avatars.githubusercontent.com/u/9919?v=4";

    return (
        <div className="relative rounded-lg overflow-hidden bg-white dark:bg-gray-900 shadow-lg flex flex-col h-full transition-transform duration-200 hover:-translate-y-1 transition-colors">
            <div className="relative flex items-center justify-center h-48 bg-gray-200 dark:bg-gray-800">
                <img src={imageUrl} alt="avatar" className="w-24 h-24 rounded-full object-cover shadow-md" />
                <div className="absolute top-3 right-3 flex gap-2 z-10">
                    <button
                        onClick={onShareClick}
                        className="text-xl text-blue-500 hover:text-blue-700 transition-colors bg-white dark:bg-gray-900 rounded-full p-1 shadow-md"
                        title="Compartir"
                        style={{ background: 'none', border: 'none', outline: 'none', boxShadow: 'none' }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 48 48" fill="currentColor">
                            <circle cx="36" cy="12" r="4"/>
                            <circle cx="12" cy="24" r="4"/>
                            <circle cx="36" cy="36" r="4"/>
                            <path d="M14.83 25.94l14.34 8.12M29.17 13.94l-14.34 8.12" stroke="#2196f3" stroke-width="3" fill="none"/>
                        </svg>
                    </button>
                    <button
                        onClick={onFavoriteClick}
                        className={`favorite-btn text-2xl transition-colors duration-200 ${favorite ? "text-red-500" : "text-gray-400 dark:text-gray-300"}`}
                        style={{ background: 'none', border: 'none', outline: 'none', boxShadow: 'none' }}
                    >
                        ♥
                    </button>
                </div>
                {copied && (
                    <div className="absolute top-2 right-12 bg-green-500 text-white px-2 py-1 rounded text-xs shadow-lg animate-fadeInOut pointer-events-none">
                        Link copied!
                    </div>
                )}
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <circle cx="12" cy="16" r="1" />
                        </svg>
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