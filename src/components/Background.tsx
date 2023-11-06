import React from 'react'
import './../styles/backgroundStyles.scss'
import background from './../assets/background_3.png'

const Background = () => {
  return (
    <div className='background'>
      <img src={background} className='background__img'/>
    </div>
  )
}

export default Background