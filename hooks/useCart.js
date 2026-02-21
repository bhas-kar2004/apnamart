"use client";
import { useState, useEffect } from 'react';

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('apnamart_cart');
    if (storedCart) setCartItems(JSON.parse(storedCart));

    const syncCart = () => {
      const updatedCart = localStorage.getItem('apnamart_cart');
      setCartItems(updatedCart ? JSON.parse(updatedCart) : []);
    };

    window.addEventListener('cart-updated', syncCart);
    window.addEventListener('storage', syncCart);

    return () => {
      window.removeEventListener('cart-updated', syncCart);
      window.removeEventListener('storage', syncCart);
    };
  }, []);

  const saveCart = (newCart) => {
    localStorage.setItem('apnamart_cart', JSON.stringify(newCart));
    setCartItems(newCart);
    window.dispatchEvent(new Event('cart-updated')); 
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    let newCart;
    if (existingItem) {
      newCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCart = [...cartItems, { ...product, quantity: 1 }];
    }
    saveCart(newCart);
  };

  // --- NEW: Function to decrease quantity ---
  const decreaseQuantity = (id) => {
    const existingItem = cartItems.find((item) => item.id === id);
    if (existingItem.quantity === 1) {
      removeFromCart(id); // If it's 1, remove it completely
    } else {
      const newCart = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
      saveCart(newCart);
    }
  };

  const removeFromCart = (id) => {
    const newCart = cartItems.filter((item) => item.id !== id);
    saveCart(newCart);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return { cartItems, addToCart, decreaseQuantity, removeFromCart, cartCount };
};