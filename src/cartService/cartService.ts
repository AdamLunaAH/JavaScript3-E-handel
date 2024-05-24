// cartService.ts
import { CartItem, Product } from '../interface/types';

const CART_KEY = 'shoppingCart';

export function addItemToCart(product: Product) {
    const cartItems: CartItem[] = getCartItems();
    const existingItem = cartItems.find(
        (item) => item.productId === product.id
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            productId: product.id,
            productName: product.name,
            productPrice: product.price,
            quantity: 1,
        });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
}

export function getCartItems(): CartItem[] {
    const cartItems = localStorage.getItem(CART_KEY);
    return cartItems ? JSON.parse(cartItems) : [];
}

export function updateCartItemQuantity(productId: string, quantity: number) {
    const cartItems: CartItem[] = getCartItems();
    const itemIndex = cartItems.findIndex(
        (item) => item.productId === productId
    );

    if (itemIndex !== -1) {
        if (quantity === 0) {
            cartItems.splice(itemIndex, 1);
        } else {
            cartItems[itemIndex].quantity = quantity;
        }
        localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    }
}

export function removeCartItem(productId: string) {
    const cartItems: CartItem[] = getCartItems();
    const updatedItems = cartItems.filter(
        (item) => item.productId !== productId
    );
    localStorage.setItem(CART_KEY, JSON.stringify(updatedItems));
}

export function clearCart() {
    localStorage.removeItem(CART_KEY);
}