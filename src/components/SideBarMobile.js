import React, { useContext } from 'react'
import ThemeContext from '../contexts/ThemeContext'
import AllBoardsText from './AllBoardsText';
import CreateNewBoardButton from './CreateNewBoardButton';
import { ModalsContext } from './Dashboard';
import DynamicBoardText from './DynamicBoardText';
import ThemeToggle from './ThemeToggle';

function SideBarMobile({ boardsNames, activeBoard, setActiveBoard, }) {
    const theme = useContext(ThemeContext);
    const modals = useContext(ModalsContext);

    return (
        <div className={`overflow-scroll sm:w-[264px] h-[400px] flex rounded-[6px] ${theme.color === 'dark' ? 'bg-dark-grey border-dark-lines' : 'bg-light-main border-light-lines'}`}>
            <div className=' ml-[32px] tracking-[1px] mt-[22px] '>
                <AllBoardsText count={8} />
                <div className=' h-[260px] absolute left-0 mt-[20px] mb-[30px]'>
                    {boardsNames.map((boardName, idx) => {
                        return <div className={` rounded-r-[999px] ${activeBoard === idx ? 'bg-mainPurple' : ''}`} onClick={() => setActiveBoard(idx)}>
                            <DynamicBoardText key={idx} active={idx === activeBoard} >{boardName.name}</DynamicBoardText>
                        </div>
                    })}
                    <div className='mt-[20px]'
                        onClick={()=> modals.addBoard.method(true)}>
                        <CreateNewBoardButton />
                    </div>

                </div>
            </div>
            <div className='absolute bottom-[5px] left-[12px]'>
                <ThemeToggle />
            </div>
        </div>
    )
}

export default SideBarMobile