import React from 'react';

const SearchResult = ({ flight, selectedTab }) => {
    const formatDateTime = (dateTimeString) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
        return new Date(dateTimeString).toLocaleString('en-US', options);
    };

    const formatDuration = (duration) => {
        const durationWithoutPrefix = duration.substring(2);
        const hours = durationWithoutPrefix.includes('H') ? durationWithoutPrefix.split('H')[0] : '0';
        const minutes = durationWithoutPrefix.includes('M') ? durationWithoutPrefix.split('H')[1].split('M')[0] : '0';
        return `${hours}H ${minutes}M`;
    };
    const calculateInterval = (flightGroup) => {
        if (flightGroup.no_of_stops === 1) {
            const firstArrival = new Date(flightGroup.routes[0].arrival_time);
            const secondDeparture = new Date(flightGroup.routes[1].departure_time);
            const intervalMinutes = Math.abs(secondDeparture - firstArrival) / (1000 * 60); // difference in minutes
            return `${Math.floor(intervalMinutes / 60)}H ${intervalMinutes % 60}M`;
        }
        return '';
    };


    return (
        <>
            { flight && flight.flight_group && (
                <div className="border border-red-300 hover:border-red-500 rounded-lg p-4 mb-4 w-[1000px] relative left-[200px] top-[-300px]">
                    <div className="overflow-x-auto relative w-full">
                        <div className="grid grid-cols-6">
                            <div className="px-4 py-2 text-left">Airline</div>
                            <div className="px-4 py-2 text-left">Departure</div>
                            <div className="px-4 py-2 text-left">Arrival</div>
                            <div className="px-4 py-2 text-left">Duration</div>
                            <div className="px-4 py-2 text-left">Baggage</div>
                            <div className="px-4 py-2 text-left">Total Price</div>
                        </div>
                        { flight.flight_group.map((flightGroup, index) => (
                            <React.Fragment key={ index }>
                                <div className="grid grid-cols-6 my-4">
                                    <div className="px-4 py-2">{ flightGroup.routes[0].operating.carrier_name }</div>
                                    <div className="px-4 py-2">
                                        <div className="text-2xl font-semibold">{ flightGroup.routes[0].origin }</div>
                                        <div>{ formatDateTime(flightGroup.routes[0].departure_time) }</div>
                                    </div>
                                    <div className="px-4 py-2">
                                        <div className="text-2xl font-semibold">{ flightGroup.routes[0].destination }</div>
                                        <div>{ formatDateTime(flightGroup.routes[0].arrival_time) }</div>
                                    </div>
                                    <div className="px-4 py-2">{ formatDuration(flightGroup.flight_time) }</div>
                                    <div className="px-4 py-2">
                                        { flightGroup.routes[0].baggages.carry_on.ADT.title }&nbsp; for &nbsp;
                                        { flightGroup.routes[0].baggages.carry_on.ADT.passenger_type }
                                    </div>
                                    <div className="px-4 py-2">{ flight.total_price }</div>
                                </div>
                                { flightGroup.no_of_stops === 1 && (
                                    <div className="grid grid-cols-6 my-4">
                                        <div className="px-4 py-2"></div>
                                        <div className="bg-red-200 py-1 w-[600px] font-semibold">
                                            <div className="text-xs text-center">Transit time { calculateInterval(flightGroup) }</div>
                                        </div>
                                        <div className="px-4 py-2"></div>
                                        <div className="px-4 py-2"></div>
                                        <div className="px-4 py-2"></div>
                                        <div className="px-4 py-2"></div>
                                    </div>
                                ) }
                                { flightGroup.no_of_stops > 0 &&
                                    flightGroup.routes.slice(1).map((route, idx) => (
                                        <div className="grid grid-cols-6 my-4" key={ index + idx + 1 }>
                                            <div className="px-4 py-2">{ route.operating.carrier_name }</div>
                                            <div className="px-4 py-2">
                                                <div className="text-2xl font-semibold">{ route.origin }</div>
                                                <div>{ formatDateTime(route.departure_time) }</div>
                                            </div>
                                            <div className="px-4 py-2">
                                                <div className="text-2xl font-semibold">{ route.destination }</div>
                                                <div>{ formatDateTime(route.arrival_time) }</div>
                                            </div>
                                            <div className="px-4 py-2">{ formatDuration(route.flight_time) }</div>
                                            <div className="px-4 py-2">
                                                { route.baggages.carry_on.ADT.title }&nbsp; for &nbsp;
                                                { route.baggages.carry_on.ADT.passenger_type }
                                            </div>
                                            <div className="px-4 py-2">
                                                <button className='btn border-[#f30921] bg-transparent text-[#f30921]'>Select Flight</button>
                                            </div>
                                        </div>
                                    )) }
                            </React.Fragment>
                        )) }
                    </div>
                </div>
            ) }
        </>
    );
};

export default SearchResult;
