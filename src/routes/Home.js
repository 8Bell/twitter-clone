import Twit from 'components/Twit';
import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';

const Home = ({userObj}) => {
const [twit, setTwit] = useState("");
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


    const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection('twits').add({
        text: twit,
        creatorId: userObj.uid,
        createdAt: Date.now(),
    });
    setTwit("")
}
const onChange = (e) => {
setTwit(e.target.value)
} 
return(
<div>
    <form onSubmit={onSubmit} >
        <input type='text' value={twit} placeholder="What's on your mind?" maxLength={120} onChange={onChange}/>
        <input type='submit' value='twit' />
    </form>
    <div>
        {twits.map((twit) => (
            <Twit key={twit.id} twitObj={twit} isOwner={twit.creatorId === userObj.uid}/>
        ))}
    </div>
</div>
)
}
export default Home;