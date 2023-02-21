import React, { useContext } from 'react';
import { ModalsContext } from './Dashboard';

function AllBoardsText({count}) {
  return (
    <div className='font-jakarata text-light-grey font text-[12px] font-bold w-[]'>
        ALL BOARDS ({modals.boardsData.val.boards.length})
    </div>
  )
}

export default AllBoardsText
