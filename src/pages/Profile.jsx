import React from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { doSignOut } from "../firebase/auth";
import { User, Mail, BadgeCheck, ShieldCheck } from "lucide-react";

const Profile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await doSignOut();
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
      <div className="relative flex flex-col items-center w-full max-w-md p-2 sm:p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="absolute -top-16 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full border-4 border-gray-900 dark:border-white shadow-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
            {currentUser?.photoURL ? (
              <img src={currentUser.photoURL} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User size={64} className="text-gray-500 dark:text-gray-300" />
            )}
          </div>
          <span className="mt-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
            {currentUser?.displayName || "User"}
          </span>
        </div>
        <div className="h-20" />
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200">My Profile</h2>
        <div className="w-full space-y-4">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <Mail className="text-gray-500 dark:text-gray-300" size={22} />
            <div>
              <span className="block text-xs text-gray-500 dark:text-gray-400 font-semibold">Email</span>
              <span className="block text-base text-gray-800 dark:text-gray-100">{currentUser?.email || '-'}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <BadgeCheck className="text-indigo-500 dark:text-indigo-400" size={22} />
            <div>
              <span className="block text-xs text-gray-500 dark:text-gray-400 font-semibold">Provider</span>
              <span className="block text-base text-gray-800 dark:text-gray-100">{currentUser?.providerData?.map((p) => p.providerId).join(', ') || '-'}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <ShieldCheck className={
              currentUser?.emailVerified
                ? "text-green-500 dark:text-green-400"
                : "text-red-500 dark:text-red-400"
            } size={22} />
            <div>
              <span className="block text-xs text-gray-500 dark:text-gray-400 font-semibold">Email verified</span>
              <span className={`block text-base font-semibold ${currentUser?.emailVerified ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{currentUser?.emailVerified ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 text-white py-2 rounded-xl font-semibold shadow mt-10 text-lg transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:from-gray-800 hover:via-gray-900 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 active:scale-95"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Profile;
