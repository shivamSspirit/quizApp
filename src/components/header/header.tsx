import React, { useEffect } from 'react'
import './header.css'
import headIcon from '../../assets/img/jpeg/headicon.png'
import gitIcon from '../../assets/img/jpeg/github-mini.png'
import tweetIcon from '../../assets/img/jpeg/twittermini.png'
import { Link } from 'react-router-dom'
import { useQuizs } from '../../context/global'
import { useLocation } from 'react-router-dom';

import { useAuths } from '../../firebase-config'
import UserIcon from "../../assets/img/svg/user.png"

function Header() {
    const [searchVal, setSearchVal] = React.useState('');
    const { quizCategory, setFilteredCate, user }: any = useQuizs();
    const { logout } = useAuths()
    const location = useLocation();

    const handleSearch = (e: any) => {
        setSearchVal(e.target.value);
    }

    useEffect(() => {
        let filteredCategory = quizCategory?.filter((item: any) => item?.name?.includes(searchVal))
        setFilteredCate(filteredCategory);
    }, [searchVal])

    return (
        <div>
            <header>
                <div className="mini-header">
                    <div className="mini-icon-container">
                        <span className='spanItem'>
                            <Link className="img-link" to={'/'}><img className="icon" src={headIcon} alt="" /></Link>
                        </span>
                    </div>

                    {location?.pathname === '/categories' && (
                        <div className='search-container'>
                            <input value={searchVal} className='search' onChange={handleSearch} type='text' placeholder='Type category...' />
                        </div>
                    )}
                    <div className="mini-socials">
                        <span>
                            {user ? <button className='social-btn' onClick={() => logout()}><img className="social-icons" src={UserIcon} alt="user" /></button> : <Link to={'/auth/login'} ><img className="social-icons" src={UserIcon} alt="user" /></Link>}
                        </span>
                        <span><a href="https://github.com/shivamsoni00"><img src={gitIcon}
                            className="social-icons" /></a></span>

                        <span><a href="https://twitter.com/ShivamSspirit"><img src={tweetIcon}
                            className="social-icons" /></a></span>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header
