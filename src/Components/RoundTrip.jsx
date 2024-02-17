import React from 'react';
import { GoArrowSwitch } from "react-icons/go";
import PlaceSearch from './PlaceSearch';
import DatePickFromCalendar from './DatePickFromCalendar';
import PassengerCounter from './PassengerCounter';
import AirplaneClassSelect from './AirplaneClassSelect';

const RoundTrip = () => {
    return (
        <>
            <div className='flex py-4'>
                <PlaceSearch LabelName={ "From" } width={ "230" }></PlaceSearch>
                <span className='flex items-center justify-center w-[40px]'><GoArrowSwitch /></span>
                <PlaceSearch LabelName={ "To" } width={ "230" }></PlaceSearch>
                <DatePickFromCalendar LabelName={ "Depart" } width={ "230" } />
                <DatePickFromCalendar LabelName={ "Return" } width={ "230" } />
            </div>
            <div className='flex justify-between items-center'>
                <div>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">Direct Flights only</label>
                </div>
                <PassengerCounter />
                <AirplaneClassSelect />
                <button className="bg-[#188920] text-white px-10 py-2 rounded-full text-2xl">Search</button>
            </div>
        </>
    );
};

export default RoundTrip;