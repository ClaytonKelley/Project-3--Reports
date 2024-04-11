import React from 'react'
import {useNavigate} from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


export default function Login() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/Navbar')
    }


    const syncAccountDetails = async (accountDetails) => {
      const account = {
        "oauth_sub" : accountDetails.sub,
        "userName" : `${accountDetails.given_name}${accountDetails.family_name}${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
        "email" : accountDetails.email,
        "user_group_id" : 1
      }

      console.log(account)
      try {
          const response = await fetch("http://localhost:8080/accounts_data", {
              method: "POST",
              body: JSON.stringify(account),
              headers: {
                'Content-Type': 'application/json'
              }
          });
          console.log(response);
      } catch (error) {
          console.error(error);
      }
  };



  return (
    <div>
      <GoogleLogin onSuccess={credentialResponse => {
        console.log(jwtDecode(credentialResponse.credential))
        syncAccountDetails(jwtDecode(credentialResponse.credential))

        handleGoBack();
        }}
        onError={() => {
            console.log('Login Failed');}}/>;
    </div>
  )
}