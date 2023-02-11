import ThemeContext from '../contexts/ThemeContext';
import { OutlinedInput } from '@mui/material';
import React, { useContext } from 'react'
import './styles.css'


function InputField({ multiline, value, onChangeBool, idx, onChange, setValue, placeholder, type, maxLength, color }) {
    const theme = useContext(ThemeContext);
    return (
        <OutlinedInput multiline={multiline ? multiline : false}
            style={{ fontSize: '13px' }}
            color={color} fullWidth type={type ? type : 'text'}
            className={theme.color === 'dark' ? 'inputFieldDark'
                : 'inputFieldLight'} placeholder={placeholder} value={value}
            onChange={onChangeBool ? (e) => {
                onChange({ value: e.target.value, index: idx })
            } : (e) => setValue(e.target.value)} maxLength={maxLength ? maxLength : null} />
    )
}

export default InputField