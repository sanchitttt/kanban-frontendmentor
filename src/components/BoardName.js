import { Modal } from '@mui/material';
import React, { useContext, useState } from 'react'
import ThemeContext from '../contexts/ThemeContext'
import SideBarMobile from './SideBarMobile';

function BoardName({ children, forMobile,boardsNames ,activeBoard,setActiveBoard}) {

    const [showMobileSidebar, setShowMobileSideBar] = useState(false);
    const theme = useContext(ThemeContext);
    if (!forMobile) {
        return <div className={`${theme.color === 'dark' ? 'text-light-main' : 'text-dark-main'} font-bold vs:w-[159px] sm:w-[159px] vs:h-[23px] sm:h-[23px] vs:text-[18px] vs:text-[18px] sm:text-[18px] md:text-[20px] lg:text-[20px] xl:text-[20px]   md:w-[159px] lg:w-[159px] xl:w-[159px] md:h-[25px] lg:h-[25px] xl:h-[25px]`} >
            <div className={`font-jakarata `}>
                {children}
            </div>
        </div>
    }
    else {
        return (
            <div className={`relative flex items-center justify-between ${theme.color === 'dark' ? 'text-light-main' : 'text-dark-main'} font-bold vs:w-[159px] sm:w-[159px] vs:h-[23px] sm:h-[23px] vs:text-[18px] vs:text-[18px] sm:text-[18px] md:text-[20px] lg:text-[20px] xl:text-[20px]   md:w-[159px] lg:w-[159px] xl:w-[159px] md:h-[25px] lg:h-[25px] xl:h-[25px]`} >
                <div className={`font-jakarata `}>
                    {children}
                </div>
                <div
                    onClick={() => setShowMobileSideBar(true)}
                >
                    <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                        <path stroke="#635FC7" strokeWidth="2" fill="none" d="m1 1 4 4 4-4" />
                    </svg>
                </div>
                {showMobileSidebar &&
                    <Modal open={showMobileSidebar} onClose={() => setShowMobileSideBar(false)}>
                        <div className='absolute left-[50%] translate-x-[-50%] top-[20%] translate-y-[-20%]'>
                            <SideBarMobile activeBoard={activeBoard} setActiveBoard={setActiveBoard} boardsNames={boardsNames} />
                        </div>

                    </Modal>
                }
            </div>
        )
    }

}

export default BoardName