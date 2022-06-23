import React from 'react'
import { Link } from 'react-router-dom'
import RuleSvg from '../../assets/img/svg/mini-rules.svg'
import './rules.css'

function Rules() {
  return (
    <div>
       <div className="rule-content">
            <div className="svg-container">
                <img src={RuleSvg} className="svg-img" alt="rule"/>
            </div>
            <h2 className="rule-title">Rules</h2>

            <div className="rules-main">
                <p className="rule">Each correct answer gets 5 marks.</p>
                <p className="rule">Each wrong answer means -1 mark.</p>
                <p className="rule">Score abouve 75% to win.</p>
                <p className='rule'>Click one time to select option then click on Next</p>
            </div>
           

            <div className="rules-btn">
                <Link to={'/'}className="btn outline-secondary rule-btn">Back</Link>
                <Link to={'/categories'} className="btn outline-secondary rule-btn">play</Link>
            </div>
        </div>
    </div>
  )
}

export default Rules
