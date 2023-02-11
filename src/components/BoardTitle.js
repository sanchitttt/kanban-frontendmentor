import React from 'react'

const colors = [
  '#67E2AE',
  '#8471F2',
  '#49C4E5',
]

function BoardTitle({ children, totalTasks, idx }) {
  return (
    <div className='flex-row flex items-center mb-[27px]'>
      <div style={{ backgroundColor: colors[idx] }} className={`h-[15px] w-[15px] rounded-full`}>
      </div>
      <div className='font-jakarata tracking-[1px] text-light-grey ml-[12px]'>
        {children} ({totalTasks})
      </div>
    </div>

  )
}

export default BoardTitle