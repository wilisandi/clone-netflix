'use client'
import { fetchMovieDetail, fetchSimilarMovie, fetchSimilarTV, fetchTvDetail, fetchVideoMovie, fetchVideoTv } from '@/lib/api'
import { faPlay, faPlus, faThumbsDown, faThumbsUp, faTimes, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import React, { Fragment, useRef, useState } from 'react'
import YouTube from 'react-youtube'
import FilmCarrousel from '../FilmCarrousel'
import FilmCard from '../FlimCard'
import Header from '../Header'
import { useRouter } from 'next/navigation'

const FilmDialog = ({ Open, SetOpen, Id, Title, Desc, Poster, Rating, Genres = [], IsAdult = false, Type = "movie" }) => {
    const Persen = Math.round(((Rating || 0) / 10) * 100);
    const [ytId, setYtId] = useState("");
    const [isMute, setIsMute] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [releaseDate, setReleaseDate] = useState(null);
    const [productionCompanies, setProductionCompanies] = useState("");
    const [numberSeason, setNumberSeason] = useState(0);
    const [semilar, setSemilar] = useState([]);
    const UrlPlay = useRef("/movie/play");
    const router = useRouter();
    let player = useRef(null);
    var Warna = 'text-green-500';
    if (Persen >= 80) {
        Warna = 'text-green-500'; // Gunakan warna hijau jika lebih besar atau sama dengan 80
    } else if (Persen >= 60) {
        Warna = 'text-yellow-500'; // Gunakan warna kuning jika lebih besar atau sama dengan 60
    } else {
        Warna = 'text-red-500'; // Gunakan warna merah jika lebih kecil dari 60
    }
    const opts = {
        playerVars: {
            mute: 0,
            autoplay: 1,
        },
    };

    const videoOnStart = (event) => {
        event.target.hideVideoInfo();
        player.current = event.target;
    }
    const videoStateChange = (event) => {
        var state = event.target.getPlayerState();
        if (state != 1) {
            setIsVisible(true);
        } else {
            if (isVisible) {
                setIsVisible(false);
            }
        }
    }
    const videoStart = (event) => {
        setTimeout(() => {
            if (event) {
                event.target.playVideo();
            } else if (player.current) {
                player.current.playVideo();
            }
        }, 5000)
    }
    const videoStop = () => {
        if (player.current) {
            setIsVisible(true);
            player.current.stopVideo();
        }
    }
    const toggleMute = (event) => {
        if (player.current) {
            event.preventDefault();
            if (player.current.isMuted()) {
                setIsMute(false);
                player.current.unMute();
            } else {
                setIsMute(true);
                player.current.mute();
            }
        }
    }
    function closeModal() {
        SetOpen(false)
    }

    const getVideo = async () => {
        if (Type == "movie") {
            var video = await fetchVideoMovie(Id);
            console.log(video, "movie")
            if (video && video.length != 0) {
                UrlPlay.current = `/movie/play/${Id}/`;
                var videoIndex = Math.floor(Math.random() * ((video.length - 1) - 0 + 1)) + 0;
                setYtId(video[videoIndex].key);
            }
        } else {
            var video = await fetchVideoTv(Id);
            console.log(video, "tv")
            if (video && video.length != 0) {
                UrlPlay.current = `/tv/play/${Id}/`;
                var videoIndex = Math.floor(Math.random() * ((video.length - 1) - 0 + 1)) + 0;
                setYtId(video[videoIndex].key);
            }
        }
    }

    const handlerPlay=(event)=>{
        event.preventDefault();
        router.push(UrlPlay.current);
    }

    const getDetail = async () => {
        if (Type == "movie") {
            var detail = await fetchMovieDetail(Id);
            console.log(detail, "detailmovie")
            if (detail) {
                setReleaseDate(new Date(detail.release_date).getFullYear());
                if (detail.production_companies) {
                    setProductionCompanies(detail.production_companies.map(x => x.name).join(", "))
                }
            }
        } else {
            var detail = await fetchTvDetail(Id);
            console.log(detail, "detailtv")
            if (detail) {
                setNumberSeason(detail.number_of_seasons)
            }
        }
    }

    const getSimilar = async () => {
        if (Type == "movie") {
            var detail = await fetchSimilarMovie(Id);
            console.log(detail, "semilarmovie")
            if (detail) {
                setSemilar(detail.results)
            }
        } else {
            var detail = await fetchSimilarTV(Id);
            console.log(detail, "semilartv")
            if (detail) {
                setSemilar(detail.results)
            }
        }
    }

    return (
        <Transition show={Open} as={Fragment} beforeEnter={() => { getVideo(); getDetail(); getSimilar(); }}>
            <Dialog as="div" className="relative z-[400]" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60 blur-md" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-start justify-center md:py-10 md:px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full md:max-w-[750px] lg:max-w-[1000px] md:h-auto min-h-screen max-w-none transform overflow-x-hidden shadow-black rounded-sm bg-black text-left align-middle shadow-xl transition-all md:pb-10 pb-5">
                                <Dialog.Title as="div" className="relative w-full">
                                    <Image src={`https://image.tmdb.org/t/p/original/${Poster}`} alt='poster' width={3048} height={2024} className={`w-full h-full aspect-video object-cover ${!isVisible ? "hidden" : null}`} />
                                    {ytId != "" ? <YouTube videoId={`${ytId}`} opts={opts} onPlay={videoOnStart} onEnd={videoStart} onStateChange={videoStateChange} className={`w-full overflow-hidden transition-all duration-500 ${isVisible ? "hidden" : null}`} iframeClassName={`md:max-w-full h-auto w-auto aspect-video object-cover w-full`} /> : null}
                                    <div className={`absolute z-10 bg-gradient-to-t from-black via-transparent to-transparent w-full h-full top-0 transition-all duration-1000 ease-in`}></div>
                                    <button className='absolute bg-black text-white text-sm rounded-full top-0 end-0 h-6 w-6 m-3 z-20' onClick={closeModal}><FontAwesomeIcon icon={faTimes} /></button>
                                    <div className='absolute z-20 bottom-0 pl-8 pr-3 pb-5 w-full flex flex-col md:gap-5 gap-2'>
                                        <h1 className='text-white font-bold md:text-4xl'>{Title}</h1>
                                        <div className='w-full flex  items-center justify-between'>
                                            <div className='flex gap-2 text-white'>
                                                <button className='w-15 h-10 px-4 rounded-sm bg-white text-black border border-white focus:border-black focus:outline focus:outline-1 focus:outline-white disabled:opacity-50' disabled={ytId == "" ?true:false} onClick={handlerPlay}><FontAwesomeIcon icon={faPlay} /> Play</button>
                                                <button className='rounded-full w-10 h-10 outline outline-1 outline-white'><FontAwesomeIcon icon={faPlus} className='text-sm' /></button>
                                                <button className='rounded-full w-10 h-10 outline outline-1 outline-white'><FontAwesomeIcon icon={faThumbsDown} /></button>
                                                <button className='rounded-full w-10 h-10 outline outline-1 outline-white'><FontAwesomeIcon icon={faThumbsUp} /></button>
                                            </div>
                                            <button className={`w-10 h-10 rounded-full bg-transparent border border-white text-white border-opacity-50 text-opacity-50 ${isVisible ? "hidden" : null}`} onClick={toggleMute}>{isMute ? <FontAwesomeIcon icon={faVolumeMute} /> : <FontAwesomeIcon icon={faVolumeUp} />}</button>
                                        </div>
                                    </div>
                                </Dialog.Title>
                                <div className="mt-2 pl-8 grid grid-cols-12 gap-2">
                                    <div className='col-span-8'>
                                        <div className='flex w-full gap-2'>
                                            {Rating == 0 ? <h6 className={`text-white/25 text-sm font-bold`}>{`0 Vote`}</h6> : <h6 className={`${Warna} text-sm font-bold`}>{`${Persen}% Match`}</h6>}
                                            {releaseDate ? <h6 className={`text-white text-sm`}>{releaseDate}</h6> : null}
                                            {IsAdult ? <div className=' text-sm border px-1 rounded-sm border-gray-700 text-white'>18+</div> : null}
                                            {numberSeason != 0 ? <h6 className={`text-white text-sm`}>{`${numberSeason} Seasons`}</h6> : null}
                                        </div>
                                        <p className="text-sm text-white">
                                            {Desc}
                                        </p>
                                    </div>
                                    <div className='col-span-4'>
                                        {Genres.length != 0 ? <p className='text-white text-sm'>
                                            <span className='text-white/25 font-semibold'>Genres: </span>{Genres.toString().replace(/,/g, ", ")}
                                        </p> : null}
                                        {productionCompanies != "" ? <p className='text-white text-sm'>
                                            <span className='text-white/25 font-semibold'>Production: </span>{productionCompanies}
                                        </p> : null}
                                    </div>
                                </div>
                                {semilar.length != 0 ?
                                    <div className='w-full mt-5'>
                                        <Header Title={"More like this"} />
                                        <FilmCarrousel>
                                            {
                                                semilar.map((film, index) => {
                                                    return <FilmCard key={index} Id={film.id} Poster={film.backdrop_path} Title={film.original_title || film.original_name} landscape={false} Desc={film.overview} Thumb={film.poster_path} Rating={film.vote_average} Genres={film.genre_names} IsAdult={film.adult} Type={Type} />
                                                })
                                            }
                                        </FilmCarrousel>
                                        <div className='h-40'></div>
                                    </div> : null}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default FilmDialog