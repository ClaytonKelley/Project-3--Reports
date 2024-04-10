import React from 'react'
import {useNavigate} from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


export default function Login() {
    const navigate = useNavigate();

    

    const handleGoBack = () => {
        navigate('/Navbar')
    }
    
  return (
    <div>
      <GoogleLogin onSuccess={credentialResponse => {
        console.log(jwtDecode(credentialResponse.credential));
        handleGoBack();
        }} 
        onError={() => {
            console.log('Login Failed');}}/>;
    </div>
  )
}