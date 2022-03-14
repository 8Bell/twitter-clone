import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const Factory = ({userObj}) => {

const [twit, setTwit] = useState("");
const [attach, setAttach] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        let attachUrl = "";
        if(attach !== ""){
        const attachRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
        const response = await attachRef.putString(attach,'data_url');
        attachUrl = await response.ref.getDownloadURL();
        }
        const twitObj = {
            text: twit,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachUrl,
        };
    
        await dbService.collection('twits').add(twitObj);
        setTwit("");
        setAttach("");
    };
    
    const onChange = (e) => {
    setTwit(e.target.value)
    };
    
    const onFileChange = (e) => {
        const theFile = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = (fe) => {
            setAttach(fe.currentTarget.result)
        };
        reader.readAsDataURL(theFile);
    };
    const onClearAttach = () => setAttach("");

return(
<form onSubmit={onSubmit} >
<input type='text' value={twit} placeholder="What's on your mind?" maxLength={120} onChange={onChange}/>
<input type='file'accept='image/*' onChange={onFileChange}/>
<input type='submit' value='twit' />
{attach && 
<div>
<img src={attach} width='50px' height='50px' />
<button onClick={onClearAttach} >Clear</button>
</div>
}
</form>
)

}

export default Factory

