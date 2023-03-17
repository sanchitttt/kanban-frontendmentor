import React, { useContext } from 'react'
import ThemeContext from '../contexts/ThemeContext';
import AllBoardsText from './AllBoardsText';
import CreateNewBoardButton from './CreateNewBoardButton';
import DynamicBoardText from './DynamicBoardText';
import HideSidebar from './HideSidebar';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import GenerateBoardForMe from './GenerateBoardForMeButton';


function SideBarDesktop({ boardsNames, activeBoard, setActiveBoard, setSidebarHidden }) {
  const theme = useContext(ThemeContext);

  return (
    <div className={`w-[300px] h-[100vh] relative border-r-[1px] flex flex-col items-start ${theme.color === 'dark' ? 'bg-dark-grey border-dark-lines' : 'bg-light-main border-light-lines'}`}>
      <div>
        <div className='absolute left-0 top-0 h-[81px] w-[220px] z-[1000]'>
          <Logo includeBorder={true} />
        </div>
        <div className='w-[100%] h-[226px] absolute top-[100px]'>
          <div className='ml-[32px] tracking-[1px] '>
            <AllBoardsText count={8} />
            <div className='absolute left-0 mt-[20px]'>
              {boardsNames.map((boardName, idx) => {
                return <div className={` rounded-r-[999px] ${activeBoard === idx ? 'bg-mainPurple' : ''}`} onClick={() => setActiveBoard(idx)}>
                  <DynamicBoardText key={idx} active={idx === activeBoard} >{boardName.name}</DynamicBoardText>
                </div>
              })}
              <div>
                <CreateNewBoardButton />
              </div>
              <div>
                <GenerateBoardForMe />
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className='absolute bottom-[30px] left-[24px]'>
        <HideSidebar setSidebarHidden={setSidebarHidden} />
      </div>
      <div className='absolute bottom-[94px] left-[12px]'>
        <ThemeToggle />
      </div>
    </div>
  )
}

export default SideBarDesktop;