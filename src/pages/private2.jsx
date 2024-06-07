import React from 'react';
import Navbar from '../components/Navbar';

function Private2() {
    return (
        <div className="min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1615028427098-f2185474eeb3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}>
            <Navbar />
            <div className="flex flex-col items-center justify-center flex-grow bg-black bg-opacity-50">
                <h2 className="text-3xl font-bold text-white mt-8">Welcome</h2>
            </div>
        </div>
    );
}

export default Private2;
