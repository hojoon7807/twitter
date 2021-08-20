import Tweet from 'components/Tweet';
import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';

const Home = ({ userObj }) => {
    console.log(userObj)
    const [tweet, setTweet] = useState("")
    const [tweets, setTweets] = useState([])

    useEffect(() => {
        dbService.collection("tweets").orderBy("createAt", "desc").onSnapshot((snapshot) => {
            // snapshot.forEach(document =>{
            //     const tweetObject = {
            //         ...document.data(),
            //         id: document.id
            //     }
            //     setTweets((prev) =>
            //         [tweetObject, ...prev]
            //     )
            // })

            // rendering을 적게 하는 방식
            const tweetArray = snapshot.docs.map((doc) => ({
                id: doc.id, ...doc.data()
            }))
            setTweets(tweetArray)
        })
    }, [])
    console.log(tweets)

    const onSubmit = async (e) => {
        e.preventDefault();
        await dbService.collection("tweets").add({
            text: tweet,
            createAt: Date.now(),
            creatorId: userObj.uid,
        })
        setTweet("")
    }
    const onChange = (e) => {
        const { target: { value } } = e
        setTweet(value)
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="what's on your mind" maxLength={120} value={tweet} onChange={onChange}></input>
                <input type="submit" value="Tweet" />
            </form>
            <div>
                {tweets.map(tweet => (
                    <Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    )
}
export default Home

