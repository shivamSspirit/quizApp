import LandImg from '../../assets/img/jpeg/land (1).jpg'
import './landing.css'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useQuizs } from '../../context/global'

function LandingComponent() {
    const { user }: any = useQuizs()
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate('/auth/login')
        }
    }, [user])
    return (
        <div className='main-content'>
            <div className="land-content">
                <div className="land-svg">
                    <img className="img-land" src={LandImg} alt="land" />
                </div>
                <h1 className="pret">Pret</h1>
                <p className="p-description">Bored? Explore fun quizes on your favorite categories with Pret.</p>

                <div className="pret-btn">
                    <Link className="btn outline-secondary land-btn" to={"/rules"}>
                        Get Started
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default LandingComponent
