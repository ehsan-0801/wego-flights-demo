import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickFromCalendar = ({ LabelName, width }) => {
    const [startDate, setStartDate] = useState(null);

    const handleDateChange = date => {
        setStartDate(date);
    };

    return (
        <div className='relative ml-2'>
            <DatePicker
                selected={ startDate }
                onChange={ handleDateChange }
                startDate={ startDate }
                endDate={ startDate }
                monthsShown={ 2 }
                dateFormat="dd MMM, yyyy"
                className={ `input input-bordered outline-none w-[${width}px] input_field` }
                wrapperClassName="date-picker-wrapper"
                popperPlacement="bottom-start"
            />
            <label htmlFor="" className={ `absolute left-2 ${startDate ? 'top-[-3px] text-xs' : 'top-3'} label_field transition-all duration-300` }>{ LabelName }</label>
        </div>
    );
};

export default DatePickFromCalendar;
