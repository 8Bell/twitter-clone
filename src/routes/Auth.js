import { authService, firebaseInstance } from 'fbase';
import React  from 'react';
import AuthForm from "components/AuthForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

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
<div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
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
        <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} /></button>
          <button onClick={onSocialClick} name="github" className="authBtn">
          Continue with Github <FontAwesomeIcon icon={faGithub} /></button>
    </div>
</div>
    )
}
export default Auth;