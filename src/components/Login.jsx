import React, { useState } from 'react'
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import "./Login.css"
import {useForm} from 'react-hook-form';
import { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {setToken} from '../Slice/authSlice';
import {apiConnector} from '../Services/apiConnector';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { register, formState: { errors }, handleSubmit } = useForm();
  const form = useRef();
  const from = location.state?.from?.pathname || "/products";

  async function login(email,password) {
    const toastId = toast.loading("Loading...");
     try {
      const credentials = { email: email, password: password };
      const response = await apiConnector("POST",
                             "https://api.escuelajs.co/api/v1/auth/login",
                             credentials,
      )
      toast.dismiss(toastId);
      toast.success("You are Successfully Logged In!!");
      const token = response.data.access_token;
      dispatch(setToken(token)); 
      return navigate(from, { replace: true });
     } catch (error) {
      toast.dismiss(toastId);
      toast.error("Login failed. Please check your credentials.");
      console.log("Error",error);
     }
  }

  const onSubmit=(data)=>{
    login(data.email,data.password);
  }

  const [open3,setOpen3] = useState(false);
  const changeHandler2=()=>{
    setOpen3(!open3);
  }

  return (
    <div className='container'>
        <div className='pages'> 
       <p className='title'>WELCOME BACK</p>
        <form onSubmit={handleSubmit(onSubmit)} ref={form}>
          <label htmlFor='email' className='label'>Email:<sup className='sups'>*</sup></label>
          <br/>
          <input type='email' placeholder='Enter Your Email' name='email' id='email' required  className='input-sec'
             {...register('email', { required: "Email is required**" })}
          />
          <p style={{color:'red',backgroundColor:'inherit'}}>{errors.name?.message}</p>
          <label htmlFor='password' className='label'>Password<sup className='sups'>*</sup></label>
          <br/>
          <p className='login-password'>
            <p style={{position:"relative",width:"100%"}}>
               <input type={open3 ? "text" : "password"} placeholder='Enter Your Password' name='password' id='password' required className='input-sec'
                     {...register('password', { required: "Password is required**" })}
               />
            </p>
            <p style={{position:"absolute",backgroundColor:"red",width:"35px",height:"35px",right:"0.2rem",top:"0.7rem",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#171D28"}}>
                {open3 ?        
                  <IoIosEye onClick={changeHandler2} style={{color:"grey",fontSize:"20px",cursor:"pointer"}} /> :    
                  <IoIosEyeOff onClick={changeHandler2} style={{fontSize:"20px",color:"grey",cursor:"pointer"}} />
                }
            </p>
          </p>
          <p style={{color:'red',backgroundColor:'inherit'}}>{errors.name?.message}</p>
          <button className='btn-submit'>Sign in</button>
        </form>
       </div>
    </div>
  )
}

export default Login
