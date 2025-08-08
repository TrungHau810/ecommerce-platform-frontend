import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext(undefined);

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const exist = state.find(i => i.id === action.payload.id);
      if (exist) {
        return state.map(i => i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...state, 
        { ...action.payload, quantity: 1 }];
    }
    case 'UPDATE_QUANTITY':
      return state.map(i => i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i);
    case 'REMOVE_FROM_CART':

      return state.filter(i => i.id !== action.payload);
    case 'CLEAR_CART':

      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(reducer, []);

  const addToCart = (product) => dispatch({ type: 'ADD_TO_CART', payload: product });
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const getTotalAmount = () => (Array.isArray(cartItems) ? cartItems.reduce((s, i) => s + i.price * i.quantity, 0) : 0);
  const getTotalItems = () => (Array.isArray(cartItems) ? cartItems.reduce((s, i) => s + i.quantity, 0) : 0);

  return (
    <CartContext.Provider value={
        { cartItems, addToCart, updateQuantity, removeFromCart, clearCart, getTotalAmount, getTotalItems }
        
        }>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const cart = useContext(CartContext);
  return cart;
};