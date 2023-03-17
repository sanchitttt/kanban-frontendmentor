import React, { useContext, useEffect, useState } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import { ModalsContext } from './Dashboard';



export function Tippy({ setTippyHide }) {
    const modals = useContext(ModalsContext);
    const fn = (e) => {
        let more = document.getElementById('more');
        let moreMobile = document.getElementById('moreMobile');
        let moreTippy = document.getElementById('moreTippy');
        let moreSvg = document.getElementById('more-svg')

        if (more || moreMobile || moreSvg) {
                if (moreTippy) {
                    if (!moreSvg.contains(e.target) && !moreTippy.contains(e.target) && !(more.contains(e.target) || moreMobile.contains(e.target))) {
                        console.log(more.contains(e.target));
                        setTippyHide(true);
                    }
                }
            }
        
    }
    useEffect(() => {
        document.addEventListener('click', (e) => fn(e))
        return () => {
            document.removeEventListener('click', (e) => fn(e))
        }
        //eslint-disable-next-line
    }, []);
    const theme = useContext(ThemeContext);
    return <div id='moreTippy' style={{
        boxShadow: theme.color === 'light' ?
            '0px 10px 20px rgba(54, 78, 126, 0.25)' : '0px 1px 1px #000112'
    }}
        className={` rounded-[8px] absolute top-[40px] right-0 w-[192px] 
        h-[96px] flex flex-col  ${theme.color === 'dark' ? 'bg-dark-darkBG'
                : 'bg-light-main'}`}>
        <div className={`font-jakarata leading-[23px] text-[13px] 
        text-light-grey ml-[17px] mt-[24px] mb-[15px]`}
            onClick={() => modals.editBoard.method(true)}
        >Edit Board</div>
        <div className={`font-jakarata leading-[23px] text-[13px]  text-red ml-[17px]`}
            onClick={() => modals.deleteBoard.method(true)}
        >Delete Board</div>

    </div>
}
function AddNewTask({ disabled }) {
    const [tippyHide, setTippyHide] = useState(true);

    const modals = useContext(ModalsContext);

    return (
        <>
            <div className={`lg:hidden xl:hidden md:hidden vs:flex sm:flex justify-between w-[68px] h-[32px] flex items-center`}>
                <div className={`hover:cursor-pointer w-[48px] h-[32px] rounded-full ${disabled ? 'bg-mainPurpleHover' : 'bg-mainPurple'}`}
                    onClick={() => modals.addTask.method(true)}
                >
                    <div className='flex items-center justify-center w-[100%] h-[100%]'>
                        <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#FFF" d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z" />
                        </svg>
                    </div>
                </div>
                <div className='hover:cursor-pointer relative flex items-center justify-center h-[100%]'
                    onClick={() => setTippyHide(false)}
                    id='moreMobile'
                >
                    <svg
                        // id='more-svg'
                        width="5" height="20" xmlns="http://www.w3.org/2000/svg">
                        <g fill="#828FA3" fillRule="evenodd">
                            <circle cx="2.308" cy="2.308" r="2.308" />
                            <circle cx="2.308" cy="10" r="2.308" />
                            <circle cx="2.308" cy="17.692" r="2.308" />
                        </g>
                    </svg>
                    {!tippyHide && <Tippy setTippyHide={setTippyHide} />}
                </div>
            </div>

            <div className='lg:flex md:flex xl:flex vs:hidden justify-between xs:hidden w-[192px] h-[48px] flex items-center'>
                <div className={`w-[164px] h-[48px] hover:cursor-pointer flex items-center justify-center rounded-full ${disabled ? 'bg-mainPurpleHover' : 'bg-mainPurple'}`}
                    onClick={() => modals.addTask.method(true)}
                >
                    <div className='mr-[2px]'>
                        <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#FFF" d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z" />
                        </svg>
                    </div>
                    <div className={`font-jakarata text-light-main `}>Add New Task</div>
                </div>
                <div className='hover:cursor-pointer relative h-[100%]  flex justify-center items-center'
                    id='more'
                    onClick={() => setTippyHide(false)}
                >
                    <svg id='more-svg' width="5" height="20" xmlns="http://www.w3.org/2000/svg">
                        <g fill="#828FA3" fillRule="evenodd">
                            <circle cx="2.308" cy="2.308" r="2.308" />
                            <circle cx="2.308" cy="10" r="2.308" />
                            <circle cx="2.308" cy="17.692" r="2.308" />
                        </g>
                    </svg>
                    {!tippyHide && <Tippy setTippyHide={setTippyHide} />}
                </div>
            </div>
        </>

    )


}

export default AddNewTask
