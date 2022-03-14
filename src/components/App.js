import React, { useEffect, useState } from 'react';
import {authService} from 'fbase';
import AppRouter from 'components/Router';


function App() {
  const [init, setInit] = useState(true);
  const [userObj, setUserObj] = useState(null)
  
  useEffect(() => {
  authService.onAuthStateChanged((user)=> {
  if(user){ 
  setUserObj(user)
  }else{
  setInit(true)
 }
 })
  }, [])
 
  
  
  return (
    <>
     {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> : 'Initailizing...' }
     <footer>&copy; {new Date().getFullYear()} Twitter</footer>

    </>
   
  );
}
export default App;
