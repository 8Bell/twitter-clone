import Factory from 'components/Factory';
import Twit from 'components/Twit';
import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';


const Home = ({userObj}) => {

const [twits, setTwits] = useState([]);
useEffect(() => {
 dbService.collection('twits').onSnapshot((snapshot)=>{
     const twitArray = snapshot.docs.map((doc)=> ({
         id:doc.id, 
         ...doc.data(),
        }));
        setTwits(twitArray);
    });
}, []); 

return(
<div>
    <Factory userObj={userObj}/>
    <div>
        {twits.map((twit) => (
            <Twit 
            key={twit.id} 
            twitObj={twit} 
            isOwner={twit.creatorId === userObj.uid}/>
        ))}
    </div>
</div>
)
}
export default Home;