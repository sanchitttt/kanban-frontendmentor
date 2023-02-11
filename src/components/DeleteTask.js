import axios from 'axios';
import React, { useContext } from 'react'
import routes from '../config/config';
import ThemeContext from '../contexts/ThemeContext'

function DeleteTask({ boardIndex, columnIndex, taskIndex, setShowModal }) {
    const theme = useContext(ThemeContext);

    const deleteHandler = () => {
        const deleteBoardFromServer = async () => {
            try {
                await axios.patch(routes.DELETE_TASK_ROUTE, {
                    boardIndex: boardIndex,
                    columnIndex: columnIndex,
                    taskIndex: taskIndex
                }, { withCredentials: true });
            } catch (error) {
                console.log(error);
            }
        }
        deleteBoardFromServer();
        setShowModal(false);
    }

    return (
        <div className={`rounded-[6px] flex items-center justify-center sm:w-[343px] sm:h-[284px] md:w-[480px] md:h-[229px] ${theme.color === 'dark' ? 'bg-dark-grey' : 'bg-light-main'}`}>
            <div className='flex flex-col justify-between sm:w-[295px] sm:h-[231px] md:w-[416px] md:h-[152px]'>
                <div className='font-jakarata text-bold leading-[23px] text-l text-red'>
                    Delete this task?
                </div>
                <div className='font-jakarata text-medium leading-[23px] text-[13px] text-light-grey'>
                    Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be reversed.
                </div>

                <div className='sm:hidden md:flex w-[100%] flex justify-between'>
                    <div className='w-[200px] hover:cursor-pointer font-bold h-[40px] rounded-full bg-red  text-[13px] font-jakarta text-light-main flex items-center justify-center'
                        onClick={deleteHandler}
                    >Delete</div>
                    <div className={`w-[200px] hover:cursor-pointer h-[40px] rounded-full bg-light-main text-[13px] font-jakarata text-mainPurple font-bold flex items-center justify-center ${theme.color === 'dark' ? 'bg-light-main' : 'bg-[#635FC71A]'}`}
                        onClick={() => setShowModal(false)}
                    >Cancel</div>
                </div>
                <div className='md:hidden sm:flex hover:cursor-pointer flex items-center justify-center font-bold text-[13px]  w-[100%] h-[40px] rounded-full bg-red font-jakarta font-bold  text-light-main'
                    onClick={deleteHandler}
                >
                    Delete
                </div>
                <div className={`md:hidden sm:flex hover:cursor-pointer flex items-center justify-center rounded-full  text-[13px] font-jakarata w-[100%] font-bold text-mainPurple h-[40px] ${theme.color === 'dark' ? 'bg-light-main' : 'bg-[#635FC71A]'}`}
                    onClick={() => setShowModal(false)}
                >
                    Cancel
                </div>
            </div>
        </div>
    )
}

export default DeleteTask;