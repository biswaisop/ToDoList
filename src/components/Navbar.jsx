import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex bg-C2 justify-between text-white py-2'>
        <div className="logo">
            <span className='font-bold text-xl mx-9'>Mtask</span>
        </div>
      <ul className="flex gap-8 mx-9">
        <li className='hover:font-bold cursor-pointer transition-all'>Your Tasks</li>
        <li className='hover:font-bold cursor-pointer transition-all'>Home</li>
      </ul>
    </nav>
  )
}

export default Navbar
