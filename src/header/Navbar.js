import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
    const { user } = useAuth();
    const isAdmin = user?.authorities?.includes('ROLE_ADMIN');

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-xl font-bold">Home</Link>
                
                <div className="flex space-x-4">
                    {user ? (
                        <>
                            <Link to="/markets" className="text-white">Markets</Link>
                            <Link to="/subscription" className="text-white">Subscription</Link>
                            <Link to="/wallet" className="text-white">Wallet</Link>
                            <Link to="/profile" className="text-white">Profile</Link>
                            {isAdmin && (
                                <>
                                    <Link to="/Subscriptionadminhome" className="text-white">Admin Subscription</Link>
                                    <Link to="/batch" className="text-white">Batch</Link>
                                    <Link to="/log" className="text-white">Logs</Link>
                                </>
                            )}
                            <button 
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    window.location.reload();
                                }}
                                className="text-white"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/user" className="text-white">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;