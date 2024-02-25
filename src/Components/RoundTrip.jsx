import React, { useEffect, useState } from 'react';
import { GoArrowSwitch } from "react-icons/go";
import DatePickFromCalendar from './DatePickFromCalendar';
import PassengerCounter from './PassengerCounter';
import AirplaneClassSelect from './AirplaneClassSelect';
import PlaceSearchforDeparture from './PlaceSearchforDeparture';
import PlaceSearchforReturn from './PlaceSearchforReturn';
import LoadingComponent from './LoadingComponent';
import SearchResult from './SearchResult';
import DatePickFromCalendarforDeparture from './DatePickFromCalendarforDeparture';
import DatePickFromCalendarforReturn from './DatePickFromCalendarforReturn';

const RoundTrip = () => {
    const [departDate, setDepartDate] = useState(null);
    const [returnDate, setReturnDate] = useState(null);
    const [departCode, setDepartCode] = useState("");
    const [arrivalCode, setArrivalCode] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [selectedTab, setSelectedTab] = useState('Cheapest');
    const [loading, setLoading] = useState(false);
    const handleSearch = async () => {
        try {
            setLoading(true);
            const myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("apikey", "ITT88534696524514");
            myHeaders.append("secretecode", "BOUINpK3g7kUI9TJ9eVgaK8l1stXNzz4YC5KiOBotf9");

            const raw = JSON.stringify({
                "journey_type": "RoundTrip",
                "segment": [
                    {
                        "departure_airport_type": "CITY",
                        "departure_airport": departCode,
                        "arrival_airport_type": "AIRPORT",
                        "arrival_airport": arrivalCode,
                        "departure_date": departDate,
                        "arrival_date": returnDate
                    }
                ],
                "travelers_adult": 1,
                "travelers_child": 0,
                "travelers_child_age": 0,
                "travelers_infants": 0,
                "travelers_infants_age": [
                    ""
                ],
                "preferred_carrier": [
                    null
                ],
                "non_stop_flight": "any",
                "baggage_option": "any",
                "booking_class": "Economy",
                "supplier_uid": "all",
                "partner_id": "",
                "language": "en"
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            const response = await fetch("https://devapi.innotraveltech.com/flight/search", requestOptions);
            const result = await response.json();

            if (result.status === "success") {
                setSearchResult(result.data);
                console.log("Search Results:", result.data);
            } else {
                console.log("status:", result.status);
                console.log("reason:", result.reason);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchButtonClick = () => {
        if (departDate && returnDate && departCode && arrivalCode) {
            handleSearch();
        }
    };

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };
    if (loading) {
        return <LoadingComponent loading={ loading }></LoadingComponent>
    }
    return (
        <>
            <div className='relative w-[1000px] z-10 top-[-400px] left-[200px] bg-white px-4'>
                <div className='flex py-4'>
                    <PlaceSearchforDeparture setDepartCode={ setDepartCode } LabelName={ "From" } width={ "230" }></PlaceSearchforDeparture>
                    <span className='flex items-center justify-center w-[40px]'><GoArrowSwitch /></span>
                    <PlaceSearchforReturn setArrivalCode={ setArrivalCode } LabelName={ "To" } width={ "230" }></PlaceSearchforReturn>
                    <DatePickFromCalendarforDeparture setDepartDate={ setDepartDate } LabelName={ "Depart" } width={ "230" } />
                    <DatePickFromCalendarforReturn setReturnDate={ setReturnDate } LabelName={ "Return" } width={ "230" } />
                </div>
                <div className='flex justify-between items-center'>
                    <div>
                        <input type="checkbox" name="" id="" />
                        <label htmlFor="">Direct Flights only</label>
                    </div>
                    <PassengerCounter />
                    <AirplaneClassSelect />
                    <button className="bg-[#f30921] text-white px-10 py-2 rounded-full text-2xl" onClick={ handleSearchButtonClick }>Search</button>
                </div>
            </div>
            <div>
                { searchResult.length > 0 && (
                    <div>
                        <div className="flex justify-center relative top-[-350px] w-[1000px] left-[200px]">
                            <button className={ `tab-btn w-full ${selectedTab === 'Cheapest' ? 'active' : ''}` } onClick={ () => handleTabChange('Cheapest') }>Cheapest
                                <p><small>Less than ₨ 145353.00 • 08H, 00M, 00S</small></p>
                            </button>
                            <button className={ `tab-btn w-full ${selectedTab === 'Fastest' ? 'active' : ''}` } onClick={ () => handleTabChange('Fastest') }>Fastest
                                <p><small>Above ₨ 145353.00 • 06H, 45M, 00S</small></p>
                            </button>
                        </div>
                        <div>
                            { selectedTab === 'Cheapest' && (
                                <div>
                                    { searchResult
                                        .filter(flight => flight.total_price < 145353.00)
                                        .map((flight, index) => (
                                            <SearchResult key={ index } flight={ flight } selectedTab={ selectedTab } />
                                        )) }
                                </div>
                            ) }

                            { selectedTab === 'Fastest' && (
                                <div>
                                    { searchResult
                                        .filter(flight => flight.total_price >= 145353.00)
                                        .map((flight, index) => (
                                            <SearchResult key={ index } flight={ flight } selectedTab={ selectedTab } />
                                        )) }
                                </div>
                            ) }
                        </div>
                    </div>
                ) }
            </div>
        </>
    );
};

export default RoundTrip;