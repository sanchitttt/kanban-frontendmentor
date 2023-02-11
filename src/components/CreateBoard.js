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

const verifier = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].name.length) return false;
  }
  return true;
}


function CreateBoard() {
  const [name, setName] = useState('');
  const [columnNames, setColumnNames] = useState([
    { name: 'Todo', tasks: [] },
    { name: 'Doing', tasks: [] }
  ]);
  const theme = useContext(ThemeContext);


  const saveChanges = () => {
    if (!name.length) errorToast('Board name cant be empty', theme.color)
    if (!verifier(columnNames)) errorToast('Columns cant be empty', theme.color)
    else {
      const payload = {
        name: name,
        columns: columnNames
      }
      const postBoard = async () => {
        try {
          await axios.patch(routes.ADD_BOARD_ROUTE, payload, { withCredentials: true });

        } catch (error) {
          console.log('error')
        }
      }
      postBoard();
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
    <div className={`overflow-scroll rounded-[6px] flex items-center justify-center md:w-[480px] md:h-[520px] sm-w-[343px] sm-h-[413px] ${theme.color === 'dark' ? 'bg-dark-grey' : 'bg-light-main'}`}>
      <div className='sm-w-[295px] flex flex-col sm-h-[360px] md:w-[417px] flex justify-between md:h-[460px]'>
        <div className={`font-jakarata font-bold text-[18px] mt-[29px] leading-[23px] ${theme.color === 'dark' ? "text-light-main" : "text-dark-main"} mb-[27px]`}>Add New Board</div>
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
        <div className='mb-[27px] mt-[15px]'>
          <div className='w-[100%] h-[40px]'
            onClick={() => {
              addHandler();
            }}
          >
            <LightButton>+Add new subtask</LightButton>
          </div>
        </div>
        <div className='mb-[30px]'>
          <div className='w-[100%] h-[40px] '
            onClick={saveChanges}
          >
            <DarkButton>Save changes</DarkButton>
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

export default CreateBoard