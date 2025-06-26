import React from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { doSignOut } from "../firebase/auth";

const Profile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await doSignOut();
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-96 border border-gray-800 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Mi Perfil</h2>
        <div className="mb-4">
          <span className="font-semibold">Email:</span>
          <div className="mt-1 text-gray-300">{currentUser?.email}</div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition font-semibold shadow mt-6"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Profile;
