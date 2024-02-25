import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickFromCalendarforDeparture = ({ LabelName, width, setDepartDate }) => {
    const [startDate, setStartDate] = useState(null);

    const handleDateChange = date => {
        const newDate = new Date(date)
        const yyyy = newDate.getFullYear();
        let mm = newDate.getMonth() + 1; // month is zero-based
        let dd = newDate.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedDate = yyyy + '-' + mm + '-' + dd;
        console.log(formattedDate);
        setStartDate(date);
        setDepartDate(formattedDate);
    };

    return (
        <div className='relative ml-2'>
            <DatePicker
                selected={ startDate }
                onChange={ handleDateChange }
                startDate={ startDate }
                endDate={ startDate }
                monthsShown={ 2 }
                dateFormat="dd-MM-yyyy"
                className={ `input input-bordered outline-none w-[${width}px] input_field` }
                wrapperClassName="date-picker-wrapper"
                popperPlacement="bottom-start"
            />
            <label htmlFor="" className={ `absolute left-2 ${startDate ? 'top-[-3px] text-xs' : 'top-3'} label_field transition-all duration-300` }>{ LabelName }</label>
        </div>
    );
};

export default DatePickFromCalendarforDeparture;
