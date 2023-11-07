import { FC } from 'react'
import './../styles/ChangesModalStyles.scss'
import { constants } from '../Utilis/constansts'

const ChangesModal:FC<{setShowModal: (value: boolean) => void}> = ({setShowModal}) => {
  return (
    <div 
        className='changesModal__container'
        onClick={() => setShowModal(false)}
    >
      <div 
        className='changesModal__container-content'
        onClick={(e) => e.stopPropagation()}
    >
        <div className='changesModal__container-nav'>
            <h1>Najnowsze zmiany</h1>
            <div className='app__version'>wersja {constants.appVersion}</div>
        </div>

        <div className='changes__list'>
            Aktualnie nie ma zmian w aplikacji 
        </div>
      </div>
    </div>
  )
}

export default ChangesModal