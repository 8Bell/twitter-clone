import { dbService, storageService } from "fbase";
import React, { useState } from "react";

const Twit = ({twitObj, isOwner, attachmentUrl}) => {

    const [editing, setEditing] = useState(false)
    const [newTwit, setNewTwit] = useState(twitObj.text)

    const onDeleteClick = async () => {
        const ok = window.confirm("Are you Sure?");
        if(ok){
           await dbService.doc(`twits/${twitObj.id}`).delete();
           await storageService.refFromURL(twitObj.attachmentUrl).delete();
        
        }

    }
    const toggleEditing = () => setEditing((prev) => !prev);
 
    const onSubmit = async (e) => {
        e.preventDefault();
        await dbService.doc(`twits/${twitObj.id}`).update({
            text: newTwit,
        });
        setEditing(false)
        ;
        
    }
    const onChange = (e) => {
       setNewTwit(e.target.value);}
    

    return(
        <div>
       {
           editing ? (
            <>
               {isOwner && (
                   <>
           <form onSubmit={onSubmit}>
               <input type='text' value={newTwit} required onChange={onChange} />
               <input type='submit' value='Update' />
           </form> 
           <button onClick={toggleEditing}>Cancel</button>
           </>
           )}
           </>
           ) : (
           <>
           <h4>{twitObj.text}</h4>
           {attachmentUrl && <img src={attachmentUrl} width='200px' height='200px' /> }
           {isOwner &&
           <>
           <button onClick={onDeleteClick}>Delete</button>
           <button onClick={toggleEditing}>Edit</button>
           </>    
            }
           </>
           )
       }
    </div>

    )
}
export default Twit