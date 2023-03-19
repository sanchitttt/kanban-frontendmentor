import React, { useContext, useEffect, useState } from 'react'
import CircularProgress, { circularProgressClasses } from "@mui/material/CircularProgress";
import { useNavigate } from 'react-router-dom';
import ThemeContext from '../contexts/ThemeContext'
import InputField from './InputField';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle'
import { verifyName, verifyEmail, verifyPassword } from '../validations/validations';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from '../config/config';
import axios from 'axios';


const successToast = (text, theme) => {
  return toast.success(text, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
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


function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nameColor, setNameColor] = useState('');
  const [emailColor, setEmailColor] = useState('');
  const [passwordColor, setPasswordColor] = useState('');
  const [nameHelper, setNameHelper] = useState(null);
  const [emailHelper, setEmailHelper] = useState(null);
  const [passwordHelper, setPasswordHelper] = useState(null);
  const [loading, setLoading] = useState(false);

  const theme = useContext(ThemeContext);
  const navigate = useNavigate();

  //use effects for validating name,email and password fields
  useEffect(() => {
    if (name.length) {
      const result = verifyName(name);
      if (result === 'Name should be between 4 to 20 characters long') {
        setNameColor('error');
        setNameHelper(result);
      }
      else if (result === 'success') {
        setNameColor('success');
        setNameHelper(null);
      }

    }
    else {
      setNameColor(null);
      setNameHelper(null);
    }
  }, [name]);

  useEffect(() => {
    if (email.length) {
      const result = verifyEmail(email);
      if (result === 'Please enter a valid email address') {
        setEmailColor('error');
        setEmailHelper(result);
      }
      else {
        setEmailColor('success');
        setEmailHelper(null);
      }
    }
    else {
      setEmailColor(null);
      setEmailHelper(null);
    }
  }, [email]);

  useEffect(() => {

    const result = verifyPassword(password);
    if (password.length) {
      if (result === 'success') {
        setPasswordColor('success');
        setPasswordHelper(null);
      }
      else {
        setPasswordColor('error');
        setPasswordHelper(result);
      }
    }
    else {
      setPasswordColor(null);
      setPasswordHelper(null);
    }
  }, [password]);

  //reroutes to the login page
  const navigateToLogin = () => navigate('/login');

  //calls the backend server to register a user
  const registerUser = () => {
    if (!nameHelper && !emailHelper && !passwordHelper && name.length && email.length && password.length) {
      const registerUser = async () => {
        try {
          const signupObject = {
            name: name,
            email: email,
            password: password
          }

          const response = await axios.post(routes.SIGNUP_ROUTE, signupObject);
          const responseMessage = response.data.message;
          console.log(response.data);
          if (responseMessage === 'Email already taken') {
            errorToast(responseMessage, theme.color);
            setLoading(false);
          }
          else {
            setLoading(false);
            successToast('Registered successfully!',theme.color);
            successToast('Redirecting you to login page...',theme.color);
            let id = setTimeout(() => {
              navigate('/login');
              clearTimeout(id);
            },1750);
          }

        } catch (error) {
          console.log(error);
        }
      }
      setLoading(true);
      registerUser();
    }
  }

  return (
    <div>
      <div className={` signupPage w-[100vw] h-[100vh] flex relative justify-center items-center ${theme.color === 'dark' ? 'bg-dark-grey' : 'bg-light-main'}`}>
        <div className='absolute top-[0] left-[50%] translate-x-[-50%] translate-y-[50%] '><Logo /></div>
        <div className={`absolute bottom-0 w-[100%] flex items-center justify-center ${theme.color === 'dark' ? 'bg-dark-darkBG' : 'bg-light-darkBG'}`}>
          <div>
            <ThemeToggle />
          </div>
          <div>
          </div>
        </div>
        <div id='signupBox' className={`relative rounded-[10px] flex justify-center items-center sm:w-[80%] sm:h-[400px] lg:w-[40%]   ${theme.color === 'dark' ? 'bg-dark-darkBG' : 'bg-light-darkBG'}`}>

          <div className={`w-[90%] h-[90%] flex justify-center flex-col justify-around items-center`}>
            <div className={`w-[90%] sm:my-[5px]`}>
              <InputField value={name} setValue={setName} placeholder={'Name'} color={nameColor} maxLength={30} />
              <div className='text-jakarata text-red'>{nameHelper}</div>
            </div>
            <div className={`w-[90%] sm:my-[5px]`}>
              <InputField value={email} setValue={setEmail} placeholder={'Email'} color={emailColor} />
              <div className='text-jakarata text-red'>{emailHelper}</div>
            </div>
            <div className={`w-[90%] sm:my-[5px]`}>
              <InputField value={password} setValue={setPassword} placeholder={'Password'} type="Password" color={passwordColor} />
              <div className='text-jakarata text-red'>{passwordHelper}</div>
            </div>
            <div className='z-[1000] w-[90%] flex items-center justify-center h-[40px] mt-[10px]'
              onClick={() => registerUser()}
            >
              <div className={`relative w-[100%] h-[100%] flex items-center justify-center rounded-full  ${theme.color === 'light' ? loading ? 'bg-mainPurpleHover' : 'bg-mainPurple' : loading ? 'bg-mainPurpleHover' : 'bg-mainPurple'} `}>
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
                  <div className='font-jakarata text-light-main text-[13px] font-bold'>Signup</div>}
              </div>
            </div>
          </div>

          <div className='flex items-center justify-center z-[100] absolute bottom-[-25px] left-50 font-jakarata text-s  text-mainPurple'>Already have an account?<span onClick={navigateToLogin} className={`ml-[10px] underline-offset-1 underline   ${theme.color === 'dark' ? 'text-light-main' : 'text-dark-grey'}`}>Login</span></div>
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

export default Signup