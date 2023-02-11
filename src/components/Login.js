import CircularProgress, { circularProgressClasses } from "@mui/material/CircularProgress";
import axios from "axios";
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import routes from "../config/config";
import ThemeContext from '../contexts/ThemeContext';
import InputField from './InputField';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

function Login() {
  const theme = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const navigateToSignup = () => navigate('/register');

  const loginHandler = () => {
    if (email.length && password.length) {
      const loginBody = {
        email: email,
        password: password
      }
      const loginUser = async () => {
        try {
          const response = await axios.post(routes.LOGIN_ROUTE, loginBody,{withCredentials:true});
          if (response.status === 200) {
            setLoading(false);
            successToast('Redirecting you to dashboard...',theme.color)
            let id = setTimeout(() => {
                navigate('/dashboard');
                clearTimeout(id);
            },1000)
            
          }
        } catch (error) {
          if (error.response.status === 401) {
            errorToast(error.response.data.message, theme.color);
            setLoading(false);
          }
          else if(error.response.status === 400){
            errorToast('Invalid format of email or password', theme.color);
            setLoading(false);
          }
        }
      }
      setLoading(true);
      loginUser();
    }
  }

  return (
    <div className={`w-[100vw] h-[100vh] flex justify-center items-center ${theme.color === 'dark' ? 'bg-dark-grey' : 'bg-light-main'}`}>
      <div className='absolute top-[0] left-[50%] translate-x-[-50%] translate-y-[50%] '><Logo /></div>
      <div className={`absolute bottom-0 w-[100%] flex items-center justify-center ${theme.color === 'dark' ? 'bg-dark-darkBG' : 'bg-light-darkBG'}`}>
        <div><ThemeToggle /></div>
      </div>
      <div id='signupBox' className={`relative rounded-[10px] flex justify-center items-center sm:w-[80%] sm:h-[350px] lg:w-[40%]   ${theme.color === 'dark' ? 'bg-dark-darkBG' : 'bg-light-darkBG'}`}>
        <div className={`w-[90%] h-[90%] flex justify-center flex-col justify-around items-center`}>
          <InputField value={email} setValue={setEmail} placeholder={'Email'} />
          <InputField value={password} setValue={setPassword} placeholder={'Password'} type="Password" />
          <div className='z-[1000] w-[90%] flex items-center justify-center h-[40px]'

          >
            <div className={`w-[100%] h-[100%] flex items-center justify-center rounded-full  ${theme.color === 'light' ? loading ? 'bg-mainPurpleHover' : 'bg-mainPurple' : loading ? 'bg-mainPurpleHover' : 'bg-mainPurple'} `}
              onClick={() => loginHandler()}
            >
              {loading ?
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
                :
                <div className='font-jakarata text-light-main text-[13px] font-bold'>Login</div>}
            </div>
          </div>
        </div>
        <div className='flex items-center justify-center z-[100] absolute bottom-[-25px] left-50 font-jakarata text-s  text-mainPurple'>Dont't have an account?<span onClick={navigateToSignup} className={`ml-[10px] underline-offset-1 underline   ${theme.color === 'dark' ? 'text-light-main' : 'text-dark-grey'}`}>Signup now</span></div>
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

export default Login