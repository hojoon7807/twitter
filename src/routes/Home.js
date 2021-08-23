import Tweet from 'components/Tweet';
import TweetFactory from 'components/TweetFactory';
import { dbService, storageService } from 'fbase';
import React, { useEffect, useState } from 'react';

const Home = ({ userObj }) => {
    console.log(userObj)

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


    return (
        <div>
            <TweetFactory userObj={userObj} />
            <div>
                {tweets.map(tweet => (
                    <Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    )
}
export default Home

