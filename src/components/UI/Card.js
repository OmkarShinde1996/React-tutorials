import React from 'react'

const Card = (props) => {
  return (
    <div className='flex justify-center items-center p-5'>
      <div className={props.styled || `bg-gray-200 my-5 py-5 rounded-md px-5 flex justify-center items-center`}>{props.children}</div>
    </div>
  )
}

export default Card
