import React from 'react'

import Logo from './components/Logo/Logo'
import Button from '../../common/Button/Button'

const Header = () => {
  return (
    <div className='container mx-auto flex justify-between items-center min-h-20'>
        <Logo />
        <Button text='login' />
    </div>
  )
}

export default Header