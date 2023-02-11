import { Modal } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import routes from '../config/config';
import ThemeContext from '../contexts/ThemeContext'
import { ModalsContext } from './Dashboard';
import DeleteTask from './DeleteTask';
import SelectInput from './SelectInput';

const transformation = (arr) => {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].isCompleted === true) count++;
    }
    return count;
}
export function ViewTaskTippy({ boardIndex, columnIndex, taskIndex, tippyHide, setTippyHide }) {
    const [deleteTaskModal, setDeleteTaskModal] = useState(false);
    const modals = useContext(ModalsContext);
    const fn = (e) => {
        let more = document.getElementById('viewTaskSVG');
        let moreTippy = document.getElementById('viewTaskTippy');
        if (more) {
            if (moreTippy) {
                if (!moreTippy.contains(e.target) && !more.contains(e.target)) {
                    if (tippyHide) setTippyHide(false);
                }
            }

        }
    }
    useEffect(() => {
        document.addEventListener('click', (e) => fn(e))
        return () => {
            document.removeEventListener('click', (e) => fn(e))
        }
    }, []);


    const theme = useContext(ThemeContext);
    return <div id='viewTaskTippy' style={{ boxShadow: theme.color === 'light' ? '0px 10px 20px rgba(54, 78, 126, 0.25)' : '0px 1px 1px #000112' }} className={` rounded-[8px] absolute top-[40px] right-0 w-[192px] h-[96px] flex flex-col  ${theme.color === 'dark' ? 'bg-dark-darkBG' : 'bg-light-main'}`}>
        <div className={`font-jakarata cursor-pointer leading-[23px] text-[13px] text-light-grey ml-[17px] mt-[24px] mb-[15px]`}
            onClick={() => modals.editTask.method(true)}
        >Edit Task</div>
        <div className={`font-jakarata cursor-pointer leading-[23px] text-[13px]  text-red ml-[17px]`}
            onClick={() => setDeleteTaskModal(true)}
        >Delete Task</div>

        {deleteTaskModal &&
            <Modal open={deleteTaskModal} onClose={() => setDeleteTaskModal(false)}>
                <div className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'>
                    <DeleteTask boardIndex={boardIndex} columnIndex={columnIndex} taskIndex={taskIndex} setShowModal={setDeleteTaskModal}
                    />
                </div>
            </Modal>

        }
    </div>
}

let changed = false;
function ViewTask({ data }) {
    const [showTippy, setShowTippy] = useState(false);
    const [subTasks, setSubTasks] = useState(data.subtasks);
    const [status, setStatus] = useState(data.status);

    const theme = useContext(ThemeContext);
    const afterTransformation = transformation(data.subtasks);


    useEffect(() => {
        return () => {
            if (changed) {
                const payload = {
                    boardIndex: data.boardIndex,
                    columnIndex: data.columnIndex,
                    taskIndex: data.taskIndex,
                    subtasks: subTasks,
                }
                const patchTask = async () => {
                    try {
                        const result = await axios.patch(routes.SUBTASKS_PATCH_ROUTE, payload, { withCredentials: true });
                    } catch (error) {
                        console.log('view task error= ', error);
                    }
                }
                patchTask();
            }
        }
    }, []);
    const toggleSubTaskComplete = (idx) => {
        const currTasks = [...subTasks];
        if (currTasks[idx].isCompleted === true) currTasks[idx].isCompleted = false
        else currTasks[idx].isCompleted = true;

        changed = true;

        setSubTasks([...currTasks]);
    }

    return (
        <div className={` overflow-scroll  vs:w-[343px] sm:w-[343px] vs:h-[557px] sm:h-[557px] md:w-[480px] ${data.description.length ? 'md:h-[560px]' : '460px'}  rounded-[6px] flex items-center justify-center  ${theme.color === 'dark' ? "bg-dark-grey" : "bg-light-main"}`}>
            <div className={`vs:w-[297px] sm:w-[296px] vs:h-[497px] flex-col sm:h-[496px] md:w-[415px] ${data.description.length ? 'md:h-[520px]' : '420px'} flex justify-start flex justify-start `}>
                <div style={{ alignItems: 'center !important', display: 'flex' }} className={`md:w-[418px] flex justify-between items-center md:h-[64px] mb-[31px] `}>
                    <div className={`md:w-[345px] md:h-[64px] sm:w-[295px] sm:h-[92px] font-jakarata text-bold text-l leading-[23px] flex justify-between items-center font-bold  ${theme.color === 'dark' ? 'text-light-main' : '"text-light-grey"'}`}>
                        {data.title}
                    </div>
                    <div className='relative'
                        onClick={() => setShowTippy(true)}
                    >
                        <svg id='viewTaskSVG' width="5" height="20" xmlns="http://www.w3.org/2000/svg">
                            <g fill="#828FA3" fill-rule="evenodd">
                                <circle cx="2.308" cy="2.308" r="2.308" />
                                <circle cx="2.308" cy="10" r="2.308" />
                                <circle cx="2.308" cy="17.692" r="2.308" />
                            </g>
                        </svg>
                        {showTippy && <ViewTaskTippy boardIndex={data.boardIndex} columnIndex={data.columnIndex} taskIndex={data.taskIndex} tippyHide={showTippy} setTippyHide={setShowTippy} />}

                    </div>
                </div>
                <div className={`md:w-[416px] mb-[30px] md:h-[64px] sm:w-[295px] sm:h-[92px] font-jakarata leading-[23px] text-[13px] text-light-grey text-medium `}>
                    {data.description.length ? data.description : 'No description found'}
                </div>

                <div className={`font-jakarata leading-[15px] mb-[31px] text-[12px] font-bold   ${theme.color === 'dark' ? 'text-light-main' : 'text-light-grey'}`}>
                    Subtasks ({afterTransformation} of {data.subtasks.length})
                </div>
                {data.subtasks.map((subtask, idx) => {
                    return <div key={idx} className={`hover:cursor-pointer sm:w-[295px] md:w-[416px] py-[10px] flex items-center mb-[8px] ${theme.color === 'dark' ? 'bg-dark-darkBG' : 'bg-light-darkBG'}`}
                        onClick={(e) => toggleSubTaskComplete(idx)}
                    >
                        <div>
                            {subtask.isCompleted ? <div className='w-[41px] h-[41px] flex items-center justify-center bg-purpleMain'>
                                <div className={`hover:cursor-pointer w-[16px] h-[16px] bg-mainPurple flex items-center justify-center`}
                                >
                                    <svg width="10" height="8" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke="#FFF" stroke-width="2" fill="none" d="m1.276 3.066 2.756 2.756 5-5" />
                                    </svg>
                                </div>
                            </div> :
                                <div className='w-[41px] h-[41px] rounded-[2px] flex items-center justify-center'>
                                    <div className={`w-[16px] h-[16px] bg-light-grey`} style={{ borderRadius: '1px solid rgba(130, 143, 163, 0.248914' }}
                                    >

                                    </div>
                                </div>}
                        </div>
                        {subtask.isCompleted ? <del className={`font-jakarata text-[12px] text-bold text-light-grey `}
                        >
                            {subtask.title}
                        </del> :
                            <div className={`font-jakarata text-[12px] text-bold ${subtask.isCompleted ? 'underline-offset-1 decoration-solid text-light-grey' : ''}  ${theme.color === 'dark' ? 'text-light-main' : 'text-dark-main'}`}
                            >
                                {subtask.title}
                            </div>
                        }

                    </div>
                })}
                <div className={`mt-[15px] font-jakarata leading-[15px] mb-[11px] text-[12px] font-bold ${theme.color === 'dark' ? 'text-light-main' : 'text-light-grey'} `}>
                    Current Status
                </div>
                <div className='mb-[20px] '>
                    <SelectInput disabled current={status} columns={[{ name: status, tasks: [] }]} />
                </div>
            </div>


        </div>
    )
}

export default ViewTask