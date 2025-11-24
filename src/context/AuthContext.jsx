/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../api/apiClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in on mount
    const checkAuth = async () => {
      try {
        const data = await api.getCurrentUser();
        setUser(data.user);
      } catch (error) {
        // Not logged in or token expired
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // Handle OAuth callback
    // When user returns from Google/Facebook, URL will have ?auth=success&token=...
    const urlParams = new URLSearchParams(window.location.search);
    const authSuccess = urlParams.get('auth') === 'success';
    const token = urlParams.get('token');

    if (authSuccess && token) {
      // Store token in localStorage for subsequent requests
      localStorage.setItem('authToken', token);
      
      // Remove query params from URL
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Fetch user data with the new token
      checkAuth();
    } else {
      // Normal auth check
      checkAuth();
    }
  }, []);

  const signUp = async (email, password, full_name) => {
    const data = await api.signup(email, password, full_name);
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }
    setUser(data.user);
    return data;
  };

  const signIn = async (email, password) => {
    const data = await api.login(email, password);
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    await api.logout();
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signUp, signIn, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
