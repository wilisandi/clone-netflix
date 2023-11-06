'use client'
import { faChevronDown, faPlay, faPlus, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React, { useState } from 'react'
import FilmDialog from '../FilmDialog'

const FilmCard = ({ landscape = true, Key, Id, Title, Desc, Thumb, Poster, Rating, Genres = [], IsAdult = false, Type = "movie" }) => {
    const Persen = Math.round(((Rating || 0) / 10) * 100);
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    var Warna = 'text-green-500';
    if (Persen >= 80) {
        Warna = 'text-green-500'; // Gunakan warna hijau jika lebih besar atau sama dengan 80
    } else if (Persen >= 60) {
        Warna = 'text-yellow-500'; // Gunakan warna kuning jika lebih besar atau sama dengan 60
    } else {
        Warna = 'text-red-500'; // Gunakan warna merah jika lebih kecil dari 60
    }
    const handleDialogClick = (event) => {
        event.preventDefault();
        setDialogIsOpen(true);
    }

    if (landscape) {
        return (
            <div className='group' key={Key}>
                <FilmDialog Id={Id} Title={Title} Desc={Desc} Poster={Poster} Genres={Genres} IsAdult={IsAdult} Rating={Rating} Type={Type} Open={dialogIsOpen} SetOpen={setDialogIsOpen} />
                <div className='opacity-0 md:group-hover:block md:group-hover:w-[270px] h-[150px] w-[250px] transition-all duration-300'></div>
                <div className='cursor-pointer md:group-hover:absolute md:group-hover:-translate-y-[25%] z-[100] -mt-[150px]'>
                    <div className='relative'>
                        <Image height={424} width={534} alt={"..."} src={`https://image.tmdb.org/t/p/original/${Thumb}`} className='max-w-[250px] md:group-hover:max-w-[270px] md:group-hover:h-auto transition-all h-[150px] object-cover object-center duration-300' loading='lazy' />
                        <div className='grid gap-2 text-white absolute bottom-0 w-full px-3 py-6 bg-gradient-to-t from-black to-transparent opacity-0 md:group-hover:opacity-100'>
                            <h6>{Title}</h6>
                            <div className='grid grid-cols-6 gap-2'>
                                <button className='rounded-full aspect-square bg-white text-black border border-white focus:border-black focus:outline focus:outline-1 focus:outline-white'><FontAwesomeIcon icon={faPlay} /></button>
                                <button className='rounded-full aspect-square outline outline-1 outline-white'><FontAwesomeIcon icon={faPlus} className='text-sm' /></button>
                                <button className='rounded-full aspect-square outline outline-1 outline-white'><FontAwesomeIcon icon={faThumbsDown} /></button>
                                <button className='rounded-full aspect-square outline outline-1 outline-white'><FontAwesomeIcon icon={faThumbsUp} /></button>
                                <div></div>
                                <button className='rounded-full aspect-square outline outline-1 outline-white' onClick={handleDialogClick}><FontAwesomeIcon icon={faChevronDown} /></button>
                            </div>
                            <div className='flex gap-2'>
                                <h6 className={`${Warna} text-xs font-bold`}>{`${Persen}% Match`}</h6>
                                {IsAdult ? <div className=' text-xs border px-1 rounded-sm border-gray-700 text-white'>18+</div> : null}
                            </div>
                            <ul className='list-disc list-inside flex text-xs marker:-mr-10 gap-1 [&>*:first-child]:list-none px-1'>
                                {Genres?.slice(0, 3).map((genre, index) => {
                                    return (<li key={index}><span className='relative -left-1'>{genre}</span></li>)
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className='group'>
                <FilmDialog Id={Id} Title={Title} Desc={Desc} Poster={Poster} Genres={Genres} IsAdult={IsAdult} Rating={Rating} Type={Type} Open={dialogIsOpen} SetOpen={setDialogIsOpen} />
                <div className='opacity-0 md:group-hover:delay-500 md:group-hover:static md:md:group-hover:w-[250px] md:group-hover:w-[120px] md:h-[300px] h-[200px] md:w-[200px] w-[100px] ease-linear duration-300 transition-all'></div>
                <div className='cursor-pointer md:group-hover:delay-500 md:group-hover:absolute z-[100] md:md:group-hover:-translate-y-[10%] md:group-hover:-translate-y-[10%] md:-mt-[300px] -mt-[200px]' onClick={handleDialogClick}>
                    <div className='relative'>
                        <Image height={534} width={424} alt={"..."} src={`https://image.tmdb.org/t/p/original${Thumb}`} className='md:max-w-[200px] max-w-[100px] md:group-hover:delay-500 md:md:group-hover:max-w-[250px] md:group-hover:max-w-[120px] md:group-hover:max-h-none md:max-h-[300px] max-h-[200px] object-cover object-center ease-linear duration-300 bg-white/20 transition-all h-auto' loading='lazy' />
                        <div className='grid gap-2 text-white absolute bottom-0 w-full px-3 py-6 bg-gradient-to-t from-black to-transparent opacity-0 md:group-hover:delay-500 md:group-hover:opacity-100'>
                            <h6>{Title}</h6>
                            <div className='grid grid-cols-6 gap-2'>
                                <button className='rounded-full aspect-square bg-white text-black border border-white focus:border-black focus:outline focus:outline-1 focus:outline-white'><FontAwesomeIcon icon={faPlay} /></button>
                                <button className='rounded-full aspect-square outline outline-1 outline-white'><FontAwesomeIcon icon={faPlus} className='text-sm' /></button>
                                <button className='rounded-full aspect-square outline outline-1 outline-white'><FontAwesomeIcon icon={faThumbsDown} /></button>
                                <button className='rounded-full aspect-square outline outline-1 outline-white'><FontAwesomeIcon icon={faThumbsUp} /></button>
                                <div></div>
                                <button className='rounded-full aspect-square outline outline-1 outline-white' onClick={handleDialogClick}><FontAwesomeIcon icon={faChevronDown} /></button>
                            </div>
                            <div className='flex gap-2'>
                                <h6 className={`${Warna} text-xs font-bold`}>{`${Persen}% Match`}</h6>
                                {IsAdult ? <div className=' text-xs border px-1 rounded-sm border-gray-700 text-white'>18+</div> : null}
                            </div>
                            <ul className='list-disc list-inside flex text-xs marker:-mr-10 gap-1 [&>*:first-child]:list-none px-1'>
                                {Genres?.slice(0, 3).map((genre, index) => {
                                    return (<li key={index}><span className='relative -left-1'>{genre}</span></li>)
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FilmCard