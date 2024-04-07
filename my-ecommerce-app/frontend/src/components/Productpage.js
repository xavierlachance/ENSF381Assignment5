import React, { useState, useEffect } from 'react';
import Header from './Header';
import ProductList from './ProductList';
import Cart from './Cart';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Productpage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [loginStatus, setLoginStatus] = useState(() => {
    const savedStatus = localStorage.getItem('loginStatus');
    return savedStatus === 'true'; // Returns true if savedStatus is 'true', false otherwise
  });

  const navigate = useNavigate();

  // Check if user has access to page
  useEffect(() => {
    console.log("Login status:", loginStatus);
    if (!loginStatus) {
      console.error("Error 401: User not logged in. Redirecting to login page.");
      navigate("/login");
    }
  });

  // Load products info from app.py
  useEffect(() => {
    const fetchProductsInfo = async () => {
      try {
        const response = await fetch('http://localhost:5000/products/info');
        if (!response.ok) {
          throw new Error('Failed to fetch products info: ' + response.status);
        }
        const data = await response.json();
        setProductsData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProductsInfo();
  }, []);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      console.log("Loaded cart items from localStorage:", storedCartItems);
      console.log("Loaded cart items in JSON", JSON.parse(storedCartItems));
      setCartItems(JSON.parse(storedCartItems));

    }
  }, []);

  useEffect(() => {
    console.log("Productpage component rerendered");
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    if (existingItemIndex !== -1) {
      const updatedCartItems = cartItems.map((item, index) => {
        if (index === existingItemIndex) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === productId) {
        if (item.quantity === 1) {
          return null;
        } else {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    }).filter(item => item !== null); // Filter out null entries to remove removed items from cart

    console.log("Updated Cart Items:", updatedCartItems);
    setCartItems(updatedCartItems);
  };

  return (
    <div>
      <Header />
      <table>
        <tbody>
          <tr>
            <td><ProductList products={productsData} onAddToCart={addToCart} /></td>
            <td style={{ verticalAlign: 'top' }}><Cart cartItems={cartItems} onRemove={removeFromCart} /></td>
          </tr>
        </tbody>
      </table>
      <Footer />
    </div>
  );
};

export default Productpage;
