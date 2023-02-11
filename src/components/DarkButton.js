import React from 'react'

function DarkButton({ children }) {
    return (
        <div className={`w-[100%] h-[100%] flex items-center justify-center rounded-full bg-mainPurple } hover:cursor-pointer `}>
            <div className='font-jakarata text-light-main text-[13px] font-bold'>{children}</div>
        </div>
    )
}

export default DarkButton;