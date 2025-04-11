import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../Slice/cartSlice';
import { toast } from 'react-toastify';
import "./Cart.css";

function Cart() {
  const dispatch = useDispatch();
  const { cartItems, totalItems, totalAmount } = useSelector(state => state.cart);

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed from cart");
  };

  const handleUpdateQuantity = (id, quantity) => {
    if(quantity>=1){
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart cleared");
  };

  const handleCheckout = () => {
    toast.success("Order placed Successfully", {
      autoClose: 4000,
      position: "top-center"
    });
    dispatch(clearCart());
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h2>Your Cart</h2>
        <div className="empty-cart">
          <p>Cart is empty!!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart ({totalItems} items)</h2>
      
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} className="cart-item-image" />
            
            <div className="cart-item-details">
              <h3 className="cart-item-title">{item.title}</h3>
              <p className="cart-item-price">${item.price}</p>
              
              <div className="quantity-controls">
                <button 
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  className="quantity-button"
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  className="quantity-button"
                >
                  +
                </button>
              </div>
              
              <button 
                onClick={() => handleRemoveItem(item.id)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="total-amount">
          <h3>Total Amount</h3>
          <p>${totalAmount.toFixed(2)}</p>
        </div>
        
        <div className="cart-actions">
          <button onClick={handleClearCart} className="clear-cart-button">
            Clear Cart
          </button>
          <button 
            onClick={handleCheckout} 
            className="checkout-button"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart; 