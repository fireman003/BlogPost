import React, { useEffect, useRef, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';


function Register() {
    const [error, setError] = useState('');
    const [uuid, setUuid] = useState(''); 
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const username = useRef();
    const firstName = useRef();
    const lastName = useRef();
    const telefon = useRef();

    const navigate = useNavigate();

    const OnRegister = () => {
        if(password.current.value !== confirmPassword.current.value) {
            setError('Passwords do not match');
            return;
        }
        else if(password.current.value.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
    
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value).then(async (userCredential) => {
            setUuid(userCredential.user.uid)
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
            setError("account already exists with this email");
        });
    }

    useEffect(() => {
        console.log('uuid:', uuid);
        if(uuid !== '') {
            fetch(`http://localhost:3000/API/createUser/${uuid}/${username.current.value}/${email.current.value}/${firstName.current.value}/${lastName.current.value}/${telefon.current.value}`).then(() => {
                console.log('User created');
                navigate('/');
            });
        }
    }, [uuid]);

    const handleSignIn = () => {
        // google sign in
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    return (
        <div className='AuthForm'>
            <h1>Register</h1>
            <input type='text' placeholder='Username' ref={username} />
            <input ref={email} type='email' placeholder='Email' />

            <input type='text' placeholder='First Name' ref={firstName}/>
            <input type='text' placeholder='Last Name' ref={lastName} />
            
            <input type='text' placeholder='Phone Number' ref={telefon}/>
            

            <input type='password' placeholder='Password' ref={password}/>
            <input type='password' placeholder='Confirm Password' ref={confirmPassword}/>
            <p>{error}</p>
            <button onClick={OnRegister}>Register</button>
            <hr />
            <p>Or Sign up with google</p>
            <ul>
                <li><button className='Orange'>Sign up with Google</button></li>
            </ul>
        </div>
    )
}

function Login() {
    const email = useRef();
    const password = useRef();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const OnLogin = () => {
        // login logic
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
            navigate('/');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            setError("Invalid email or password");

        });
    }

    const handleSignIn = () => {
        // google sign in
    }

    return (
        <div className='AuthForm'>
            <h1>Login</h1>
            <input type='text' placeholder='Email' ref={email}/>
            <input type='password' placeholder='Password' ref={password}/>
            <p>{Error}</p>
            <p>{error}</p>
            <button onClick={OnLogin}>Login</button>
            <hr />
            <p>Or Sign up with google</p>
            <ul>
                <li><button className='Orange' onClick={handleSignIn}>Sign in with Google</button></li>
            </ul>
        </div>
    )
}

export { Register, Login }