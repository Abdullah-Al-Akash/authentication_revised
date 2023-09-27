import React, { useState } from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import app from '../../firebase.init';

const Login = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();


    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                setUser(loggedInUser);
            })
            .catch((err) => {
                console.log('Error', err.message);
            })
    }

    const handleLogOut = () => {
        signOut(auth)
            .then(() => {
                console.log('SignOut Success');
                setUser(null)
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <div>
            {
                user ?
                    <button onClick={handleLogOut}>Logout</button>
                    :
                    <button onClick={handleGoogleSignIn}>Google Login</button>

            }


            {
                user && <div>
                    <h3>Name: {user.displayName}</h3>
                    <h3>Email: {user.email}</h3>
                </div>
            }
        </div>
    );
};

export default Login;