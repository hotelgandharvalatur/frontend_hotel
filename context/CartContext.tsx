"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MenuItem } from "@/types";

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  landmark: string;
  notes: string;
}

interface CartContextType {
  cartItems: CartItem[];
  customerDetails: CustomerDetails;
  setCustomerDetails: (details: Partial<CustomerDetails> | ((prev: CustomerDetails) => CustomerDetails)) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (item: MenuItem, quantity?: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  getItemQuantity: (itemId: string) => number;
  totalItems: number;
  subtotal: number;
}

const CART_STORAGE_KEY = "gandharva_cart_items";
const CUSTOMER_STORAGE_KEY = "gandharva_customer_details";

const defaultCustomerDetails: CustomerDetails = {
  name: "",
  phone: "",
  address: "",
  landmark: "",
  notes: "",
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [customerDetails, setCustomerDetailsState] = useState<CustomerDetails>(defaultCustomerDetails);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
      const storedCustomer = localStorage.getItem(CUSTOMER_STORAGE_KEY);
      if (storedCustomer) {
        setCustomerDetailsState(JSON.parse(storedCustomer));
      }
    } catch (e) {
      console.error("Failed to parse cart storage", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart storage", e);
    }
  }, [cartItems, isInitialized]);

  // Save customer details to localStorage on changes
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customerDetails));
    } catch (e) {
      console.error("Failed to save customer storage", e);
    }
  }, [customerDetails, isInitialized]);

  const setCustomerDetails = (
    details: Partial<CustomerDetails> | ((prev: CustomerDetails) => CustomerDetails)
  ) => {
    setCustomerDetailsState((prev) => {
      if (typeof details === "function") {
        return details(prev);
      }
      return { ...prev, ...details };
    });
  };

  const addToCart = (item: MenuItem, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((ci) => ci.item._id === item._id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [...prevItems, { item, quantity }];
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((ci) =>
        ci.item._id === itemId ? { ...ci, quantity } : ci
      )
    );
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((ci) => ci.item._id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getItemQuantity = (itemId: string) => {
    const found = cartItems.find((ci) => ci.item._id === itemId);
    return found ? found.quantity : 0;
  };

  const totalItems = cartItems.reduce((acc, ci) => acc + ci.quantity, 0);

  const subtotal = cartItems.reduce(
    (acc, ci) => acc + ci.item.price * ci.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        customerDetails,
        setCustomerDetails,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getItemQuantity,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
