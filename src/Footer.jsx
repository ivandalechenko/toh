import './Footer.scss';
import Links from './Links';
export default () => {
    return (
        <div className='Footer'>
            <div className='Footer_title'>
                © 2025 All Rights Reserved by Teddy On Heels
            </div>
            <div className='Footer_links'>
                <Links />
            </div>
        </div>
    )
}