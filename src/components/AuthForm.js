import { authService } from "fbase";
import { useState } from "react";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true)
    const [error, setError] = useState("")

    const onChange = (e) => {
        const { target: { name, value } } = e;
        if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        }
        console.log(e.target.name)
    }

    const toggleAccount = () => setNewAccount(prev => !prev)

    const onSubmit = async (e) => {
        e.preventDefault(); // 새로고침X
        try {
            if (newAccount) {
                // create
                await authService.createUserWithEmailAndPassword(email, password)
            } else {
                //login
                await authService.signInWithEmailAndPassword(email, password)
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} />
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
                <input type="submit" value={newAccount ? "Create Account" : "Sign In"} />
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
        </>
    )
}

export default AuthForm