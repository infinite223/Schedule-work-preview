import './../styles/navStyles.scss'
import logo from '../assets/icon.png'

const Nav = () => {
  return (
    <div className='nav'>
        <img src={logo} className='nav__logo'/>
        <div className='nav__header-container'>
            <div className='nav__header'>
                ScheduleWork
            </div>
            <div className='nav__secendHeader'>
                mobile app
            </div>
        </div>
    </div>
  )
}

export default Nav