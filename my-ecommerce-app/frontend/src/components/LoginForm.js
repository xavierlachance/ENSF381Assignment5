import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupForm from './SignupForm';

const LoginForm = () => {
    const [showSignup, setShowSignup] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const [loginStatus, setLoginStatus] = useState(() => {
        const savedStatus = localStorage.getItem('loginStatus');
        return savedStatus || "";
    });

    const handleSwitch = () => {
        setShowSignup(true);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
    };

    return (
        <main>
            {showSignup ? (<SignupForm />) : (
                <div>
                    <section class = "Login-Title" style={{padding:10}}>
                        <h2>Login</h2>
                        {loginMessage && <p className='Login-Message' style={{color:'red'}}>{loginMessage}</p>}
                    </section>
                    <section class = "Login-Form" style={{padding:2}}>
                        <form onSubmit={handleLoginSubmit}>
                            <div>
                                <label htmlFor="username">Username:</label>
                                <input type="text" id="username" name="username" placeholder="Enter your username" value={username} onChange={handleUsernameChange} required/>
                            </div>
                            <div>
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" name="password" placeholder="Enter your password" value={password} onChange={handleUsernameChange} required/>
                            </div>
                            <div>
                                <button type="submit">Login</button>
                            </div>
                        </form>
                        <div>
                            <button type="button" onClick={handleSwitch}>Switch to Signup</button>
                        </div>
                    </section>
                </div>
            )}
        </main>
    );
};

export default LoginForm;