import { useState } from "react";
import { Plus, Heart, Clock, UtensilsCrossed } from "lucide-react";
import AddRecipe from "./AddRecipe";
import FavoriteRecipes from "./favorite-meal";
import RecentRecipes from "./RecentRecipes";
import RecipesByCategory from "./RecipesByCategory";
import SearchBar from "./search-bar";
import "../assets/styles/tabs.css";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("recent");

  const tabs = [
    { id: "recent", label: "Recent", icon: Clock },
    { id: "recipes", label: "Recipes", icon: UtensilsCrossed },
    { id: "favorites", label: "Favorites", icon: Heart },
    { id: "add", label: "Add Recipe", icon: Plus },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "recent":
        return <RecentRecipes />;
      case "recipes":
        return <RecipesByCategory />;
      case "favorites":
        return <FavoriteRecipes />;
      case "add":
        return <AddRecipe />;
      default:
        return <RecentRecipes />;
    }
  };

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        <div className="tab-buttons-group">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
        
        <div className="search-bar-wrapper">
          <SearchBar />
        </div>
      </div>

      <div className="tabs-content">
        {renderTabContent()}
      </div>
    </div>
  );
}
