import Twit from 'components/Twit';
import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import Factory from 'components/Factory';

const Home = ({userObj}) => {

const [twits, setTwits] = useState([]);


// const getTwits = async()=> {
//     const DBTwits = await dbServise.collection('twits').get();
//     DBTwits.forEach(document=>{
//         const twitObj = {
//             ...document.data(),
//             id: document.id,
//         }
//         setTwits((prev) => [twitObj,...prev]); 

//     }
//         );
// } 

//아래 onSnapshot 과 같은 결과를 반영하지만 아래 방법은 re render가 필요없는 리얼타임 코드

useEffect(() => {
//  getTwits()
 dbService.collection('twits').onSnapshot((snapshot)=>{
     const twitArray = snapshot.docs.map((doc)=> ({
         id:doc.id, 
         ...doc.data()
        }))
        setTwits(twitArray);
    }) 
}, []); 



return(
<div>
 <Factory userObj={userObj} />
    <div>
        {twits.map((twit) => (
            <Twit key={twit.id} twitObj={twit} isOwner={twit.creatorId === userObj.uid} attachmentUrl={twit.attachmentUrl}/>
        ))}
    </div>
</div>
)
}
export default Home;