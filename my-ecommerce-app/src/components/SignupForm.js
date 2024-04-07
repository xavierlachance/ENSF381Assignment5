import React from 'react';

const SignupForm = () => {
    return (
        <main>
            <section class = "Signup-Title" style={{padding:10}}>
                <h2>Signup</h2>
            </section>
            <section class = "Signup-Form" style={{padding:2}}>
                <form>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" placeholder="Enter your username" required/>
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" required/>
                    </div>
                    <div>
                        <label htmlFor="password">Confirm Password:</label>
                        <input type="password" id="password" name="password" placeholder="Confirm your password" required/>
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" required/>
                    </div>
                    <div>
                        <button type="submit">Signup</button>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default SignupForm;