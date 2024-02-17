import React, { useState } from 'react';

const PlaceSearch = ({ LabelName, width }) => {
    const [place, setPlace] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [focusedIndex, setFocusedIndex] = useState(-1);

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setFocusedIndex(prevIndex => (prevIndex + 1) % suggestions.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setFocusedIndex(prevIndex => (prevIndex - 1 + suggestions.length) % suggestions.length);
        } else if (e.key === 'Enter' && focusedIndex !== -1) {
            e.preventDefault();
            const placeName = suggestions[focusedIndex].city_name + ", " + suggestions[focusedIndex].country_name + "(" + suggestions[focusedIndex].code + ")"
            setPlace(placeName);
            setSuggestions([]);
            setFocusedIndex(-1);
            if (suggestions[focusedIndex].city_name || suggestions[focusedIndex].airport_name) {
                document.querySelector('.label_field').classList.add('filled');
            } else {
                document.querySelector('.label_field').classList.remove('filled');
            } // Reset focused index
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
                (item.country_name && item.country_name.toLowerCase().includes(value.toLowerCase()))
                ||
                (item.airport_name && item.airport_name.toLowerCase().includes(value.toLowerCase()))
            );
            setSuggestions(filteredSuggestions);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error.message);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        const placeName = suggestion.city_name + ", " + suggestion.country_name + "(" + suggestion.code + ")"
        setPlace(placeName);
        setSuggestions([]);
        setFocusedIndex(-1);
        if (suggestion.city_name || suggestion.airport_name) {
            document.querySelector('.label_field').classList.add('filled');
        } else {
            document.querySelector('.label_field').classList.remove('filled');
        }
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
            <label htmlFor="" className='absolute top-3 left-2 label_field'>{ LabelName }</label>
            <ul className="absolute z-10 bg-white border border-gray-300 rounded mt-1 w-[300px] shadow-md max-h-48 overflow-y-auto w-[400px]">
                { suggestions.map((suggestion, index) => (
                    <li key={ index }
                        className={ `Suggestion_list cursor-pointer py-1 px-2 hover:bg-gray-100 ${index === focusedIndex ? 'focused' : ''}` }
                        onClick={ () => handleSuggestionClick(suggestion) }>
                        <div className='flex items-center justify-between'>
                            <p>{ suggestion.city_name || suggestion.airport_name }, { suggestion.country_name }</p>

                            <p>{ suggestion.code }</p>
                        </div>
                    </li>
                )) }
            </ul>
        </div>
    );
};

export default PlaceSearch;