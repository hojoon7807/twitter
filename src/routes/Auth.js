import AuthForm from 'components/AuthForm';
import { authService, firebaseInstance } from 'fbase';
import React, { useState } from 'react';

//onChange={e=> setEmail(e.target.value)}
const Auth = () => {

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

    return (
        <div>
            <AuthForm />
            <div>
                <button onClick={onSocialClick} name="google">Log In with Google</button>
                <button onClick={onSocialClick} name="github">Log In with Github</button>
            </div>
        </div>
    )
}
export default Auth;

