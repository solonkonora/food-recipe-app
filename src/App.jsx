import { useEffect, useState } from "react";
import "./App.css";
import Tabs from "./components/Tabs";
import AuthPage from "./components/AuthPage";
import Welcome from "./components/Welcome";
import DataDeletion from "./dataDeletion";
import TermsOfService from "./termsOfService";
import PrivacyPolicy from "./privacyPolicy";
import { useAppContext } from "./context/AppContext";
import { useAuth } from "./context/AuthContext";

export default function App() {
    const { fetchRecipes } = useAppContext();
    const { user, loading: authLoading, logout } = useAuth();
    const [currentView, setCurrentView] = useState('welcome'); // 'welcome', 'browse', 'auth', 'dashboard'
    const [selectedCategory, setSelectedCategory] = useState(null);

    // check current path for static pages
    const currentPath = window.location.pathname;
    const isDataDeletionPage = currentPath === '/data-deletion';
    const isTermsPage = currentPath === '/terms-of-service';
    const isPrivacyPage = currentPath === '/privacy-policy';

    useEffect(() => {
        // fetch recipes for all users (both authenticated and unauthenticated)
        fetchRecipes();
        
        if (user) {
            setCurrentView('dashboard');
        }
    }, [fetchRecipes, user]);

    // show static pages if path matches
    if (isDataDeletionPage) {
        return <DataDeletion />;
    }

    if (isTermsPage) {
        return <TermsOfService />;
    }

    if (isPrivacyPage) {
        return <PrivacyPolicy />;
    }

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
        setCurrentView('auth');
    };

    const handleBackToWelcome = () => {
        setCurrentView('welcome');
        setSelectedCategory(null);
    };

    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(categoryName);
        setCurrentView('browse');
    };

    // show auth page if user wants to log in
    if (currentView === 'auth' && !user) {
        return <AuthPage onBack={handleBackToWelcome} />;
    }

    // show recipe dashboard for authenticated users
    if (user && currentView === 'dashboard') {
        return (
            <>
                <div className="container">
                    <div className="app-header">
                        <h2><a href="/" className="app-logo-link">LocalBite</a></h2>
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
            </>
        );
    }

    // show welcome page with browseable content for all users
    return (
        <Welcome 
            onGetStarted={() => setCurrentView('auth')}
            onCategoryClick={handleCategoryClick}
            selectedCategory={selectedCategory}
            onLoginRequired={handleLoginRequired}
            currentView={currentView}
            onBackToHome={handleBackToWelcome}
        />
    );
}
