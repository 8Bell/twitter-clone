import React, { useEffect, useState } from 'react';
import {authService} from 'fbase';
import AppRouter from 'components/Router';


function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null)
  
  useEffect(() => {
  authService.onAuthStateChanged((user)=> {
  if(user){ 
  setIsLoggedIn(true)
  setUserObj(user)
  }else{
  setIsLoggedIn(false)
 }
setInit(true)}
  )
  }, [])
 
  
  
  return (
    <>
     {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : 'Initailizing...' }
     <footer>&copy; {new Date().getFullYear()} Twitter</footer>

    </>
   
  );
}
export default App;
