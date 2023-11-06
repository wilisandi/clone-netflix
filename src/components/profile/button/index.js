"using client"
import React from 'react'

const ButtonProfile = ({title,handlerClick}) => {
  return (
    <div className='border border-slate-600 px-4 py-2 rounded-sm hover:font-bold hover:text-white hover:bg-slate-900 transition-all hover:scale-105 cursor-pointer text-white'>{title}</div>
  )
}

export default ButtonProfile