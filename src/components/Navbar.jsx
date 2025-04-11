import React from 'react'
import "./Navbar.css"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setToken} from '../Slice/authSlice';

function Navbar() {
    const token = useSelector(state=>state.auth.Token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(state => state.cart.cartItems);

    async function logout() {
      const toastId = toast.loading("Loading...");
      dispatch(setToken(null));
      localStorage.removeItem("Token");
      toast.dismiss(toastId);
      toast.success("Successfully Log out!");
      navigate('/auth/login');
    }

    const handleLogout = () => {
      dispatch(logout());
      navigate('/auth/login');
    }

  return (
    <div className="navbar">
       <div>
        <p className='logo'>Shopping Website</p>
       </div>
       <div>
        {
            token && <Link to="/products"
            style={{fontSize:"20px"}}
            >Home</Link>
        }
        &nbsp;&nbsp;&nbsp;
        {  
            token && <Link to="/cart" className="cart-link">Cart ({cartItems.length})</Link>
        }
       </div>
       <div>
          {
            !token && <Link to="/auth/login">Login</Link>
          }
          {
            token && <button onClick={handleLogout} 
            style={{
              background:"red",
              marginRight:"15px",
              }}
            >Logout</button> 
          }
       </div>

    </div>
  )
}

export default Navbar
