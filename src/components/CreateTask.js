import React, { useContext, useState } from 'react'
import ThemeContext from '../contexts/ThemeContext'
import LightButton from './LightButton';
import InputField from './InputField';
import SelectInput from './SelectInput';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DarkButton from './DarkButton';
import Subtasks from './Subtasks';
import routes from '../config/config';
import axios from 'axios';



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

function CreateTask({ data, boardIndex, setModalOpen }) {
    const theme = useContext(ThemeContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [subTasks, setSubtasks] = useState([{ title: '', isCompleted: false }, { title: '', isCompleted: false },])
    const [status, setStatus] = useState(data?data.columns[0].name:'');
    //eslint-disable-next-line
    const [columnIndex,setColumnIndex] = useState(0);



    const saveChanges = () => {
        
        if (!verifier(subTasks)) errorToast('Subtask cant be empty!', theme.color);
        else if (!title.length) errorToast('Title cant be empty', theme.color)
        else {
            const payload = {
                boardIndex: boardIndex,
                title: title,
                description: description,
                status: status,
                subtasks: subTasks,
            }
            for(let i=0;i<data.columns.length;i++){
                if(data.columns[i].name === status){
                    payload.columnIndex = i;
                    break;
                }
            }
            //eslint-disable-next-line
            const patchAddTask = async () => {
                try {
                    //eslint-disable-next-line
                    const result = await axios.patch(routes.ADD_TASK_ROUTE, payload, { withCredentials: true });
                    setModalOpen(false);
                } catch (error) {
                    console.log('error');
                }
            }
            patchAddTask();
     
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
        <div className={`overflow-scroll vs:w-[343px] sm:w-[343px] vs:h-[600px] sm:h-[500px] md:w-[480px] md:h-[700px] rounded-[6px] flex items-center justify-center overflow-hidden ${theme.color === 'dark' ? "bg-dark-grey" : "bg-light-main"}`}>
            <div className={`vs:w-[297px] sm:w-[297px] vs:h-[550px] flex-col sm:h-[500px] md:w-[418px] md:h-[700px] flex justify-start flex justify-start `}>
                <div className={`font-jakarata font-bold text-[18px] mt-[29px] leading-[23px] ${theme.color === 'dark' ? "text-light-main" : "text-dark-main"} mb-[27px]`}>Add New Task</div>
                <div className={`font-jakarata font-bold text-[13px] leading-[15px] mb-[11px] ${theme.color === 'dark' ? "text-light-main" : "text-dark-main"}`}>Title</div>
                <div className={`mb-[27px]`}><InputField value={title} setValue={setTitle} placeholder={'e.g. take a coffee break'} /></div>
                <div className={`font-jakarata font-bold text-[13px] leading-[15px] mb-[11px] ${theme.color === 'dark' ? "text-light-main" : "text-dark-main"}`}>Description</div>
                <div className={`mb-[27px]`}><InputField multiline={true} value={description} setValue={setDescription} placeholder={'e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little.'} /></div>
                <div className={`font-jakarata font-bold text-[13px] leading-[15px] mb-[11px] ${theme.color === 'dark' ? "text-light-main" : "text-dark-main"}`}>Subtasks</div>
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
                    <SelectInput setColumnIndex={setColumnIndex} columns={data?data.columns:[]} current={status} setCurrent={setStatus} />
                </div>
                <div className='mb-[30px]'>
                    <div className='w-[100%] h-[40px] '
                        onClick={saveChanges}
                    >
                        <DarkButton

                        >Create Task</DarkButton>
                    </div>
                </div>
                <div className='h-[24px]'>

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
        </div>
    )
}

export default CreateTask