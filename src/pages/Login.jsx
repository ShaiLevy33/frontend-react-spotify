import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

import { userService } from '../services/user'
import { login } from '../store/actions/user.actions'

export function Login() {
    const [users, setUsers] = useState([])
    const [credentials, setCredentials] = useState({ username: '', password: '' })

    const navigate = useNavigate()

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        const users = await userService.getUsers()
        setUsers(users)
    }

    async function onLogin(ev = null) {
        if (ev) ev.preventDefault()

        if (!credentials.username) return
        await login(credentials)
        navigate('/')
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    return (
        <form className="login-form" onSubmit={onLogin}>
            <Link to="/">
                <img src="../src/assets/img/spotify login.png" alt="login logo"
                />
            </Link>
            <h2>Log in to VibeStream</h2>
            <button className="login-comp-btn" >
                <img
                    src="https://accounts.scdn.co/sso/images/new-google-icon.72fd940a229bc94cf9484a3320b3dccb.svg"
                    alt="Google icon"
                    className="login-provider-icon"
                />Continue with Google</button>
            <button className="login-comp-btn" >
                <img
                    src="https://accounts.scdn.co/sso/images/new-facebook-icon.eae8e1b6256f7ccf01cf81913254e70b.svg"
                    alt="Google icon"
                    className="login-provider-icon"
                />Continue with Facebook</button>
            <button className="login-comp-btn" >
                <img
                    src="https://accounts.scdn.co/sso/images/new-apple-icon.e356139ea90852da2e60f1ff738f3cbb.svg"
                    alt="Google icon"
                    className="login-provider-icon"
                />
                Continue with Apple</button>
            {/* <select
                name="username"
                value={credentials.username}
                onChange={handleChange}>
                <option value="">Select User</option>
                {users.map(user => <option key={user._id} value={user.username}>{user.fullname}</option>)}
            </select> */}

            <span>____________________________________________________________</span>
            <div className="user-password-login">
            <label htmlFor="usename">Email or username</label>
            <input name="username" id="username" type="text" placeholder="Email or username" value={credentials.username}  required  ></input>
            </div>
            <div className="user-password-login">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="Password" value={credentials.password} ></input>
            </div>
            <button className="login-btn" onSubmit={onLogin}>Continue</button>
        </form>
    )
}