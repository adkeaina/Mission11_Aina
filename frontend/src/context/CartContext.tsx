import { createContext, ReactNode, useContext, useState } from "react";
import { CartItem } from "../types/CartItem";

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (bookId: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        const existingBook = cart.find((b) => b.bookId === item.bookId);
        if (existingBook) {
            setCart(cart.map((book: CartItem) => book.bookId === item.bookId ? { ...book, quantity: book.quantity + item.quantity } : book));
        } else {
            setCart([...cart, item ]);
        }
    };

    const removeFromCart = (bookId: number) => {
        const existingBook = cart.find((b) => b.bookId === bookId);
        if (existingBook && existingBook.quantity > 1) {
            setCart(cart.map((book: CartItem) => book.bookId === bookId ? { ...book, quantity: book.quantity - 1 } : book));
        } else {
            setCart(cart.filter((book: CartItem) => book.bookId !== bookId));
        }
    };

    const clearCart = () => {
        setCart([]);
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    )
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}