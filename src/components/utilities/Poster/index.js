'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPlus, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import YouTube from 'react-youtube'
import Scrollbar from 'smooth-scrollbar'
import FilmDialog from '../FilmDialog'
let player = null;
const Poster = ({Id,Thumb,Title,Desc,Type,Video,Rating,Genres=[]}) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMute, setIsMute] = useState(true);
  const scrollThreshold = 200;
  const opts = {
    playerVars: {
      mute:1,
      autoplay: 1,
    },
  };
  const handleDialogClick = (event) => {
    event.preventDefault();
    setDialogIsOpen(true);
}
  const videoOnStart=(event)=>{
    event.target.hideVideoInfo();
    player = event.target;
    setTimeout(()=>{
      setIsVisible(false);
    },4000)
  }
  const videoStateChange = (event) => {
      var state = event.target.getPlayerState();
      if(state!=1){
          setIsVisible(true);
      }else{
          if(isVisible){
            setTimeout(()=>{
              setIsVisible(false);
            },4000)
          }
      }
  }
  const videoStart=(event)=>{
    setIsVisible(true);
    setTimeout(()=>{
      if(event){
        event.target.playVideo();
      }else if(player){
        player.playVideo();
      }
      setIsVisible(false);
    },5000)
  }
  const videoStop=()=>{
    if(player){
      setIsVisible(true);
      player.stopVideo();
    }
  }
  const toggleMute = (event)=>{
    if(player){
      event.preventDefault();
      if(player.isMuted()){
        setIsMute(false);
        player.unMute();
      }else{
        setIsMute(true);
        player.mute();
      }
    }
  }
  useEffect(() => {
    var scroll = Scrollbar.get(document.getElementById("main"));
    const handleScroll = () => {
      if(scroll.scrollTop >= scrollThreshold){
        if(player){
          if(player.getPlayerState()==1){
            videoStop()
          }
        }
      }else{
        if(player){
          var playerState = player.getPlayerState();
          if(playerState!=1){
            videoStart()
          }
        }
      }
      console.log(scroll.scrollTop,"scrolled")
      setIsScroll(scroll.scrollTop >= scrollThreshold);
    };
    var checkScroll = setInterval(() => {
      if(scroll==undefined){
        scroll = Scrollbar.get(document.getElementById("main"));
        handleScroll();
        scroll.addListener(handleScroll);
      }else{
        clearInterval(checkScroll);
      }
    }, 500);
    // return () => {
    //   if(scroll)scroll.removeListener(handleScroll)
    // };
  },[]);
  return (
    <div className='relative w-full md:h-[80vh] h-[60vh]'>
      
      <FilmDialog Id={Id} Title={Title} Desc={Desc} Poster={Thumb} Genres={Genres} IsAdult={false} Rating={Rating} Type={Type} Open={dialogIsOpen} SetOpen={setDialogIsOpen} />
        <Image src={`https://image.tmdb.org/t/p/original/${Thumb}`} alt='poster'width={3048} height={2024}  className={`w-full h-full object-cover ${!isVisible?"hidden":null}`}/>
        {Video?<YouTube videoId={`${Video}`} opts={opts} onPlay={videoOnStart} onStateChange={videoStateChange} onEnd={videoStart} className={`w-full h-full overflow-hidden transition-all duration-500 ${isVisible?"hidden":null}`} iframeClassName={`md:max-w-full md:h-auto w-auto aspect-video object-cover md:w-full h-[60vh]`}  />:null}
        <div className={`absolute z-10 ${isScroll?"bg-black":"bg-gradient-to-t from-black via-transparent to-black opacity-[0.9]"} w-full h-full top-0 transition-all duration-1000 ease-in`}></div>
        <div className='absolute top-0 z-20 h-full md:w-[50vw] w-full flex flex-col justify-end pb-20 pl-10 md:pr-36 pr-10 md:gap-4 gap-2'>
            <h1 className='text-white font-bold md:text-5xl text-2xl'>{Title}</h1>
            <p className='text-white font-light md:text-base text-xs'>{Desc}</p>
            <div className='flex gap-2'>
                <button className='bg-slate-100 px-4 py-1 rounded-sm'><FontAwesomeIcon icon={faPlay} /> Play</button>
                <button className='bg-[rgba(255,255,255,0.2)] text-white px-4 py-1 rounded-sm backdrop-blur-[2px]' onClick={handleDialogClick}>More Info</button>
                <button className={`hover:bg-[rgba(255,255,255,0.2)] bg-transparent text-white px-4 py-1 rounded-sm hover:backdrop-blur-[2px] ${isVisible?"hidden":null}`} onClick={toggleMute}>{isMute?<FontAwesomeIcon icon={faVolumeMute} />:<FontAwesomeIcon icon={faVolumeUp} />}</button>
            </div>
        </div>
        <span className='md:block hidden absolute bottom-20 text-white end-0 z-20 border-l-2 border-white bg-[rgba(255,255,255,0.1)] py-2 pl-2 pr-12 rounded-l-sm  backdrop-blur-[2px]'>{Type||"Movie"}</span>
    </div>
  )
}

export default Poster