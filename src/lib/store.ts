import { create } from 'zustand';
import { Product } from './mockData';

interface CartItem extends Product {
  quantity: number;
}

interface StoreState {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useStore = create<StoreState>((set, get) => ({
  cart: [],
  wishlist: [],
  
  addToCart: (product) => {
    const { cart } = get();
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      set({
        cart: cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({ cart: [...cart, { ...product, quantity: 1 }] });
    }
  },
  
  removeFromCart: (productId) => {
    set({ cart: get().cart.filter(item => item.id !== productId) });
  },
  
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    
    set({
      cart: get().cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ),
    });
  },
  
  clearCart: () => set({ cart: [] }),
  
  toggleWishlist: (product) => {
    const { wishlist } = get();
    const exists = wishlist.find(item => item.id === product.id);
    
    if (exists) {
      set({ wishlist: wishlist.filter(item => item.id !== product.id) });
    } else {
      set({ wishlist: [...wishlist, product] });
    }
  },
  
  isInWishlist: (productId) => {
    return get().wishlist.some(item => item.id === productId);
  },
  
  getCartTotal: () => {
    return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },
  
  getCartCount: () => {
    return get().cart.reduce((count, item) => count + item.quantity, 0);
  },
}));
