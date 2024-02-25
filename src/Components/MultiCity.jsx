import React, { useState } from 'react';
import { GoArrowSwitch } from "react-icons/go";
import DatePickFromCalendar from './DatePickFromCalendar';
import PassengerCounter from './PassengerCounter';
import AirplaneClassSelect from './AirplaneClassSelect';
import { FaPlus } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";
import PlaceSearchforDeparture from './PlaceSearchforDeparture';
import PlaceSearchforReturn from './PlaceSearchforReturn';

const MultiCity = () => {
    const [layers, setLayers] = useState([{ id: 1, isOpen: true }]); // Initialize with one open layer

    const addLayer = () => {
        const newId = layers.length + 1;
        setLayers([...layers, { id: newId, isOpen: true }]);
    };

    const closeLayer = (id) => {
        setLayers(layers.filter(layer => layer.id !== id));
    };
    return (
        <div className='relative w-[1000px] z-10 top-[-400px] left-[200px] bg-white px-4'>
            <button className="bg-[#f30921] text-white px-4 py-1 rounded-full flex justify-center items-center absolute right-6 top-[-35px] " onClick={ addLayer }> <FaPlus /> Add Flight</button>
            { layers.map(layer => (
                <div key={ layer.id } className='flex py-4'>
                    <PlaceSearchforDeparture LabelName={ "From" } width={ "200" }></PlaceSearchforDeparture>
                    <span className='flex items-center justify-center w-[40px]'><GoArrowSwitch /></span>
                    <PlaceSearchforReturn LabelName={ "To" } width={ "200" }></PlaceSearchforReturn>
                    <DatePickFromCalendar LabelName={ "Depart" } width={ "200" } />
                    <DatePickFromCalendar LabelName={ "Return" } width={ "200" } />
                    <button className='text-2xl ml-4' onClick={ () => closeLayer(layer.id) }><IoMdCloseCircle /></button>
                </div>
            )) }
            <div className='flex justify-between items-center'>
                <div>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">Direct Flights only</label>
                </div>
                <PassengerCounter />
                <AirplaneClassSelect />
                <button className="bg-[#f30921] text-white px-10 py-2 rounded-full text-2xl">Search</button>
            </div>
        </div>
    );
};

export default MultiCity;