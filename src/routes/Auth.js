import { authService, firebaseInstance } from 'fbase';
import React, { useState } from 'react';

const Auth =() => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (e) => {
    const { target: {name, value}} = e;
    name === "email" ? setEmail(value) : setPassword(value)
    }
 
    const onSubmit = async (e) => {
        e.preventDefault();

        try{
            let data;
            newAccount ? 
            data = await authService.createUserWithEmailAndPassword(
                email, password
            )
            : 
            data = await authService.signInWithEmailAndPassword(
                email, password
            )
            //console.log(data)
        }catch(error){
            setError(error.message)
        }
    }


    const toggleAccount = () => setNewAccount((prev)=> !prev);
    const onSocialClick = async (e) => {
        const {target: {name},} = e;
        let provider;
        if(name === 'google'){
        provider = new firebaseInstance.auth.GoogleAuthProvider()
        } else { 
        provider = new firebaseInstance.auth.GithubAuthProvider()
        }
        const data = await authService.signInWithPopup(provider)
        console.log(data)
    }

    return(
<div> 
    <form onSubmit={onSubmit}>
    <input name='email' type='email' placeholder='Email' required value={email} onChange={onChange}/>
    <input name='password' type='password' placeholder='password' required value={password} onChange={onChange} />
    <input type='submit' value={newAccount ? "Create Account" : "Sign In"} />
    {error}
    </form>
    <span onClick={toggleAccount}>
        {newAccount ? 'Sign In' : 'Create Account' }
        </span>
    <div>
        <button name='google'onClick={onSocialClick}>Continue with Google</button>
        <button name='github'onClick={onSocialClick}>Continue with Github</button>
    </div>
</div>
    )
}
export default Auth;