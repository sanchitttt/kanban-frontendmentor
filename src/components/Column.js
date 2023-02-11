import React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import BoardTitle from './BoardTitle';
import NewColumn from './NewColumn';
import Task from './Task';

const findTasksDone = (arr) => {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].isCompleted) count++;
    }
    return count;
}

function Column({ column, idx, boardIndex, columnIndex }) {
    return (
        <div className='w-[280px] md:h-[950px] flex flex-col mr-[24px]'>
            <ScrollContainer vertical={true}>
            <BoardTitle idx={idx} totalTasks={column.tasks.length}>{column.name}</BoardTitle>
            {column.tasks.map((item, idx) => {
                const count = findTasksDone(item.subtasks)
                return <Task boardIndex={boardIndex} columnIndex={columnIndex} taskIndex={idx} key={idx} data={item} heading={item.title} tasksDone={count} totalTasks={item.subtasks.length} />
            })}
            </ScrollContainer>
          
        </div>
    )
}

function Columns({ board, boardIndex }) {
    return (
        <div className='flex '>
            {board.columns.map((item, idx) => {
                return <Column boardIndex={boardIndex} columnIndex={idx} key={idx} idx={idx} column={item} />
            })}
            <NewColumn />
        </div>

    )
}

export default Columns