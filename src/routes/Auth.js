import { authService, firebaseInstance } from 'fbase';
import React  from 'react';
import AuthForm from "components/AuthForm";

const Auth =() => {
    
    const onSocialClick = async (e) => {
        const {target: {name},} = e;
        let provider;
        if(name === 'google'){
        provider = new firebaseInstance.auth.GoogleAuthProvider()
        } else { 
        provider = new firebaseInstance.auth.GithubAuthProvider()
        }
        await authService.signInWithPopup(provider);
    }

    return(
<div> 
    {/* <form onSubmit={onSubmit}>
    <input name='email' type='email' placeholder='Email' required value={email} onChange={onChange}/>
    <input name='password' type='password' placeholder='password' required value={password} onChange={onChange} />
    <input type='submit' value={newAccount ? "Create Account" : "Sign In"} />
    {error}
    </form>
    <span onClick={toggleAccount}>
        {newAccount ? 'Sign In' : 'Create Account' }
        </span> */}
        <AuthForm />
    <div>
        <button name='google'onClick={onSocialClick}>Continue with Google</button>
        <button name='github'onClick={onSocialClick}>Continue with Github</button>
    </div>
</div>
    )
}
export default Auth;