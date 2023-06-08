import { useState } from "react";
import { Calendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './index.css';

export default function DatePicker (props) {
    const [value, setValue] = useState(new Date());


    const [date, setDate] = useState(new Date());

  

    return (
        <>
        <Calendar minDate={new Date()}   onChange={(value) => { 
            setValue(value);
            props.setDate(value)}} value={value}/>
        </>
    )
}