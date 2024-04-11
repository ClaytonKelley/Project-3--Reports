import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function Login({ LoginFunction }) {
    const navigate = useNavigate();

    const handleGoBack = () => {

        navigate('/Navbar');
    };

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
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="max-w-xl mx-auto p-8 border border-gray-300 rounded-lg bg-gray-800 text-center">
                <h1 className="text-3xl font-bold text-gray-100 mb-6">Welcome to SDI 24 Project 3 Space Reports</h1>
                <p className="text-xl text-gray-100 mb-6">Please log in below to access the site</p>
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        // syncAccountDetails(jwtDecode(credentialResponse.credential))
                        LoginFunction(jwtDecode(credentialResponse.credential));
                        handleGoBack();
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                    className="mx-auto" // Centering the GoogleLogin component
                />
            </div>
        </div>
    );
}
