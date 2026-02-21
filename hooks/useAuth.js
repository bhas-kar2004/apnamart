"use client";
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isMounted, setIsMounted] = useState(false); // Prevents hydration errors

  useEffect(() => {
    setIsMounted(true);
    // Check if a user is already logged in when the app loads
    const storedUser = localStorage.getItem('apnamart_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Sync across tabs and components
    const syncAuth = () => {
      const updatedUser = localStorage.getItem('apnamart_user');
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener('auth-updated', syncAuth);
    window.addEventListener('storage', syncAuth);

    return () => {
      window.removeEventListener('auth-updated', syncAuth);
      window.removeEventListener('storage', syncAuth);
    };
  }, []);

  const login = (email) => {
    // Create a dummy user object based on their email
    const newUser = { email, name: email.split('@')[0] }; 
    localStorage.setItem('apnamart_user', JSON.stringify(newUser));
    setUser(newUser);
    window.dispatchEvent(new Event('auth-updated')); // Tell Navbar to update!
  };

  const logout = () => {
    localStorage.removeItem('apnamart_user');
    setUser(null);
    window.dispatchEvent(new Event('auth-updated'));
  };

  return { user, login, logout, isMounted };
};