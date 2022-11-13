import React, { useState } from 'react'
import Button from './Button'

const Navbar = (props) => {

    return (
        <nav className='bg-gray-700 p-5'>
            <div className='flex justify-between items-center tablet:flex-row mobile:flex-col mobile:gap-3'>
                <h2 className='text-xl font-bold text-white'>A Typical Page</h2>
                {props.loginStatus &&
                    <ul className='flex justify-around items-center'>
                        <li className='px-3'>Home</li>
                        <li className='px-3'>About</li>
                        <li className='px-3'>
                            <Button onClick={props.onLogout}>Logout</Button>
                        </li>
                    </ul>
                }
            </div>
        </nav>
    )
}

export default Navbar
