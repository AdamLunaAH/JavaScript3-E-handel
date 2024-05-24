// CartItem.tsx
import React from 'react';
import styles from './CartItem.module.css';
import {
    updateCartItemQuantity,
    removeCartItem,
    getCartItems,
} from '../../cartService/cartService';
import { CartItem as CartItemType } from '../../interface/types';

interface CartItemProps {
    item: CartItemType;
    updateCart: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, updateCart }) => {
    const increaseQuantity = async () => {
        updateCartItemQuantity(item.productId, item.quantity + 1);
        updateCart();
    };

    const decreaseQuantity = async () => {
        if (item.quantity > 1) {
            updateCartItemQuantity(item.productId, item.quantity - 1);
        } else {
            removeCartItem(item.productId);
        }
        updateCart();
    };

    return (
        <div className={styles['cart-item']}>
            <h2>{item.productName}</h2>
            <p>Price: ${item.productPrice.toFixed(2)}</p>
            <div className={styles['quantity-controls']}>
                <button onClick={decreaseQuantity}>-</button>
                <span>{item.quantity}</span>
                <button onClick={increaseQuantity}>+</button>
            </div>
            <p>Total: ${(item.productPrice * item.quantity).toFixed(2)}</p>
        </div>
    );
};

export default CartItem;
