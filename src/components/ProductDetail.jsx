import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Slice/cartSlice';
import { toast } from 'react-toastify';
import "./ProductDetail.css";

function ProductDetail({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!product) {
    return <div className="product-detail-container">Product not found</div>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    }));
    toast.success("Item added to cart!");
  };

  return (
    <div className="product-detail-container">
      <button className="back-button" onClick={() => navigate("/products")}>Back to Products</button>
      
      <div className="product-detail">
        <div className="product-image-container">
          <img 
            src={product.image} 
            alt={product.title} 
            className="product-image"
          />
        </div>
        
        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-price">${product.price}</p>
          <p className="product-description">{product.description}</p>
          
          <div className="product-actions">
            <button 
              className="add-to-cart-button"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail; 