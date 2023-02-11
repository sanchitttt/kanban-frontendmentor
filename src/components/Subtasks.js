import { OutlinedInput } from "@mui/material";
import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";

export default function Subtasks({ entireSubtask, multiline, value, idx, setValue, placeholder, type, maxLength, color }) {
    const theme = useContext(ThemeContext);

    const changeHandler = (e) => {
        const currArr = [...entireSubtask];
        currArr[idx].title = e.target.value;
        setValue([...currArr]);
    }

    return (
        <OutlinedInput multiline={multiline ? multiline : false}
            style={{ fontSize: '13px' }}
            color={color} fullWidth type={type ? type : 'text'}
            className={theme.color === 'dark' ? 'inputFieldDark'
                : 'inputFieldLight'} placeholder={placeholder} value={value.title}
            onChange={changeHandler} maxLength={maxLength ? maxLength : null} />
    )
}
