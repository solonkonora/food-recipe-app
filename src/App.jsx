import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Tabs from "./components/Tabs";
import AuthPage from "./components/AuthPage";
import Welcome from "./components/Welcome";
import CategoryBrowse from "./components/CategoryBrowse";
import DataDeletion from "./dataDeletion";
import TermsOfService from "./termsOfService";
import PrivacyPolicy from "./privacyPolicy";
import { useAppContext } from "./context/AppContext";
import { useAuth } from "./context/AuthContext";

export default function App() {
    const { fetchRecipes } = useAppContext();
    const { user, loading: authLoading, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // fetch recipes for all users (both authenticated and unauthenticated)
        fetchRecipes();
    }, [fetchRecipes]);

    // show loading while checking auth
    if (authLoading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    // handler for auth requirement
    const handleLoginRequired = () => {
        navigate('/login');
    };

    const handleCategoryClick = (categoryName) => {
        navigate(`/category/${categoryName.toLowerCase()}`);
    };

    // Dashboard component for authenticated users
    const Dashboard = () => (
        <div className="container">
            <div className="app-header">
                <h2>
                    <span onClick={() => navigate('/')} className="app-logo-link" style={{ cursor: 'pointer' }}>
                        LocalBite
                    </span>
                </h2>
                <div className="user-section">
                    <span className="user-welcome">
                        Welcome, {user.full_name || user.username || user.email.split('@')[0]}!
                    </span>
                    <button onClick={logout} className="logout-button">
                        Logout
                    </button>
                </div>
            </div>
            <Tabs />
        </div>
    );

    return (
        <Routes>
            <Route path="/" element={
                user ? <Dashboard /> : (
                    <Welcome 
                        onGetStarted={() => navigate('/login')}
                        onCategoryClick={handleCategoryClick}
                        onLoginRequired={handleLoginRequired}
                    />
                )
            } />
            <Route path="/login" element={
                user ? <Dashboard /> : <AuthPage onBack={() => navigate('/')} />
            } />
            <Route path="/category/:categoryName" element={
                <CategoryBrowse 
                    onLoginRequired={handleLoginRequired}
                    onGetStarted={() => navigate('/login')}
                />
            } />
            <Route path="/data-deletion" element={<DataDeletion />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
    );
}
