"use client"
import Image from 'next/image'
import React from 'react'
import Poster from '@/img/poster.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'

const Register = () => {
    const router = useRouter();
    const handlerLogin = (event)=>{
        event.preventDefault();
        router.back("/auth/login");
    }
    return (
        <div className='relative w-screen h-screen'>
            <div className='absolute w-full h-full -z-10'>
                <Image src={Poster} alt='...' width={4000} height={2125} className='h-full w-full object-cover' />
                <div className='absolute top-0 bg-gradient-to-t to-black from-black via-black/30 w-full h-full'></div>
            </div>
            <div className='md:px-40 px-4 text-white h-full'>
                <header className='md:py-6 md:px-10 py-3 px-4 md:bg-transparent bg-black flex justify-between items-center'>
                    <h1 className='uppercase font-bold md:text-5xl text-2xl text-netflix tracking-tighter font-sans'>Navbar</h1>
                    <button className='font-semibold bg-netflix px-4 py-1 rounded-sm h-9' onClick={handlerLogin}>Masuk</button>
                </header>
                <section className='flex flex-col justify-center items-center h-full gap-5'>
                    <h1 className='md:text-xl text-xl md:font-semibold w-full text-center'>Siap menonton? Masukkan email untuk membuat atau memulai lagi keanggotaanmu.</h1>
                    <div className='flex md:flex-row flex-col gap-2 items-center'>
                        <input className='border border-white/50 bg-zinc-900/70 focus:outline-none rounded-md py-3 px-6 w-96 text-white placeholder-zinc-600' placeholder='Alamat Email' />
                        <button className='py-3 px-8 bg-netflix rounded-md text-2xl font-bold md:w-auto w-40'>Mulai <FontAwesomeIcon icon={faChevronRight} /></button>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Register