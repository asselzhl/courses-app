import React from 'react'

const Button = ({text}) => {
  return (
    <div>
        <button className='uppercase bg-[#007298] text-white rounded py-[13px] px-9'>{text}</button>
    </div>
  )
}

export default Button