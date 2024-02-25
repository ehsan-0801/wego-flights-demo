import React, { useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { PiAirplaneInFlight } from "react-icons/pi";

const PlaceSearchforReturn = ({ LabelName, width, setArrivalCode }) => {
    const [place, setPlace] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [focusedIndex, setFocusedIndex] = useState(-1);

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setFocusedIndex((prevIndex) => Math.min(prevIndex + 1, suggestions.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setFocusedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } else if (e.key === 'Enter' && focusedIndex !== -1) {
            e.preventDefault();
            const selectedSuggestion = suggestions[focusedIndex];
            const selectedPlace = selectedSuggestion.search_contents;
            setPlace(selectedPlace);
            setArrivalCode(selectedSuggestion.code);
            setSuggestions([]);
            setFocusedIndex(-1);
        }
    };

    const handlePlaceChange = async (value) => {
        if (!value) {
            clearSuggestions();
            return;
        }
        setPlace(value);
        try {
            const response = await fetch("airport.json");
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const filteredSuggestions = data.filter(item =>
                item.search_contents.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error.message);
        }
    };

    const clearSuggestions = () => {
        setPlace("");
        setSuggestions([]);
        setArrivalCode("");
        setFocusedIndex(-1);
    };

    const handleSuggestionClick = (suggestion) => {
        const selectedPlace = suggestion.search_contents;
        setPlace(selectedPlace);
        setArrivalCode(suggestion.code);
        setSuggestions([]);
        setFocusedIndex(-1);
    };


    return (
        <div className='relative'>
            <input
                type="text"
                className={ `input input-bordered outline-none w-[${width}px] input_field` }
                value={ place }
                onChange={ (e) => handlePlaceChange(e.target.value) }
                onKeyDown={ handleKeyDown }
            />
            <label className='absolute top-3 left-2 label_field'>{ LabelName }</label>
            <ul className="absolute z-10 bg-white border border-gray-300 rounded mt-1 w-[300px] shadow-md max-h-48 overflow-y-auto w-[400px]">
                { suggestions.map((suggestion, index) => (
                    <li key={ suggestion.code }
                        className={ `Suggestion_list cursor-pointer py-1 px-2 hover:bg-gray-100 ${focusedIndex === index ? 'focused' : ''}` }
                        onClick={ () => handleSuggestionClick(suggestion) }
                    >
                        <div className='flex items-center justify-between'>
                            <p className='flex items-center justify-center'>
                                <PiAirplaneInFlight color='#f30921' className='mr-2' />
                                <div className='flex flex-col'>
                                    <span className='font-semibold'>{ suggestion.city_name }</span>
                                    <span>{ suggestion.airport_name }</span>
                                </div>
                            </p>
                        </div>
                    </li>
                )) }
            </ul>
        </div>
    );
};

export default PlaceSearchforReturn;
