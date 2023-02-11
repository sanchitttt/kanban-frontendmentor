import { MenuItem, OutlinedInput, Select } from '@mui/material'
import React, { useContext } from 'react'
import ThemeContext from '../contexts/ThemeContext'

function SelectInput({ disabled, columns, current, setCurrent }) {
    const theme = useContext(ThemeContext);

    return (
        <div id='mySelect'>
            <Select
            disabled={disabled}
                sx={{ color: theme === 'dark' ? '#000112' : "#FFFFFF", fontFamily: 'Plus Jakarta Sans', fontSize: '13px' }}
                fullWidth
                // labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
            >
                {
                    columns.map((column, idx) => {
                        return <MenuItem key={idx} value={column.name}>{column.name}</MenuItem>
                    })
                }
            </Select>
        </div>

    )
}

export default SelectInput