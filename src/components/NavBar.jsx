import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";

function Navbar () {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();
    return (
        <nav className="bg-gray-900 px-4 py-3 flex items-center justify-between shadow-md">
            <div className="text-xl font-bold text-white">
                <Link to="/">API Assitant</Link>
            </div>
            <div className="flex gap-6 items-center">
                <Link to="/" className="text-gray-300 hover:text-white transition-colors font-medium">Home</Link>
                <Link to="/favorites" className="text-gray-300 hover:text-white transition-colors font-medium">Favoritos</Link>
                {userLoggedIn ? (
                    <Link
                        to="/profile"
                        className="ml-4 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 transition-colors w-10 h-10"
                        title="Perfil"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z" />
                        </svg>
                    </Link>
                ) : (
                    <>
                        <Link to="/login" className="ml-4 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 transition-colors w-10 h-10" title="Iniciar sesión">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z" />
                            </svg>
                        </Link>
                        <Link to="/register" className="text-sm text-blue-400 underline ml-2">Registrarse</Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar;