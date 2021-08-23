import { dbService, storageService } from "fbase"
import React, { useState } from "react"

const Tweet = ({ tweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false)
    const [newTweet, setNewTweet] = useState(tweetObj.text)

    const onDeleteClick = async () => {
        const ok = window.confirm("정말 트윗을 지우겠습니까??")
        if (ok) {
            await dbService.doc(`tweets/${tweetObj.id}`).delete()
            await storageService.refFromURL(tweetObj.imageUrl).delete()
        }
    }
    const toggleEditing = () => {
        setEditing(prev => !prev)
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(tweetObj, newTweet)
        await dbService.doc(`tweets/${tweetObj.id}`).update({
            text: newTweet
        })
        setEditing(false)
    }
    const onChange = (e) => {
        const { target: { value } } = e
        setNewTweet(value)
    }

    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input type="text" placeholder="Edit Tweet" value={newTweet} required onChange={onChange} />
                        <input type="submit" value="edit" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                <>
                    <h4>{tweetObj.text}</h4>
                    {tweetObj.imageUrl && (<img src={tweetObj.imageUrl} width="50px" height="50px" />)}
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete</button>
                            <button onClick={toggleEditing}>Edit</button>
                        </>)}
                </>
            )}
        </div>
    )
}

export default Tweet