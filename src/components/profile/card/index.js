"use client"
import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'

const ProfileCard = ({ Id, Title, Src, IsPrivate = false }) => {
    const route = useRouter();
    const handlerClick = (event) => {
        event.preventDefault();
        route.push('/beranda');
    }
    return (
        <div className='hover:scale-105 transition-all cursor-pointer' onClick={handlerClick}>
            <div className='aspect-square rounded-xl'>
                <Image width={300} alt={`Img ${Title}`} height={300} src={Src} className='h-full w-full object-cover rounded-xl' />
            </div>
            <h6 className='text-center font-semibold text-white'>{Title}</h6>
            {IsPrivate ? (<p className='text-center md:m-5 m-1'><FontAwesomeIcon icon={faLock} fixedWidth className='text-slate-600' /></p>) : (<></>)}
        </div>
    )
}

export default ProfileCard