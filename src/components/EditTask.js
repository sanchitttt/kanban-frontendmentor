import React, { useContext, useState } from 'react'
import ThemeContext from '../contexts/ThemeContext'
import DarkButton from './DarkButton';
import InputField from './InputField';
import LightButton from './LightButton';
import SelectInput from './SelectInput';
import Subtasks from './Subtasks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import routes from '../config/config';
import { ModalsContext } from './Dashboard';

const successToast = (text, theme) => {
    return toast.success(text, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,

    });
}

const errorToast = (text, theme) => {
    toast.error(text, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
        fontFamily: 'Plus Jakrata Sans'
    });
}
const verifier = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        if (!arr[i].title.length) return false;
    }

    return true;
}

function EditTask({ fullData, data, setEditTaskModal }) {
    const theme = useContext(ThemeContext);
    const [title, setTitle] = useState(data.title);
    const [description, setDescription] = useState(data.description);
    const [subTasks, setSubtasks] = useState(data.subtasks);
    const [status, setStatus] = useState(data.status);

    const modals = useContext(ModalsContext);

    const { boardIndex, columnIndex, taskIndex } = data;

    const saveChanges = () => {
        if (!verifier(subTasks)) {
            errorToast('Empty subtask!', theme.color);
        }
        else if (!title.length) errorToast('Title cant be empty!', theme.color);
        else {
            const payload = {
                ...data,
                subtasks: subTasks,
                title: title,
                description: description,
                status: status
            }

            const editTaskHandler = async () => {
                try {
                    await axios.patch(routes.EDIT_TASK_ROUTE,
                        payload,
                        { withCredentials: true }
                    )
                    successToast('Tasked edited!', theme.color);
                } catch (error) {
                    console.log('error in', routes.EDIT_TASK_ROUTE);
                }
            }
            editTaskHandler();
            setEditTaskModal(false);
            const currBoard = modals.boardsData.val;
            currBoard.boards[boardIndex].columns[columnIndex].tasks[taskIndex] = {
                subtasks: subTasks,
                title: title,
                description: description,
                status: status
            }
            modals.boardsData.method(structuredClone(currBoard));
            modals.viewTask.method(false);

        }
    }

    const addSubTaskHandler = () => {
        const currSubTasks = [...subTasks];
        const obj = { title: "", isCompleted: false }
        currSubTasks.push(obj)
        setSubtasks(structuredClone(currSubTasks));
    }

    const removeSubTaskHandler = (e, idx) => {
        const currSubTasks = [...subTasks];
        //eslint-disable-next-line
        const filtered = currSubTasks.filter((item, index) => {
            if (index !== idx) return item;
        })
        setSubtasks([...filtered]);
    }


    return (

        <div className={`overflow-scroll vs:w-[343px] sm:w-[343px] vs:h-[600px] sm:h-[500px] md:w-[480px] md:min-h-[700px] rounded-[6px] flex items-center justify-center  ${theme.color === 'dark' ? "bg-dark-grey" : "bg-light-main"}`}>
            <div className={` pb-[15px] vs:w-[297px] sm:w-[297px] vs:h-[550px] flex-col sm:h-[500px] md:w-[418px] md:min-h-[700px] flex justify-start flex justify-start `}>
                <div className={`font-jakarata font-bold text-[18px] mt-[29px] leading-[23px] ${theme.color === 'dark' ? "text-light-main" : "text-dark-main"} mb-[27px]`}>Edit Task</div>
                <div className={`font-jakarata font-bold text-[13px] leading-[15px] mb-[11px] ${theme.color === 'dark' ? "text-light-main" : "text-light-grey"}`}>Title</div>
                <div className={`mb-[27px]`}><InputField value={title} setValue={setTitle} placeholder={title.length ? title : 'e.g. take a coffee break'} /></div>
                <div className={`font-jakarata font-bold text-[13px] leading-[15px] mb-[11px] ${theme.color === 'dark' ? "text-light-main" : "text-light-grey"}`}>Description</div>
                <div className={`mb-[27px]`}><InputField multiline={true} value={description} setValue={setDescription} placeholder={description ? description : 'e.g. It???s always good to take a break. This 15 minute break will recharge the batteries a little.'} /></div>
                <div className={`font-jakarata font-bold text-[13px] leading-[15px] mb-[11px] ${theme.color === 'dark' ? "text-light-main" : "text-light-grey"}`}>Subtasks</div>
                {subTasks.map((subtask, idx) => {
                    return <div key={idx} className='flex justify-between items-center mb-[10px]'>
                        <div className={`w-[90%]`}><Subtasks multiline={true} entireSubtask={subTasks} idx={idx} value={subtask} setValue={setSubtasks} placeholder={`${idx === 0 ? 'e.g. Make coffee' : 'e.g. Drink coffee & smile'}`} /></div>
                        <div className='hover:cursor-pointer' onClick={(e) => removeSubTaskHandler(e, idx)}>
                            <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
                                <g fill="#828FA3" fill-rule="evenodd">
                                    <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                                    <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                                </g>
                            </svg>
                        </div>
                    </div>
                })}
                <div className='mb-[27px]'>
                    <div className='w-[100%] h-[40px]'
                        onClick={addSubTaskHandler}
                    >
                        <LightButton>+Add new subtask</LightButton>
                    </div>
                </div>
                <div className={`font-jakarata font-bold text-[13px] leading-[15px] mb-[11px] ${theme.color === 'dark' ? "text-light-main" : "text-dark-main"}`}>Status</div>
                <div className={`mb-[27px]`}>
                    <SelectInput columns={fullData.columns} current={status} setCurrent={setStatus} />
                </div>
                <div className=''>
                    <div className='w-[100%] h-[40px]'
                        onClick={saveChanges}
                    >
                        <DarkButton>Save changes</DarkButton>
                    </div>
                </div>
                <div className='h-[24px]'>

                </div>
                {/* </ScrollContainer> */}
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

        </div>


    )
}

export default EditTask