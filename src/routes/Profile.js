import { authService, dbService } from 'fbase';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
const Profile = ({ userObj }) => {

    const history = useHistory();
const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
};
const getMyTwits = async() => {
 const twits = await dbService
 .collection('twits')
 .where('creatorId', '==', userObj.uid )
 .orderBy('createdAt')
 .get();
 console.log('doc',twits.docs.map((doc) => doc.data()))
}

useEffect(()=>{
getMyTwits();
},[])

return(
    <div>
<span>Profile</span>
<button onClick={onLogOutClick}>Log Out</button>
    </div>
)
}
export default Profile;