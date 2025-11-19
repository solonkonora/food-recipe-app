import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/search-bar";
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
    const [showWelcome, setShowWelcome] = useState(true);

    // Check current path for static pages
    const currentPath = window.location.pathname;
    const isDataDeletionPage = currentPath === '/data-deletion';
    const isTermsPage = currentPath === '/terms-of-service';
    const isPrivacyPage = currentPath === '/privacy-policy';

    useEffect(() => {
        if (user) {
            setShowWelcome(false);
            fetchRecipes();
        }
    }, [fetchRecipes, user]);

    // Show static pages if path matches
    if (isDataDeletionPage) {
        return <DataDeletion />;
    }

    if (isTermsPage) {
        return <TermsOfService />;
    }

    if (isPrivacyPage) {
        return <PrivacyPolicy />;
    }

    // Show loading while checking auth
    if (authLoading) {
        return (
            <div className="loading-container">
                <p className="loading-text">Loading...</p>
            </div>
        );
    }

    // Show welcome page for first-time visitors
    if (!user && showWelcome) {
        return <Welcome onGetStarted={() => setShowWelcome(false)} />;
    }

    // Show auth page if not logged in
    if (!user) {
        return <AuthPage onBack={() => setShowWelcome(true)} />;
    }

    // Show recipe dashboard for authenticated users
    return (
        <>
            <div className="container">
                <div className="app-header">
                    <h2>🍽️ LocalBite</h2>
                    <div className="user-section">
                        <span className="user-welcome">Welcome, {user.username || user.email}!</span>
                        <button onClick={logout} className="logout-button">
                            Logout
                        </button>
                    </div>
                </div>
                <SearchBar />
                <Tabs />
            </div>
        </>
    );
}
