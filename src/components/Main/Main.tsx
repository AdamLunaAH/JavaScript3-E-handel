// components/Main/Main.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../../views/pages/Home';
import About from '../../views/pages/About';
import Menu from '../../views/pages/Menu';
import SignIn from '../../views/auth/SignIn/SignIn';
import SignUp from '../../views/auth/SignUp/SignUp';
import SignOut from '../../views/auth/SignOut/SignOut';
import ProductListPage from '../../views/pages/ProductListPage';
import ProductPage from '../../views/pages/ProductPage';
import './Main.module.css';
import Settings from '../../views/settings/Settings/Settings';
import UserProfile from '../../views/settings/UserProfile/UserProfile';
import ChangePassword from '../../views/settings/ChangePassword/ChangePassword';
import AdminPanel from '../../views/admin/AdminPanel/AdminPanel';
import ProtectedRoute from '../ProtectedRoutes/ProtectedRoutes';
import ProfileManager from '../../views/admin/ProfileManager/ProfileManager';

import CartPage from '../../views/pages/CartPage';

const Main: React.FC = () => {
    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-out" element={<SignOut />} />
                <Route path="/products" element={<ProductListPage />} />
                <Route path="/products/:id" element={<ProductPage />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path='/cart' element={<CartPage/>} />
                <Route
                    path="/admin-panel"
                    element={
                        <ProtectedRoute>
                            <AdminPanel />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin-panel/profile-manager"
                    element={
                        <ProtectedRoute>
                            <ProfileManager />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </main>
    );
};

export default Main;
