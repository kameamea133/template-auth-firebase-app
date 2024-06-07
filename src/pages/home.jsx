import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

function Home({ user, setUserFirstName }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [isSignUpActive, setIsSignUpActive] = useState(false);
    const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const handleMethodChange = () => {
        setIsSignUpActive(!isSignUpActive);
        setIsSignUpSuccess(false);
        setPasswordError('');
    };

    const handleSignup = () => {
        if (!email || !password || !firstName) return;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                setIsSignUpActive(false);
                setIsSignUpSuccess(true);
                setUserFirstName(firstName); // Set the user's first name
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };

    const handleSignIn = () => {
        if (!email || !password) return;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                setUserFirstName(firstName); // Set the user's first name
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        if (newPassword.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
        } else {
            setPasswordError('');
        }
    };
    const handleFirstNameChange = (event) => setFirstName(event.target.value);

    if (user) {
        return <Navigate to='/private' />;
    }

    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-blue-100">
            <h2 className="text-4xl font-bold text-blue-800 mb-8">Home Page</h2>
            <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <fieldset className="mb-4">
                    {isSignUpActive && <legend className="text-xl font-semibold text-orange-600 mb-2">Sign Up</legend>}
                    {!isSignUpActive && <legend className="text-xl font-semibold text-orange-600 mb-2">Sign In</legend>}
                    <ul>
                        {isSignUpActive && (
                            <li className="mb-4">
                                <label htmlFor="firstName" className="block text-blue-700 mb-2">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={handleFirstNameChange}
                                />
                            </li>
                        )}
                        <li className="mb-4">
                            <label htmlFor="email" className="block text-blue-700 mb-2">Email</label>
                            <input
                                type="text"
                                id="email"
                                className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleEmailChange}
                            />
                        </li>
                    </ul>
                </fieldset>
                <fieldset className="mb-4">
                    <legend className="text-xl font-semibold text-orange-600 mb-2">Password</legend>
                    <ul>
                        <li className="mb-4">
                            <label htmlFor="password" className="block text-blue-700 mb-2">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handlePasswordChange}
                            />
                            {passwordError && <p className="text-red-500 mt-2">{passwordError}</p>}
                        </li>
                    </ul>
                    {isSignUpActive && (
                        <button
                            type="button"
                            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200"
                            onClick={handleSignup}
                        >
                            Sign Up
                        </button>
                    )}
                    {!isSignUpActive && (
                        <button
                            type="button"
                            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200"
                            onClick={handleSignIn}
                        >
                            Sign In
                        </button>
                    )}
                </fieldset>
                {isSignUpSuccess && (
                    <p className="text-center text-green-600 mt-4">Registration successful! Please sign in.</p>
                )}
                {isSignUpActive && (
                    <button
                        className="block text-center mx-auto text-orange-500 hover:text-orange-700 mt-4"
                        onClick={handleMethodChange}
                    >
                        Login
                    </button>
                )}
                {!isSignUpActive && (
                    <button
                        className="block text-center mx-auto text-orange-500 hover:text-orange-700 mt-4"
                        onClick={handleMethodChange}
                    >
                        Create an account
                    </button>
                )}
            </form>
        </section>
    );
}

export default Home;
