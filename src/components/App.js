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
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
  });
  } else {
    setUserObj(null);
  }
  setInit(true);
  
 })
  }, [])
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <>
     {init ? (
      <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
        ) :('Initailizing...') }

    </>
   
  );
}
export default App;
