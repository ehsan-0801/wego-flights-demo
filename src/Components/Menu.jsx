import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
    const location = useLocation();

    const isActive = (pathname) => {
        return location.pathname === pathname ? 'tab tab-active [--tab-bg:#e7fddc] [--tab-text-color: #188920]' : 'tab';
    };
    return (
        <div className=' bg-white z-10'>
            <div role="tablist" className="tabs w-[400px]">
                <Link to="/" role="tab" className={ isActive('/') }>One-Way</Link>
                <Link to="/round_trip" role="tab" className={ isActive('/round_trip') }>Round-trip</Link>
                <Link to="/multi_city" role="tab" className={ isActive('/multi_city') }>Multi-city</Link>
            </div>
        </div>

    );
};

export default Menu;