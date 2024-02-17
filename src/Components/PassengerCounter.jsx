import React, { useState } from 'react';
import { FaMinus, FaPlus, FaCaretDown, FaCaretUp } from "react-icons/fa6";

const PassengerCounter = () => {
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [passengers, setPassengers] = useState(adults + children + infants);
    const [menuOpen, setMenuOpen] = useState(false); // Track menu state

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen); // Toggle menu state
    };

    const handleAdultsDecrease = () => {
        if (adults > 1) {
            setAdults(adults - 1);
            updatePassengers(adults - 1, children, infants);
        }
    };

    const handleAdultsIncrease = () => {
        setAdults(adults + 1);
        updatePassengers(adults + 1, children, infants);
    };

    const handleChildrenDecrease = () => {
        if (children > 0) {
            setChildren(children - 1);
            updatePassengers(adults, children - 1, infants);
        }
    };

    const handleChildrenIncrease = () => {
        setChildren(children + 1);
        updatePassengers(adults, children + 1, infants);
    };

    const handleInfantsDecrease = () => {
        if (infants > 0) {
            setInfants(infants - 1);
            updatePassengers(adults, children, infants - 1);
        }
    };

    const handleInfantsIncrease = () => {
        setInfants(infants + 1);
        updatePassengers(adults, children, infants + 1);
    };

    const updatePassengers = (ad, ch, inft) => {
        setPassengers(ad + ch + inft);
    };

    return (
        <div className="relative ml-2">
            <div className="dropdown dropdown-end">
                <div tabIndex={ 0 } role="button" className="btn m-1 w-[200px]" onClick={ handleMenuToggle }>{ passengers === 1 ? `${passengers} adult` : `${passengers} Passengers` } { menuOpen ? <FaCaretUp /> : <FaCaretDown /> }</div>
                <ul tabIndex={ 0 } className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p>Adults</p>
                                <p>&#62;12 years</p>
                            </div>
                            <div>
                                <button className="btn-minus" onClick={ handleAdultsDecrease }><FaMinus /></button>
                                <span>{ adults }</span>
                                <button className="btn-plus" onClick={ handleAdultsIncrease }><FaPlus /></button>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p>Children</p>
                                <p>2-12 years</p>
                            </div>
                            <div>
                                <button className="btn-minus" onClick={ handleChildrenDecrease }><FaMinus /></button>
                                <span>{ children }</span>
                                <button className="btn-plus" onClick={ handleChildrenIncrease }><FaPlus /></button>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p>Children</p>
                                <p>&#60;2 years</p>
                            </div>
                            <div>
                                <button className="btn-minus" onClick={ handleInfantsDecrease }><FaMinus /></button>
                                <span>{ infants }</span>
                                <button className="btn-plus" onClick={ handleInfantsIncrease }><FaPlus /></button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default PassengerCounter;
