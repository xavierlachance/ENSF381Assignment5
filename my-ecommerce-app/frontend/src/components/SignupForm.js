import React, { useState } from 'react';
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

        if (username === '' || password === '' || cPassword === '' || email === '') {
            setSignupStatus('All fields required!');
            return;
        }

        if (password !== cPassword) {
            setSignupStatus('Passwords do not match!');
            return;
        }

        const user = {
            username: username,
            password: password,
            email: email
        };

        fetch('http://localhost:5000/login/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                if (response.ok) {
                    setSignupStatus('User signed up successfully!');
                    setUsername('');
                    setPassword('');
                    setCPassword('');
                    setEmail('');
                    return response.json();
                } else if (response.status === 409) {
                    setSignupStatus('Username is already taken!');
                    throw new Error('Username is already taken!');
                } else {
                    setSignupStatus('Could not register user! Something went wrong! Check console for more info!');
                    throw new Error('Could not register user! Something went wrong! Error: ' + response.status);
                }
            })
            .then(data => { console.log(data.message) })
            .catch(error => { console.error(error) });
    };

    return (
        <main>
            {showLogin ? (<LoginForm />) : (
                <div>
                    <section className="Signup-Title" style={{ padding: 10 }}>
                        <h2>Signup</h2>
                        {signupStatus && <p className="Signup-Message" style={{ color: "red" }}>{signupStatus}</p>}
                    </section>
                    <section className="Signup-Form" style={{ padding: 2 }}>
                        <form onSubmit={handleSignupSubmit}>
                            <div>
                                <label htmlFor="username">Username:</label>
                                <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} placeholder="Enter your username" />
                            </div>
                            <div>
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} placeholder="Enter your password" />
                            </div>
                            <div>
                                <label htmlFor="password">Confirm Password:</label>
                                <input type="password" id="cpassword" name="cpassword" value={cPassword} onChange={handleCPasswordChange} placeholder="Confirm your password" />
                            </div>
                            <div>
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} placeholder="Enter your email" />
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