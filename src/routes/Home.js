import { dbService } from 'fbase';
import React, { useState } from 'react';

const Home = () => {
    const [tweet, setTweet] = useState("")
    const onSubmit = (e) => {
        e.preventDefault();
        dbService.collection("tweets").add({
            tweet,
            createAt: Date.now()
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
        </div>
    )
}
export default Home

