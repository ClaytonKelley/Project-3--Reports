import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function Login({ LoginFunction }) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="max-w-xl mx-auto p-8 border border-gray-300 rounded-lg bg-gray-800 text-center">
                <h1 className="text-3xl font-bold text-gray-100 mb-6">Welcome to SDI 24 Project 3 Space Reports</h1>
                <p className="text-xl text-gray-100 mb-6">Please log in below to access the site</p>
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        LoginFunction(jwtDecode(credentialResponse.credential));
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
