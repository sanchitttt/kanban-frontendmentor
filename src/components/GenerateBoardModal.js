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
import { ModalsContext } from './Dashboard';
import CircularProgress, { circularProgressClasses } from "@mui/material/CircularProgress";


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

function GenerateBoardModal({ boardsData, setBoardsData, setGenerateBoardModal }) {
    const modals = useContext(ModalsContext);
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [newBoard, setNewBoard] = useState();
    const theme = useContext(ThemeContext);



    const makeApiCallForGeneratingBoard = (event, promptValue) => {
        if (!prompt.length) errorToast('Prompt cant be empty', theme.color)
        else {
            const fetch = async () => {
                try {
                    const result = await axios.post(routes.GENERATE_BOARD_ROUTE, { prompt: promptValue }, { withCredentials: true })
                    const curr = modals.boardsData.val;
                    console.log(result.data, result.data);
                    curr.boards.push(result.data);
                    modals.boardsData.method({ ...curr });
                    setGenerateBoardModal(false);
                    successToast('Board created ✅', theme.color)
                } catch (err) {
                    console.log(err);
                    errorToast('Enter a valid prompt', theme.color);

                }
            }
            fetch();
            setLoading(true);
        }
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


    return (
        <div className={`overflow-scroll rounded-[6px] flex items-center justify-center md:w-[480px] md:h-[520px] sm-w-[343px] vs:w-[300px] sm-h-[413px] ${theme.color === 'dark' ? 'bg-dark-grey' : 'bg-light-main'}`}>
            <div className='sm-w-[295px] flex flex-col vs:w-[90%] sm-h-[360px] md:w-[417px] flex justify-between md:h-[460px]'>
                <div className={`font-jakarata font-bold text-[18px] mt-[29px] leading-[23px] ${theme.color === 'dark' ? "text-light-main" : "text-dark-main"} mb-[27px]`}>Generate Board Using AI</div>
                <div className={`font-jakarata font-bold text-[13px] leading-[15px] mb-[11px] ${theme.color === 'dark' ? "text-light-main" : "text-light-grey"}`}>Prompt</div>
                <div className={`mb-[27px]`}>
                    <InputField multiline value={prompt} setValue={setPrompt} placeholder={'Plan for cracking interviews at FAANG'} />
                </div>
                {/* <div className={`font-jakarata font-bold text-[13px] leading-[15px] mb-[11px] ${theme.color === 'dark' ? "text-light-main" : "text-light-grey"}`}>Board Columns (optional)</div> */}
                {/* {columnNames.map((column, idx) => {
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
        })} */}
                <div className='mb-[27px] mt-[15px]'>
                    {/* <div className='w-[100%] h-[40px]'
            onClick={() => {
              addHandler();
            }}
          >
            <LightButton>+Add columns</LightButton>
          </div> */}
                </div>
                <div className='mb-[30px]'>
                    <div className={`h-[50px] flex items-center justify-center rounded-full  ${theme.color === 'light' ? loading ? 'bg-mainPurpleHover' : 'bg-mainPurple' : loading ? 'bg-mainPurpleHover' : 'bg-mainPurple'} `}
                        onClick={(e) => makeApiCallForGeneratingBoard(e, prompt)}
                    >
                        {loading ?
                            <div className='flex justify-center items-center gap-[15px]'>
                                <CircularProgress
                                    variant="indeterminate"
                                    disableShrink
                                    sx={{
                                        color: (theme) => "white",
                                        animationDuration: "550ms",
                                        left: 0,
                                        [`& .${circularProgressClasses.circle}`]: {
                                            strokeLinecap: "round"
                                        }
                                    }}
                                    size={20}
                                    thickness={4}
                                />
                                <div className='font-jakarata text-light-main text-[13px] font-bold'>{loading ? "Generating board..." : "Generate board"}</div>
                            </div>
                            :
                            <div className='font-jakarata text-light-main text-[13px] font-bold'>{loading ? "Generating board..." : "Generate board"}</div>}
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
        </div>
    )
}

export default GenerateBoardModal