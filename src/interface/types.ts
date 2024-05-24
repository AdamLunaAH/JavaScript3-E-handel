// src/types.ts
export interface CartItem {
    productId: string;
    productName: string;
    quantity: number;
    productPrice: number;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    quantity: number;
}
