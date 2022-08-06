import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuths } from '../../../firebase-config';

import './signup.css'

function Signup() {
    const [signupstate, setSignupstate] = useState({
        displayName: '',
        email: '',
        password: ''
    })

    const { registerWithEmailAndPassword } = useAuths()

    const handleSignupForm = (e) => {
        const name = e.target.name;

        if (name === 'displayName') {
            setSignupstate({
                ...signupstate,
                displayName: e.target.value
            })
        }

        if (name === 'email') {
            setSignupstate({
                ...signupstate,
                email: e.target.value
            })
        }
        if (name === "password") {
            setSignupstate({
                ...signupstate,
                password: e.target.value
            })
        }
    }

    const onSignupSubmit = async (e) => {
        e.preventDefault();
        await registerWithEmailAndPassword(signupstate?.displayName, signupstate?.email, signupstate?.password)
    }

    return (
        <div className='signup-container'>
            <div className='sign-form-container'>
                <div className='sign-hero-section'>
                    <h1 className='title'>Sign up here</h1>
                </div>
                <form className='sign-form' onSubmit={onSignupSubmit}>
                    <div className='sign-form-parts'>
                        <label className='sign-form-label'>Username</label>
                        <input className='sign-form-inputs' value={signupstate?.displayName} type={'text'} onChange={handleSignupForm} name="displayName" />
                    </div>

                    <div className='sign-form-parts'>
                        <label className='sign-form-label'>Email</label>
                        <input className='sign-form-inputs' value={signupstate?.email} type={'email'} onChange={handleSignupForm} name="email" />
                    </div>

                    <div className='sign-form-parts'>
                        <label className='sign-form-label'>Password</label>
                        <input className='sign-form-inputs' value={signupstate?.password} type={'text'} onChange={handleSignupForm} name="password" />
                    </div>

                    <button className='sign-btn' type='submit'>sign up</button>

                </form>
                <span><p>you can <Link style={{ textDecoration: "none", color: "inherit" }} to={'/auth/login'}><span className='login-title'>login here</span></Link></p></span>
            </div>
        </div>
    )
}

export default Signup
