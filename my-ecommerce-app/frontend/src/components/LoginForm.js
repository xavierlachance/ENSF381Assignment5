import React, { useState } from 'react';
import SignupForm from './SignupForm';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [showSignup, setShowSignup] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const [loginStatus, setLoginStatus] = useState(() => {
        const savedStatus = localStorage.getItem('loginStatus');
        return savedStatus === 'true'; // Returns true if savedStatus is 'true', false otherwise
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

    const navigate = useNavigate(); // Apparently this line is needed?

    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        if (username === '' || password === '') {
            setLoginMessage('All fields required!');
            return;
        }

        const user = {
            username: username,
            password: password
        };

        fetch('http://localhost:5000/login', {
            method: 'POST', // No idea why this is a post instead of a get, but we will follow requirements to not lose marks
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                if (response.ok) {
                    setLoginMessage('User logged in successfully!');
                    setUsername('');
                    setPassword('');
                    setLoginStatus(true);
                    localStorage.setItem('loginStatus', 'true');
                    navigate("/products"); // Not too sure why this is needed or if there is an alternative, but we got it working so we will keep it
                    return response.json();
                } else {
                    setLoginStatus(false);
                    localStorage.setItem('loginStatus', 'false');
                    setLoginMessage('Username and/or password incorrect!');
                    throw new Error('Username and/or password incorrect! ' + response.status);
                }
            })
            .then(data => { console.log(data.message) })
            .catch(error => { console.error(error) });
    };

    return (
        <main>
            {showSignup ? (<SignupForm />) : (
                <div>
                    <section className="Login-Title" style={{ padding: 10 }}>
                        <h2>Login</h2>
                        {loginMessage && <p className="Login-Message" style={{ color: "red" }}>{loginMessage}</p>}
                    </section>
                    <section className="Login-Form" style={{ padding: 2 }}>
                        <form onSubmit={handleLoginSubmit}>
                            <div>
                                <label htmlFor="username">Username:</label>
                                <input type="text" id="username" name="username" placeholder="Enter your username" value={username} onChange={handleUsernameChange} />
                            </div>
                            <div>
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" name="password" placeholder="Enter your password" value={password} onChange={handlePasswordChange} />
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