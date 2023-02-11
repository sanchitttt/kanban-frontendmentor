import React, { useContext } from 'react'
import ThemeContext from '../contexts/ThemeContext'
import { ModalsContext, SetBoardDataContext } from './Dashboard';


function Task({ boardIndex, columnIndex, taskIndex, heading, tasksDone, totalTasks, data }) {
    const modals = useContext(ModalsContext);
    const setBoardData = useContext(SetBoardDataContext);

    const theme = useContext(ThemeContext);
    return (

        <div style={{
            boxShadow: theme.color === 'dark' ?
                '0px 4px 6px 0px #364E7E1A' : '0px 4px 6px 0px #364E7E1A'
        }}
            onClick={() => {
                modals.viewTask.method(true);
                setBoardData({ ...data, boardIndex: boardIndex, columnIndex: columnIndex, taskIndex: taskIndex });
            }}
            className={`task w-[220px] pl-[17px] pt-[27px] pb-[27px] pr-[44px]
         rounded-[8px] flex flex-col justify-center items-start mb-[20px] 
         hover:cursor-pointer
         ${theme.color === 'dark' ? 'bg-dark-grey text-light-main hover:text-purpleMain' : 'bg-light-main hover:text-purpleMain text-purpleMain'}`}>

            <div className={`leading-[18.9px] font-bold m-b-[14px] font-jakarata text-m `}>
                {heading}
            </div>
            <div className='subtaskText mt-[12px] font-jakarata text-light-grey font-bold leading-[15.12px] text-s'>
                {tasksDone} of {totalTasks} subtasks
            </div>
        </div>


    )
}

export default Task