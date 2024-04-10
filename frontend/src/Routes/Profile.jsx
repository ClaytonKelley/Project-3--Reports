import React, { useState, useEffect} from 'react'
import ProfileBuilder from '../Components/ProfileBuilder'
import ProfileUser from '../Components/ProfileUser'

function Profile() {
    // const [hasProfile, setHasProfile] = useState(false);

    // useEffect(() => {
    //     const checkUserProfileExists = async () => {
    //         try {
    //             const response = await fetch('http://localhost:5000/profile', {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //             });
    
    //             if (response.ok) {
    //                 const profile = await response.json();
                    
    //                 if (profile) {
    //                     setHasProfile(true);
    //                 } else {
    //                     setHasProfile(false);
    //                 }
    //             } else {
    //                 console.log('Failed to get profile', response.status);
    //             }
    //         } catch (error) {
    //             console.log('Failed to get profile', error);
    //         }          
    //     };
    
    //     checkUserProfileExists();
    // }, []);

  return (
    <div>
        <ProfileBuilder />
        {/* {hasProfile ? <ProfileUser /> : <ProfileBuilder />} */}
    </div>
  )
}

export default Profile

