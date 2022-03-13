import React, { useEffect, useState } from 'react';
import {authService} from 'fbase';
import AppRouter from 'components/Router';


function App() {
  const [init, setInit] = useState(true);
  const [userObj, setUserObj] = useState(null)
  
  useEffect(() => {
  authService.onAuthStateChanged((user)=> {
  if(user){ 
  setUserObj({
    displayName: user.displayName,
    uid: user.did,
    updateProfile: (args) => user.updateProfile(args), 
  })
  }else{
  setUserObj(null)
 }
 })
  }, [])

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.did,
      updateProfile: (args) => user.updateProfile(args), 
    });
  }
 
  
  
  return (
    <>
     {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} /> : 'Initailizing...' }
     <footer>&copy; {new Date().getFullYear()} Twitter</footer>

    </>
   
  );
}
export default App;
