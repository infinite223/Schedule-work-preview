import './../styles/contentStyles.scss'
import android from './../assets/android.png'
import apple from './../assets/apple.png'
import { constants } from '../Utilis/constansts'
import { downloadApp } from '../Utilis/downloadApp'
import presentApp from './../assets/presentApp.png'

const Content = () => {
  return (
    <div className='content'>
        <img src={presentApp} className='content__presentApp'/> 
        <div className='content__description'>
            Aplikacja mobilna do zarządzania harmonogramem pracy pracowników. 
            Ułatwiająca zapis pracowników w grafiku pracy. Aplikacja umożliwa 
            podział na grupy, szybki podgląd najbliższych dni pracy jak i innych wspópracowników.
        </div>

        <div className='content__version'>
            aktualna wersja: {constants.appVersion}
        </div>

        <div className='content__button' onClick={downloadApp}>
            Pobierz aplikacjie na androida
            <img src={android} className='content__button-android'/>
        </div>
        
        <div className='bg-first content__button disable'>
            Pobierz aplikacjie na ios
            <img src={apple} className='content__button-android'/>
        </div>
    </div>
  )
}

export default Content