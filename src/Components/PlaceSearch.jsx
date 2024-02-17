import React, { useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { PiAirplaneInFlight } from "react-icons/pi";
const PlaceSearch = ({ LabelName, width }) => {
    const [place, setPlace] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [focusedIndex, setFocusedIndex] = useState(-1);

    const updateLabel = (suggestion) => {
        const labelField = document.querySelector('.label_field');
        if (suggestion.city_name || suggestion.airport_name) {
            labelField.classList.add('filled');
        } else {
            labelField.classList.remove('filled');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setFocusedIndex(prevIndex => (prevIndex + 1) % suggestions.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setFocusedIndex(prevIndex => (prevIndex - 1 + suggestions.length) % suggestions.length);
        } else if (e.key === 'Enter' && focusedIndex !== -1) {
            e.preventDefault();
            const selectedSuggestion = suggestions[focusedIndex];
            const placeName = selectedSuggestion.city_name + ", " + selectedSuggestion.country_name + "(" + selectedSuggestion.code + ")";
            const airportName = selectedSuggestion.airport_name + ", " + selectedSuggestion.country_name + "(" + selectedSuggestion.code + ")";
            setPlace(placeName, airportName);
            setSuggestions([]);
            setFocusedIndex(-1);
            updateLabel(selectedSuggestion);
        }
    };

    const handlePlaceChange = async (value) => {
        if (!value) {
            // Handle empty value or null value
            setPlace("");
            setSuggestions([]);
            setFocusedIndex(-1);
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
                (item.city_name && item.city_name.toLowerCase().includes(value.toLowerCase())) ||
                (item.country_name && item.country_name.toLowerCase().includes(value.toLowerCase())) ||
                (item.airport_name && item.airport_name.toLowerCase().includes(value.toLowerCase()))
            );
            // console.log(filteredSuggestions)
            setSuggestions(filteredSuggestions);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error.message);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        const placeName = suggestion.city_name + ", " + suggestion.country_name + "(" + suggestion.code + ")";
        setPlace(placeName);
        setSuggestions([]);
        setFocusedIndex(-1);
        updateLabel(suggestion);
    };
    return (
        <div className='relative'>
            <input
                type="text"
                className={ `input input-bordered outline-none w-[${width}px] input_field` }
                value={ place
                }
                onChange={ (e) => handlePlaceChange(e.target.value) }
                onKeyDown={ handleKeyDown }
            />
            <label className='absolute top-3 left-2 label_field'>{ LabelName }</label>
            <ul className="absolute z-10 bg-white border border-gray-300 rounded mt-1 w-[300px] shadow-md max-h-48 overflow-y-auto w-[400px]">
                { suggestions.map((suggestion, index) => (
                    <li key={ index }
                        className={ `Suggestion_list cursor-pointer py-1 px-2 hover:bg-gray-100 ${index === focusedIndex ? 'focused' : ''}` }
                        onClick={ () => handleSuggestionClick(suggestion) }>
                        <div className='flex items-center justify-between'>
                            <p className='flex items-center justify-center'> <FaLocationDot color='#188920' className='mr-2' />{ suggestion.city_name }, { suggestion.country_name }</p>
                            <p>{ suggestion.code }</p>
                        </div>
                    </li>
                )) }
                { suggestions.map((suggestion, index) => (
                    <li key={ index }
                        className={ `Suggestion_list cursor-pointer py-1 px-2 hover:bg-gray-100 ${index === focusedIndex ? 'focused' : ''}` }
                        onClick={ () => handleSuggestionClick(suggestion) }>
                        <div className='flex items-center justify-between'>
                            <p className='flex items-center justify-center'> <PiAirplaneInFlight color='#188920' className='mr-2' />{ suggestion.airport_name }, { suggestion.country_name }</p>
                            <p>{ suggestion.code }</p>
                        </div>
                    </li>
                )) }
            </ul>
        </div>
    );
};

export default PlaceSearch;