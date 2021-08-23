import { dbService, storageService } from "fbase";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const TweetFactory = ({ userObj }) => {
    const [tweet, setTweet] = useState("")
    const [imageStringData, setimageStringData] = useState("")
    const onSubmit = async (e) => {
        e.preventDefault();
        // await dbService.collection("tweets").add({
        //     text: tweet,
        //     createAt: Date.now(),
        //     creatorId: userObj.uid,
        // })
        let imageUrl = ""
        if (imageStringData !== "") {
            const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await fileRef.putString(imageStringData, "data_url")
            imageUrl = await response.ref.getDownloadURL();
        }

        const tweetObj = {
            text: tweet,
            createAt: Date.now(),
            creatorId: userObj.uid,
            imageUrl
        }
        await dbService.collection("tweets").add(tweetObj)
        setTweet("")
        setimageStringData("")
    }
    const onChange = (e) => {
        const { target: { value } } = e
        setTweet(value)
    }

    const onChangeFile = (e) => {
        const { target: { files } } = e;
        const imageFile = files[0]
        const reader = new FileReader()
        reader.onloadend = (finishedEvent) => {
            const { currentTarget: { result } } = finishedEvent
            setimageStringData(result)
        }
        reader.readAsDataURL(imageFile)
    }

    const clearPhoto = () => setimageStringData("")
    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="what's on your mind" maxLength={120} value={tweet} onChange={onChange}></input>
            <input type="file" accept="image/*" onChange={onChangeFile} />
            <input type="submit" value="Tweet" />
            {imageStringData && (
                <div>
                    <img src={imageStringData} width="50px" height="50px" />
                    <button onClick={clearPhoto}>clear</button>
                </div>)}
        </form>
    )
}

export default TweetFactory