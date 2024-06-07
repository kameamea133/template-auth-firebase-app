import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Private from './pages/private';
import Private2 from './pages/private2';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import ProtectedRoute from './components/protectedRoute';

function App() {
    const [user, setUser] = useState(null);
    
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setIsFetching(false);
                return;
            }

            setUser(null);
            setIsFetching(false);
        });

        return () => unsubscribe();
    }, []);

    if (isFetching) {
        return <h2>Loading...</h2>;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route index path='/' element={<Home user={user} />} />
                <Route
                    path='/private'
                    element={
                        <ProtectedRoute user={user}>
                            <Private  />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/private2'
                    element={
                        <ProtectedRoute user={user}>
                            <Private2 />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
