// Cart.tsx
import React, { useEffect, useState } from 'react';
import {
    getCartItems,
    updateCartItemQuantity,
    removeCartItem,
    clearCart,
} from '../../cartService/cartService';
import CartItemComponent from './CartItem'; // Renaming to avoid confusion
import { CartItem } from '../../interface/types'; // Importing the type
import styles from './Cart.module.css';

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>(getCartItems());

    const updateCart = () => {
        setCartItems(getCartItems());
    };

    const handleClearCart = () => {
        clearCart();
        setCartItems([]);
    };

    return (
        <div className={styles['cart-page']}>
            <h1>Shopping Cart</h1>
            {cartItems.length > 0 ? (
                <div>
                    {cartItems.map((item) => (
                        <CartItemComponent
                            key={item.productId}
                            item={item}
                            updateCart={updateCart}
                        />
                    ))}

                    <button className={styles['checkout-button']}>
                        Checkout
                    </button><br></br>
                    <button onClick={handleClearCart}>Clear Cart</button>
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
