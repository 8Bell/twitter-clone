import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
        <div className="nweet">
       {
           editing ? (
            <>
               {isOwner && (
                   <>
           <form onSubmit={onSubmit} className="container nweetEdit">
               <input type='text' value={newTwit} required onChange={onChange} autoFocus className="formInput"/>
               <input type='submit' value='Update' className="formBtn"/>
           </form> 
           <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
           </>
           )}
           </>
           ) : (
           <>
           <h4>{twitObj.text}</h4>
           {twitObj.attachmentUrl && <img src={twitObj.attachmentUrl} /> }
           {isOwner && (
            <div className="nweet__actions">
                <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>   
           )}
           </>
           )
       }
    </div>

    )
}
export default Twit