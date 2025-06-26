import { Link } from "react-router-dom";

function Navbar () {
    return (
        <nav className="bg-gray-900 px-4 py-3 flex items-center justify-between shadow-md">
            <div className="text-xl font-bold text-white">
                <Link to="/">API Assitant</Link>
            </div>
            <div className="flex gap-6">
                <Link to="/" className="text-gray-300 hover:text-white transition-colors font-medium">Home</Link>
                <Link to="/favorites" className="text-gray-300 hover:text-white transition-colors font-medium">Favoritos</Link>
            </div>
        </nav>
    )
}

export default Navbar;