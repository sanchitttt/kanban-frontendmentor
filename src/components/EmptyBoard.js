import React, { useContext } from 'react'
import { BoardsContext } from './Dashboard'

function EmptyBoard() {
    const boards = useContext(BoardsContext);
    if(boards && !boards.length){
        return null;
    }
    return (
        <div className={`sm:w-[292px] vs:w-[292px] md:w-[493px] lg:w-[493px] xl:w-[493px] md:h-[103px] lg:h-[103px] xl:h-[103px] vs:h-[113px] sm:h-[113px] flex flex-col justify-between items-center`}>
            <div className={`text-center text-light-grey font-jakarata`}>This board is empty. Create a new column to get started</div>
            <div className={`w-[100%] flex items-center justify-center`}>
                <div className='w-[174px] h-[46px] flex items-center justify-center bg-mainPurple rounded-full '>
                    <div className='text-light-main font-jakarata'>+ Add New Column</div>
                </div>
            </div>

        </div>
    )
}

export default EmptyBoard