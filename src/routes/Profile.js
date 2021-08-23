import { authService, dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


const Profile = ({ refreshUser, userObj }) => {
    const history = useHistory()
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
    const onLogOutClick = () => {
        authService.signOut()
        history.push("/")
    }
    const getMyTweets = async () => {
        const tweets = dbService.collection("tweets").where("creatorId", "==", userObj.uid).get()


    }
    useEffect(() => {
        getMyTweets()
    }, [])
    const onChange = (e) => {
        const { target: { value } } = e
        setNewDisplayName(value)
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({ displayName: newDisplayName })
            refreshUser()
        }
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Display Name" onChange={onChange} value={newDisplayName} />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick} >Log Out</button>
        </>
    )
}
export default Profile
