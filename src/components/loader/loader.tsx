
import { Circles } from 'react-loader-spinner'
import './loader.css'

function Loader() {
    return (
        <div className='loaderContainer'>
            <div className='loader'>
                <Circles
                    height="85"
                    width="85"
                    color='#faa205'
                    ariaLabel='loading'
                />
            </div>
        </div>
    )
}

export default Loader
