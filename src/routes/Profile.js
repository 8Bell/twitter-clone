import { authService, dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default ({ refreshUser, userObj }) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)

    const history = useHistory();
const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
};
// const getMyTwits = async() => {
//  const twits = await dbService
//  .collection('twits')
//  .where('creatorId', '==', userObj.uid )
//  .orderBy('createdAt')
//  .get();
//  console.log('doc',twits.docs.map((doc) => doc.data()))
// }

// useEffect(()=>{
// getMyTwits();
// },[])
const onChange = (e) => {
    setNewDisplayName(e.target.value)
}
const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
        await userObj.updateProfile({
            displayName: newDisplayName,
        });
        refreshUser();
    }
};
return(
<div className="container">
      <form onSubmit={onSubmit} className="profileForm">
    <input onChange={onChange} type='text' placeholder='Edit your name' value={newDisplayName} autoFocus className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}/>
  
</form>
<span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
)
}
