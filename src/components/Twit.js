import { dbService } from "fbase";
import React, { useState } from "react";

const Twit = ({twitObj, isOwner}) => {

    const [editing, setEditing] = useState(false)
    const [newTwit, setNewTwit] = useState(twitObj.text)

    const onDeleteClick = async () => {
        const ok = window.confirm("Are you Sure?");
        if(ok){
           await dbService.doc(`twits/${twitObj.id}`).delete();
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
           <form onSubmit={onSubmit}>
               <input type='text' value={newTwit} required onChange={onChange} />
               <input type='submit' value='Update' />
           </form> 
           <button onClick={toggleEditing}>Cancel</button>
           </>
           )
           : (
           <>
           <h4>{twitObj.text}</h4>
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