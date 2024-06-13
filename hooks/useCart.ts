import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Pizza {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity?: number;
}

const CART_KEY = 'user_cart';

const useCart = () => {
  const [cart, setCart] = useState<Pizza[]>([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem(CART_KEY);
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Failed to load cart from storage', error);
      }
    };

    loadCart();
  }, []);

  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
      } catch (error) {
        console.error('Failed to save cart to storage', error);
      }
    };

    saveCart();
  }, [cart]);

  const addToCart = (item: Pizza) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? {...cartItem, quantity: (cartItem.quantity || 1) + 1}
            : cartItem,
        );
      }
      return [...prevCart, {...item, quantity: 1}];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
  };
};

export default useCart;
