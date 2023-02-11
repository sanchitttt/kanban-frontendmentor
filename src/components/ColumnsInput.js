import { OutlinedInput } from "@mui/material";
import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";

export default function Subtasks({ entireColumnNames, multiline, value, idx, setValue, placeholder, type, maxLength, color }) {
    const theme = useContext(ThemeContext);

    const changeHandler = (e) => {
        const currArr = [...entireColumnNames];
        currArr[idx].name = e.target.value;
        setValue([...currArr]);
    }

    return (
        <OutlinedInput multiline={multiline ? multiline : false}
            style={{ fontSize: '13px' }}
            color={color} fullWidth type={type ? type : 'text'}
            className={theme.color === 'dark' ? 'inputFieldDark'
                : 'inputFieldLight'} placeholder={idx<=1?placeholder:''} value={value}
            onChange={changeHandler} maxLength={maxLength ? maxLength : null} />
    )
}
