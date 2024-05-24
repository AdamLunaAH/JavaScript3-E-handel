// src/components/ProductDetail/ProductDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../main';
import { doc, getDoc } from 'firebase/firestore';
import styles from './ProductDetail.module.css';

import {
    addItemToCart,
    updateCartItemQuantity,
    getCartItems,
} from '../../cartService/cartService';
import { Product, CartItem } from '../../interface/types';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);;
    const [cartItems, setCartItems] = useState<CartItem[]>(getCartItems());

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                const productRef = doc(db, 'products', id);
                const productSnap = await getDoc(productRef);
                if (productSnap.exists()) {
                    setProduct({
                        id: productSnap.id,
                        name: productSnap.data().name,
                        price: Number(productSnap.data().price),
                        description: productSnap.data().description,
                        imageUrl: productSnap.data().imageUrl,
                        quantity: Number(productSnap.data().quantity), // product quantity
                    });
                }
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) {
        return <p>Loading...</p>;
    }

    const handleAddToCart = (product: Product) => {
        addItemToCart(product);
        setCartItems(getCartItems());
    };

    const increaseQuantity = (product: Product) => {
        const cartItem = cartItems.find(
            (item) => item.productId === product.id
        );
        if (cartItem) {
            updateCartItemQuantity(product.id, cartItem.quantity + 1);
        } else {
            addItemToCart(product);
        }
        setCartItems(getCartItems());
    };

    const decreaseQuantity = (productId: string) => {
        const cartItem = cartItems.find((item) => item.productId === productId);
        if (cartItem) {
            updateCartItemQuantity(productId, cartItem.quantity - 1);
            setCartItems(getCartItems());
        }
    };

    const getCartQuantity = (productId: string): number => {
        const cartItem = cartItems.find((item) => item.productId === productId);
        return cartItem ? cartItem.quantity : 0;
    };

    return (
        <section className={styles['product-detail']}>
            <img
                src={`src/assets/product-img/${product.imageUrl}`}
                alt={product.name}
            />
            <div>
                <h1>{product.name}</h1>
                <p>Price: ${product.price.toFixed(2)}</p>
                <p>{product.description}</p>
                {product.quantity > 0 ? (
                    <div>
                        <button onClick={() => handleAddToCart(product)}>
                            Add to Cart
                        </button>
                        <div>
                            <button
                                onClick={() => decreaseQuantity(product.id)}
                            >
                                -
                            </button>
                            <span>{getCartQuantity(product.id)}</span>
                            <button onClick={() => increaseQuantity(product)}>
                                +
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className={styles['out-of-stock']}>Out of Stock</p>
                )}
            </div>
        </section>
    );
};

export default ProductDetail;
