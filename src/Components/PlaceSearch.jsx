import React, { useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { PiAirplaneInFlight } from "react-icons/pi";
const PlaceSearch = ({ LabelName, width }) => {
    const [place, setPlace] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedAirport, setSelectedAirport] = useState("");

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
            setFocusedIndex((prevIndex) => (prevIndex + 1) % (suggestions.length * 2));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setFocusedIndex((prevIndex) => (prevIndex - 1 + suggestions.length * 2) % (suggestions.length * 2));
        } else if (e.key === 'Enter' && focusedIndex !== -1) {
            e.preventDefault();
            const focusedSuggestionIndex = Math.floor(focusedIndex / 2);
            const selectedSuggestion = suggestions[focusedSuggestionIndex];
            const isCity = focusedIndex % 2 === 0;

            if (isCity) {
                setSelectedCity(selectedSuggestion.city_name + ", " + selectedSuggestion.country_name + "(" + selectedSuggestion.code + ")");
            } else {
                setSelectedAirport(selectedSuggestion.airport_name + ", " + selectedSuggestion.country_name + "(" + selectedSuggestion.code + ")");
            }

            // Combine city and airport for place
            const updatedPlace = isCity ? (selectedSuggestion.city_name + ", " + selectedSuggestion.country_name + "(" + selectedSuggestion.code + ")") : selectedSuggestion.airport_name + ", " + selectedSuggestion.country_name + "(" + selectedSuggestion.code + ")";
            setPlace(updatedPlace);
            setSuggestions([]);
            setFocusedIndex(-1);
            updateLabel(selectedSuggestion);
        }
    };
    const handlePlaceChange = async (value) => {
        if (!value) {
            setPlace("");
            setSuggestions([]);
            setSelectedCity("");
            setSelectedAirport("");
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
            setSuggestions(filteredSuggestions);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error.message);
        }
    };

    const handleSuggestionClick = (suggestion, isCity) => {
        if (isCity) {
            setSelectedCity(suggestion.city_name + ", " + suggestion.country_name + "(" + suggestion.code + ")");
        } else {
            setSelectedAirport(suggestion.airport_name + ", " + suggestion.country_name + "(" + suggestion.code + ")");
        }

        // Combine city and airport for place, considering existing selection
        const updatedPlace = isCity ? (suggestion.city_name + ", " + suggestion.country_name + "(" + suggestion.code + ")") : suggestion.airport_name + ", " + suggestion.country_name + "(" + suggestion.code + ")";
        setPlace(updatedPlace); // Update place state here
        setSuggestions([]);
        setFocusedIndex(-1);
        updateLabel(suggestion);
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
                    <>
                        <li key={ `${index}-city` }
                            className={ `Suggestion_list cursor-pointer py-1 px-2 hover:bg-gray-100 ${focusedIndex === index * 2 ? 'focused' : ''}` }
                            onClick={ () => handleSuggestionClick(suggestion, true) }
                        >
                            <div className='flex items-center justify-between'>
                                <p className='flex items-center justify-center'>
                                    <FaLocationDot color='#188920' className='mr-2' />
                                    { suggestion.city_name }, { suggestion.country_name }
                                </p>
                            </div>
                        </li>
                        <li key={ `${index}-airport` }
                            className={ `Suggestion_list cursor-pointer py-1 px-2 hover:bg-gray-100 ${focusedIndex === index * 2 + 1 ? 'focused' : ''}` }
                            onClick={ () => handleSuggestionClick(suggestion, false) }
                        >
                            <div className='flex items-center justify-between'>
                                <p className='flex items-center justify-center'>
                                    <PiAirplaneInFlight color='#188920' className='mr-2' />
                                    { suggestion.airport_name }
                                </p>
                            </div>
                        </li>
                    </>
                )) }
            </ul>
        </div>
    );
};

export default PlaceSearch;