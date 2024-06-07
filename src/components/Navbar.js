import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

function Navbar() {
    // Handle user sign-out
    const handleSignOut = () => {
        signOut(auth)
            .then(() => console.log("Sign Out"))
            .catch((error) => console.log(error));
    };

    return (
        <nav className="bg-transparent p-4 shadow-lg sticky top-0 z-50 flex justify-between items-center">
            <h2 className='text-white text-2xl font-bold shadow-xl p-2'>Mon espace personnel</h2>
            <ul className="flex justify-end mr-[200px]">
                <li>
                    <Link to="/private" className="text-white mx-5 font-semibold hover:text-gray-200">Private Page 1</Link>
                </li>
                <li>
                    <Link to="/private2" className="text-white font-semibold mx-5 hover:text-gray-200">Private Page 2</Link>
                </li>
            </ul>
            <div>
                 <button
                        onClick={handleSignOut}
                        className="text-white text-xl bg-blue-500/30 p-3 rounded-2xl font-semibold hover:text-gray-200 hover:bg-blue-500/70"
                    >
                        Sign Out
                    </button>
            </div>
        </nav>
    );
}

export default Navbar;
