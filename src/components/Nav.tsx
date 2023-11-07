import './../styles/navStyles.scss'
import logo from '../assets/icon.png'
import ChangesModal from './ChangesModal'
import { useState } from 'react'

const Nav = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className='nav'>
        {showModal&&<ChangesModal setShowModal={setShowModal}/>}

        <img src={logo} className='nav__logo'/>
        <div className='nav__header-container'>
            <div className='nav__header'>
                ScheduleWork
            </div>
            <div className='nav__secendHeader'>
                mobile app
            </div>
        </div>

        <div 
          className='nav__button'
          onClick={() => setShowModal(true)}
        >
          Najnowsze zmiany
        </div>
    </div>
  )
}

export default Nav