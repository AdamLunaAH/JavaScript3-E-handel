// ProductList.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../main';
import { collection, getDocs } from 'firebase/firestore';
import styles from './ProductList.module.css';
import {
    addItemToCart,
    updateCartItemQuantity,
    getCartItems,
} from '../../cartService/cartService';
import { Product, CartItem } from '../../interface/types';

// ProductList function
const ProductList: React.FC = () => {
    // State to store the list of products
    const [products, setProducts] = useState<Product[]>([]);
    const [cartItems, setCartItems] = useState<CartItem[]>(getCartItems());

    useEffect(() => {
        // Function to fetch product data from Firestore
        const fetchProducts = async () => {
            // Get a reference to the 'products' collection in Firestore
            const productCollection = collection(db, 'products');
            const productSnapshot = await getDocs(productCollection);
            // Map over the documents and transform them into Product objects
            const productList = productSnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id, // Document ID
                    name: data.name, // Product name
                    price: Number(data.price), // Ensure price is a number
                    description: data.description, // Product description
                    imageUrl: data.imageUrl, // Product image
                    quantity: Number(data.quantity), // product quantity
                } as Product;
            });
            // Update the state with the fetched product list
            setProducts(productList);
        };

        // Call the fetchProducts function to fetch the data
        fetchProducts();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

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
        <div className={styles['product-list-page']}>
            <h1>Product List</h1>
            <div className={styles['products-list-div']}>
                {products.map((product) => (
                    <section
                        className={styles['product-list-item']}
                        key={product.id}
                    >
                        <h2>{product.name}</h2>
                        <img
                            src={`src/assets/product-img/${product.imageUrl}`}
                            alt={product.name}
                            className={styles['product-image']}
                        />
                        {/* Format price to 2 decimal places */}
                        <p>Price: ${product.price.toFixed(2)}</p>
                        <p>{product.description}</p>
                        <Link to={`/products/${product.id}`}>
                            <button>View Product</button>
                        </Link>
                        {product.quantity > 0 ? (
                            <div>
                                <button
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Add to Cart
                                </button>
                                <div>
                                    <button
                                        onClick={() =>
                                            decreaseQuantity(product.id)
                                        }
                                    >
                                        -
                                    </button>
                                    <span>{getCartQuantity(product.id)}</span>
                                    <button
                                        onClick={() =>
                                            increaseQuantity(product)
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p className={styles['out-of-stock']}>
                                Out of Stock
                            </p>
                        )}
                    </section>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
