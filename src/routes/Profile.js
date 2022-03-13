import { authService, dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Profile = ({refreshUser, userObj}) => {

    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onChange = (e) => {
        setNewDisplayName(e.target.value)
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        if( userObj.displayName != newDisplayName){
            await userObj.updateProfile({
                displayName: newDisplayName,
            });
            refreshUser();
        }

    };

const history = useHistory();
const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
};
const getMyTwits = async () => {
 const Twits = await dbService.collection('twits').where("creatorID","==",userObj.uid).orderBy("createdAt").get()}
useEffect(() => {
  getMyTwits();
}, [])


return(
    <>
    <form onSubmit={onSubmit}>
        <input onChange={onChange} type='text' placeholder='Dispaly Name' value={newDisplayName}/>
        <input  type='submit' />
    </form>
    <div>
<span>Profile</span>
<button onClick={onLogOutClick}>Log Out</button>
    </div>
    </>
)
}
export default Profile;