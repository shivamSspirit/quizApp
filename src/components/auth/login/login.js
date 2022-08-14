import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuths } from '../../../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth'

import './login.css'

function Login() {
    const { auth, signInWithGoogle, logInWithEmailAndPassword, } = useAuths()
    const [loginstate, setloginstate] = useState({
        email: '',
        password: ''
    })
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate()


    const handleloginForm = (e) => {
        const name = e.target.name;
        if (name === 'email') {
            setloginstate({
                ...loginstate,
                email: e.target.value
            })
        }
        if (name === "password") {
            setloginstate({
                ...loginstate,
                password: e.target.value
            })
        }
    }

    const onloginSubmit = async (e) => {
        e.preventDefault();
        console.log(loginstate)
        await logInWithEmailAndPassword(loginstate?.email, loginstate?.password)
        if (user) {
            navigate('/')
        }
    }

    return (
        <div className='login-container'>
            <div className='login-form-container'>
                <div className='login-hero-section'>
                    <h1 className='log-title'>Login here</h1>
                </div>
                <form className='log-form' onSubmit={onloginSubmit}>
                    <div className='log-form-parts'>
                        <label className='log-form-label'>Email</label>
                        <input className='log-form-inputs' type={'email'} onChange={handleloginForm} name="email" />
                    </div>
                    <div className='log-form-parts'>
                        <label className='log-form-label'>Password</label>
                        <input className='log-form-inputs' type={'text'} onChange={handleloginForm} name="password" />
                    </div>
                    <button className='log-btn' type='submit'>login</button>
                </form>
                <span><button className='g-btn' onClick={() => signInWithGoogle()}>signInWithGoogle</button></span>
                <span><p>new to here pls <Link className='log-link' style={{ textDecoration: "none", color: "white" }} to={'/auth/signup'}>sign up here</Link></p></span>

            </div>
        </div>
    )
}

export default Login

