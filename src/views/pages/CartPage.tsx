// CartPage.tsx
import React from 'react';
import Cart from '../../components/KundVagn/Cart';
// Render-ProductList-function
const CartPage: React.FC = () => {
    return (
        <div>
            {/* <h2>Product List Page</h2> */}
            <Cart />
        </div>
    );
};

export default CartPage;
