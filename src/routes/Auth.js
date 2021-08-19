import { authService, firebaseInstance } from 'fbase';
import React, { useState } from 'react';

//onChange={e=> setEmail(e.target.value)}
const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true)
    const [error, setError] = useState("")
    const onChange = (e) => {
        const { target: { name, value } } = e;
        if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        }
        console.log(e.target.name)
    }

    const toggleAccount = () => setNewAccount(prev => !prev)
    const onSocialClick = async (e) => {
        const { target: { name } } = e;
        let provider;
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider()
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider()
        }
        await authService.signInWithPopup(provider)
    }

    const onSubmit = async (e) => {
        e.preventDefault(); // 새로고침X
        try {
            if (newAccount) {
                // create
                await authService.createUserWithEmailAndPassword(email, password)
            } else {
                //login
                await authService.signInWithEmailAndPassword(email, password)
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} />
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
                <input type="submit" value={newAccount ? "Create Account" : "Sign In"} />
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
            <div>
                <button onClick={onSocialClick} name="google">Log In with Google</button>
                <button onClick={onSocialClick} name="github">Log In with Github</button>
            </div>
        </div>
    )
}
export default Auth;

