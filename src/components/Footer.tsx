import React from 'react';
import Image from "next/image";
import logo from "../../assets/logo.png";

const Footer = () => {
    return (
        <>
        <hr className="border-t border-gray-300 my-4" />
        <div className='flex justify-between items-center p-10'>
            <div className='flex'>
                <Image src={logo} alt='logo'/>
                <h1 className='font-bold'>FITLOG</h1>
            </div>
            <p className='text-[#6B7280] text-sm'>&copy; 2026 Fitlog &mdash; Workout Library. Train hard, log honest.</p>
        </div>
        </>
    );
};

export default Footer;