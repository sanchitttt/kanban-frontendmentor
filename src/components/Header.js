import React, { useContext } from 'react'
import ThemeContext from '../contexts/ThemeContext'
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

function Header() {
    const theme = useContext(ThemeContext);

    return (
        <div className={`w-[100%] sm:h-[67px] lg:h-[97px] flex items-center ${theme.color === 'dark' ? 'bg-dark-grey' : 'bg-light-main'}`}>
            <Logo />
            <div className=''>
                <ThemeToggle />
            </div>

        </div>
    )
}

export default Header