import React from 'react'

const Button = (props) => {
  return (
    <>
      <button disabled={props.disabled} type={props.type} onClick={props.onClick} className={`px-4 py-2 outline-none text-sm font-bold ${props.disabled === true ? 'bg-gray-600' : 'bg-orange-400'} rounded-full text-white`}>{props.children}</button>
    </>
  )
}

export default Button
