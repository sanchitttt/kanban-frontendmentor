import axios from 'axios';
import React, { useContext } from 'react'
import ThemeContext from '../contexts/ThemeContext'
import { ModalsContext } from './Dashboard';

function NewColumn() {
    const theme = useContext(ThemeContext);
    const modals = useContext(ModalsContext);

    return (
        <div

            style={{
                background: theme.color === 'dark' ?
                    'linear-gradient(180deg, rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.125) 100%)' :
                    'linear-gradient(180deg, #E9EFFA 0%, rgba(233, 239, 250, 0.5) 100%)'
            }}
            className={`hover:cursor-pointer w-[280px] h-[814px] mt-[50px] rounded-[6px] flex items-center justify-center`}>
            <div className='font-jakarata text-xl leading-[30.24px] text-bold text-light-grey'
                onClick={() => {
                    modals.editBoard.method(true);
                }}
            >
                +New Column
            </div>
        </div>
    )
}

export default NewColumn