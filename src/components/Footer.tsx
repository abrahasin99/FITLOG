import React from 'react';
import Image from "next/image";
import logo from "../../assets/logo.png";

const Footer = () => {
    return (
        <>
        <div className='flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:justify-between sm:p-10 sm:text-left border-t border-[#24272d]'>
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
