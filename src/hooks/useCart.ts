import { useState, useEffect } from 'react';
import { Product } from '@/types';

export function useCart() {
  const [cart, setCart] = useState<(Product & { quantity: number })[]>([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
      setCartCount(parsedCart.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0));
    }
  }, []);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      let newCart;

      if (existingItem) {
        newCart = prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...prevCart, { ...product, quantity: 1 }];
      }

      localStorage.setItem('cart', JSON.stringify(newCart));
      setCartCount(newCart.reduce((sum, item) => sum + item.quantity, 0));
      return newCart;
    });
  };

  return { cart, cartCount, addToCart };
} 