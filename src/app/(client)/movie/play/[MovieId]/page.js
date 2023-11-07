"use client"
import FilmCarrousel from '@/components/utilities/FilmCarrousel';
import FilmCard from '@/components/utilities/FlimCard';
import Header from '@/components/utilities/Header';
import { fetchSimilarMovie, fetchVideoMovie } from '@/lib/api';
import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube';

const MoviePlay = ({ params }) => {
    const [ytId, setYtId] = useState("");
    const [semilar, setSemilar] = useState([]);
    const opts = {
        playerVars: {
            mute: 0,
            autoplay: 1,
        },
    };
    const videoOnStart = (event) => {
        event.target.hideVideoInfo();
    }
    const getVideo = async () => {
        var video = await fetchVideoMovie(params.MovieId);
        if (video && video.length != 0) {
            var videoIndex = Math.floor(Math.random() * ((video.length - 1) - 0 + 1)) + 0;
            setYtId(video[videoIndex].key);
        }
    }
    const getSimilar = async () => {
        var detail = await fetchSimilarMovie(params.MovieId);
        if (detail) {
            setSemilar(detail.results)
        }
    }
    useEffect(() => {
        getVideo();
        getSimilar();
    }, [])
    return (
        <div className='w-full h-full absolute z-[2000] overflow-auto'>
            {ytId != "" ? <YouTube videoId={`${ytId}`} opts={opts} className={`w-full overflow-hidden transition-all duration-500`} iframeClassName={`max-w-full w-full h-screen aspect-video`} onPlay={videoOnStart} /> : null}

            {semilar.length != 0 ?
            <div className='w-full mt-5'>
                <Header Title={"More like this"} />
                <FilmCarrousel>
                    {
                        semilar.map((film, index) => {
                            return <FilmCard key={index} Id={film.id} Poster={film.backdrop_path} Title={film.original_title || film.original_name} landscape={false} Desc={film.overview} Thumb={film.poster_path} Rating={film.vote_average} Genres={film.genre_names} IsAdult={film.adult} Type={"movie"} />
                        })
                    }
                </FilmCarrousel>
                <div className='h-40'></div>
            </div> : null}
        </div>
    )
}

export default MoviePlay