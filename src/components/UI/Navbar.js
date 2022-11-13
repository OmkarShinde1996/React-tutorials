import React, { useContext } from 'react'
import Button from './Button'
import AuthContext from "../../store/auth-context"

const Navbar = () => {
    const ctx = useContext(AuthContext)
    return (
        <nav className='bg-gray-700 p-5'>
            <div className='flex justify-between items-center tablet:flex-row mobile:flex-col mobile:gap-3'>
                <h2 className='text-xl font-bold text-white'>A Typical Page</h2>
                {ctx.isLoggedIn &&
                    <ul className='flex justify-around items-center'>
                        <li className='px-3'>Home</li>
                        <li className='px-3'>About</li>
                        <li className='px-3'>
                            <Button onClick={ctx.onLogout}>Logout</Button>
                        </li>
                    </ul>
                }
            </div>
        </nav>
    )
}

export default Navbar
