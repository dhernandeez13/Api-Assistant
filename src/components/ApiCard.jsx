import { useApiContext } from "../contexts/ApiContext"
import { useState } from "react"

function ApiCard({ api }) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useApiContext()
    const favorite = isFavorite(api.id)
    const [showAdded, setShowAdded] = useState(false)

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) {
            removeFromFavorites(api.id)
        } else {
            addToFavorites(api)
            setShowAdded(true)
            setTimeout(() => setShowAdded(false), 1200)
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
                    <span title="Estrellas" className="flex items-center gap-1 text-yellow-500 dark:text-yellow-400">
                        ⭐ {api.stargazers_count}
                    </span>
                    <span title="Forks" className="flex items-center gap-1 text-green-600 dark:text-green-400">
                        🍴 {api.forks_count}
                    </span>
                    <span title="Issues abiertas" className="flex items-center gap-1 text-pink-500 dark:text-pink-400">
                        🐞 {api.open_issues_count}
                    </span>
                    <span title="Lenguaje principal" className="flex items-center gap-1 text-blue-500 dark:text-blue-400">
                        📝 {api.language || "Desconocido"}
                    </span>
                    <span title="Propietario" className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                        👤 {api.owner?.login}
                    </span>
                </div>
            </div>
            {showAdded && (
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-7 py-3 rounded-full font-bold text-lg shadow-lg z-20 animate-fadeInOut pointer-events-none">
                    ¡Añadido a favoritos!
                </div>
            )}
        </div>
    )
}

export default ApiCard