import React from 'react';
import Image from "next/image";
import logo from "../../assets/logo.png";

const Footer = () => {
    return (
        <div className='flex px-5 justify-between items-center py-5'>
            <div className='flex'>
                <Image src={logo} alt='logo'/>
                <h1>FITLOG</h1>
            </div>
            <p className='text-[#6B7280] text-sm'>&copy; 2026 Fitlog &mdash; Workout Library. Train hard, log honest.</p>
        </div>
    );
};

export default Footer;