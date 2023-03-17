import React, { useContext, useState } from 'react'
import ThemeContext from '../contexts/ThemeContext'
import DarkButton from './DarkButton';
import InputField from './InputField';
import LightButton from './LightButton';
import ColumnsInput from './ColumnsInput';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import routes from '../config/config';


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
        if (!arr[i].name.length) return false;
    }
    return true;
}

function EditBoard({ data, setShowEditBoard, idx }) {
    const [name, setName] = useState(data.name);
    const [columnNames, setColumnNames] = useState(data.columns);
    const theme = useContext(ThemeContext);

    const saveChanges = () => {
        try {
            if (!verifier(columnNames)) errorToast('Column name cant be empty', theme.color)
            // else if(!name.length) errorToast('Board name cant be empty', theme.color);
            else {
                const payload = {
                    name: name,
                    columnName: columnNames,
                    boardIndex: idx
                }

                axios.patch(routes.EDIT_BOARD_ROUTE, payload, { withCredentials: true }).then(() => {
                }).catch((err) => {
                    errorToast(err.response.data.details[0].message, theme.color)
                })
                setShowEditBoard(false);
            }
        } catch (error) {


        }

    }

    const removeHandler = (idx) => {
        //eslint-disable-next-line
        const filtered = columnNames.filter((item, index) => {
            if (idx !== index) return item;
        });
        setColumnNames([...filtered]);
    }

    const addHandler = (idx) => {
        const curr = columnNames;
        curr.push({ name: '', tasks: [] });
        setColumnNames([...curr]);
    }

    return (
        <div className={`overflow-scroll rounded-[6px] sm:w-[343px] sm:h-[473px] md:w-[480px] md:h-[600px] flex items-center justify-center ${theme.color === 'dark' ? "bg-dark-grey" : "bg-light-main"}`}>
            <div className='sm:w-[295px] sm:h-[417px] md:w-[414px] md:h-[500px]'>
                <div className={`font-jakarata font-bold font-[18px] leading-[23px] ${theme.color === 'dark' ? "text-light-main" : "text-dark-main"} mb-[29px]`}>Edit Board</div>
                <div className={`font-jakarata font-bold text-[13px] leading-[15px] mb-[11px] ${theme.color === 'dark' ? "text-light-main" : "text-light-grey"}`}>Board Name</div>
                <div className={`mb-[27px]`}><InputField value={name} setValue={setName} placeholder={'e.g. Web Design'} /></div>
                <div className={`font-jakarata font-bold text-[13px] leading-[15px] mb-[11px] ${theme.color === 'dark' ? "text-light-main" : "text-light-grey"}`}>Board Columns</div>
                {columnNames.map((column, idx) => {
                    return <div key={idx} className='flex justify-between items-center mb-[10px]'>
                        <div className={`w-[90%]`}><ColumnsInput entireColumnNames={columnNames} forEditBoard idx={idx} value={column.name} placeholder={column.name} setValue={setColumnNames} /></div>
                        <div
                            onClick={(e) => removeHandler(idx)}
                        >
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
                        onClick={() => {
                            addHandler();
                        }}
                    >
                        <LightButton

                        >+Add new columns</LightButton>
                    </div>
                </div>
                <div className='mb-[30px]'>
                    <div className='w-[100%] h-[40px] '
                        onClick={saveChanges}
                    >
                        <DarkButton>Save changes</DarkButton>
                    </div>
                </div>

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

export default EditBoard