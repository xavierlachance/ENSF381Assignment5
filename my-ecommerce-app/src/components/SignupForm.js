import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';

const SignupForm = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [email, setEmail] = useState('');
    const [signupStatus, setSignupStatus] = useState('');

    const handleSwitch = () => {
        setShowLogin(true);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleCPasswordChange = (event) => {
        setCPassword(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleSignupSubmit = async (event) => {
        event.preventDefault();
    };

    return (
        <main>
            {showLogin ? (<LoginForm />) : (
                <div>
                    <section class = "Signup-Title" style={{padding:10}}>
                        <h2>Signup</h2>
                        {signupStatus && <p className='Signup-Message' style={{color:'red'}}>{signupStatus}</p>}
                    </section>
                    <section class = "Signup-Form" style={{padding:2}}>
                        <form onSubmit={handleSignupSubmit}>
                            <div>
                                <label htmlFor="username">Username:</label>
                                <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} placeholder="Enter your username" required/>
                            </div>
                            <div>
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} placeholder="Enter your password" required/>
                            </div>
                            <div>
                                <label htmlFor="password">Confirm Password:</label>
                                <input type="password" id="cpassword" name="cpassword" value={cPassword} onChange={handleCPasswordChange} placeholder="Confirm your password" required/>
                            </div>
                            <div>
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} placeholder="Enter your email" required/>
                            </div>
                            <div>
                                <button type="submit">Signup</button>
                            </div>
                        </form>
                        <div>
                            <button type="button" onClick={handleSwitch}>Switch to Login</button>
                        </div>
                    </section>
                </div>
            )}
        </main>
    );
};

export default SignupForm;