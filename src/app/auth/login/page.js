"use client"
import Image from 'next/image'
import React from 'react'
import Poster from '@/img/poster.jpg'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Login = () => {
    const route = useRouter();
    const loginHandler = (event)=>{
        event.preventDefault();
        route.push("/auth/profile");
    }
    return (
        <div className="relative w-full">
            <div className="absolute -z-10 w-full h-full">
                <Image alt='...' src={Poster} width={4000} height={2125} quality={100} className="w-full h-full object-cover" />
                <div className='absolute top-0 bg-black/60 w-full h-full'></div>
            </div>
            <div className='w-full text-white'>
                <header className='md:py-6 md:px-10 py-3 px-4 md:bg-transparent bg-black'>
                    <h1 className='uppercase font-bold md:text-5xl text-2xl text-netflix tracking-tighter font-sans'>Navbar</h1>
                </header>
                <div className='md:bg-black/70 bg-black md:p-16 p-5 mx-auto md:w-[450px] md:rounded-md md:mb-24'>
                    <h1 className='font-semibold text-3xl'>Masuk</h1>
                    <div className='flex flex-col gap-4 my-10'>
                        <input className='w-full p-4 rounded-md focus:border-transparent focus:ring-0 focus:outline-none bg-zinc-800 text-white placeholder-zinc-600' placeholder='Email atau nomor telepon' />
                        <input className='w-full p-4 rounded-md focus:border-transparent focus:ring-0 focus:outline-none bg-zinc-800 text-white placeholder-zinc-600' placeholder='Sandi' />
                    </div>
                    <button className='w-full p-3 bg-netflix rounded-md' onClick={loginHandler}>Masuk</button>
                    <div className='flex justify-between mt-4'>
                        <div class="flex items-center">
                            <input type="checkbox" id='ingat-checkbox' value="" class="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600" />
                            <label for="ingat-checkbox" class="ml-2 text-xs font-normal text-white/70">Ingat saya</label>
                        </div>
                        <Link href={"/help"} className='font-light text-xs text-white/70 hover:underline' >Perlu bantuan?</Link>
                    </div>
                    <div className='my-14 flex flex-col gap-4'>
                        <h1 className='text-white/50 font-light'>Baru di Navbar? <Link href={"/auth/register"} className='hover:underline text-white font-normal'>Daftar sekarang</Link></h1>
                        <p className='text-xs text-white/70'>Halaman ini dilindungi oleh reCAPTCHA Google untuk memastikan kamu bukan bot. <button className='text-blue-600 hover:underline font-normal'>Pelajari selengkapnya.</button></p>
                    </div>
                </div>
                <footer className='w-full md:bg-black/70 bg-black py-8 md:px-0 px-5 md:border-t-0 border-t border-white/50'>
                    <div className='w-full flex justify-center mb-16'>
                        <div className='flex flex-col justify-start text-white/50 font-extralight gap-5'>
                            <h1>Ada pertanyaan? Hubungi <a href='tel:083284732684'>083284732684</a></h1>
                            <div className='grid grid-cols-4 gap-5 text-xs'>
                                <Link href={"/"} className='hover:underline'>Tanya Jawab</Link>
                                <Link href={"/"} className='hover:underline'>Pusat Bantuan</Link>
                                <Link href={"/"} className='hover:underline'>Ketentuan Pengguna</Link>
                                <Link href={"/"} className='hover:underline'>Privasi</Link>
                                <Link href={"/"} className='hover:underline'>Prevensi Cookie</Link>
                                <Link href={"/"} className='hover:underline px-5'>Informasi Perusahaan</Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Login