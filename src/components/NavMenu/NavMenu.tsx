import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavMenu.module.css';

const NavMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleSubMenu = () => {
        setIsSubMenuOpen(!isSubMenuOpen);
    };

    const handleClickOutside = (event: any) => {
        if (menuRef.current && menuRef.current.contains(event.target)) {
            return;
        }
        if (navRef.current && !navRef.current.contains(event.target)) {
            setIsOpen(false);
            setIsSubMenuOpen(false);
        }
    };

    const handleScroll = () => {
        setIsOpen(false);
        setIsSubMenuOpen(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div
                ref={menuRef}
                className={
                    isOpen
                        ? styles['hamburger-menu'] + ' ' + styles.open
                        : styles['hamburger-menu']
                }
                onClick={toggleMenu}
            >
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>
            <nav className={isOpen ? styles.open : ''} ref={navRef}>
                <div className={styles['nav-menu-header']}>
                    <p>Coffe Palace</p>
                    <button>🔍</button>
                </div>
                {isOpen && (
                    <ul>
                        <li>
                            <Link to="/" onClick={toggleMenu}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" onClick={toggleMenu}>
                                About
                            </Link>
                        </li>
                        {/* Add meny link to Products page ProductListPage.tsx */}
                        <li>
                            <Link to="/products" onClick={toggleMenu}>
                                Product List
                            </Link>
                        </li>
                        <li>
                            <div className={styles['nav-menu-menu']}>
                                <Link to="/menu" onClick={toggleMenu}>
                                    Menu
                                </Link>
                                <div
                                    className={styles['nav-menu-menu__button']}
                                    onClick={toggleSubMenu}
                                >
                                    {isSubMenuOpen ? '-' : '+'}
                                </div>
                            </div>
                            {isSubMenuOpen && (
                                <ul
                                    className={
                                        styles['nav-menu-menu__sub-menu']
                                    }
                                >
                                    <li>Hela sortimentet</li>
                                    <li>Kaffe</li>
                                    <li>Mat</li>
                                    <li>Fika</li>
                                    <li>Te</li>
                                    <li>Varma drycker</li>
                                    <li>Kalla drycker</li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <Link to="/cart" onClick={toggleMenu}>
                                Cart
                            </Link>
                        </li>
                    </ul>
                )}
            </nav>
        </>
    );
};

export default NavMenu;
