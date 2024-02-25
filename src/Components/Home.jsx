import React from 'react';
import Menu from './Menu';
import { PiAirplaneTiltFill } from "react-icons/pi";
import { Outlet } from "react-router-dom";
const Home = () => {
    return (
        <div>
            <div className='banner_image relative'>

            </div>
            <div className='bg-white absolute top-[150px] left-[200px] w-[1000px] rounded shadow-xl p-10' >
                <p className="bg-white p-2 flex items-center">
                    <PiAirplaneTiltFill color="#f30921" size="1.5em" />flights</p>
                <Menu></Menu>

            </div>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Home;