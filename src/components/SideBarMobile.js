import React, { useContext } from 'react'
import ThemeContext from '../contexts/ThemeContext'
import AllBoardsText from './AllBoardsText';
import CreateNewBoardButton from './CreateNewBoardButton';
import { ModalsContext } from './Dashboard';
import DynamicBoardText from './DynamicBoardText';
import GenerateBoardForMeButton from './GenerateBoardForMeButton';
import ThemeToggle from './ThemeToggle';

function SideBarMobile({ boardsNames, activeBoard, setActiveBoard, setShowMobileSideBar }) {
    const theme = useContext(ThemeContext);
    const modals = useContext(ModalsContext);

    return (
        <div className={`sm:w-[285px] h-[500px] flex rounded-[6px] ${theme.color === 'dark' ? 'bg-dark-grey border-dark-lines' : 'bg-light-main border-light-lines'}`}>
            <div className=' ml-[32px] tracking-[1px] mt-[22px]  '>
                <AllBoardsText count={8} />
                <div className=' h-[260px] absolute left-0 mt-[20px] mb-[30px] overflow-scroll'>
                    {boardsNames.map((boardName, idx) => {
                        return <div className={` rounded-r-[999px] ${activeBoard === idx ? 'bg-mainPurple' : ''}`} onClick={() => {
                            setActiveBoard(idx);
                            setShowMobileSideBar(false);
                        }}
                        >
                            <DynamicBoardText key={idx} active={idx === activeBoard} >{boardName.name}</DynamicBoardText>
                        </div>
                    })}


                </div>
            </div>
            <div className='absolute bottom-[15px] gap-[10px] flex items-center justify-center flex-col left-[50%] ' style={{ transform: 'translate(-50%,0%)' }}>
                <div className='flex flex-col justify-center items-center gap-[5px]'>
                    <div className='ml-[-45px] mt-[20px]'
                        onClick={() => modals.addBoard.method(true)}>
                        <CreateNewBoardButton />
                    </div>
                    <div className='ml-[-10px]'
                        onClick={() => {
                            modals.generateBoard.method(true)
                            setShowMobileSideBar(false)
                        }}
                    >
                        <GenerateBoardForMeButton />
                    </div>
                </div>
                <div>
                    <ThemeToggle />
                </div>

            </div>
        </div>
    )
}

export default SideBarMobile