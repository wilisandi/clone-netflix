'use client'
import React, { useEffect, useRef, useState } from 'react'
import { fetchPageSearch } from '@/lib/api';
import FilmCard from '@/components/utilities/FlimCard';
import Header from '@/components/utilities/Header';
import FilmCarrousel from '@/components/utilities/FilmCarrousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = ({ params }) => {
  const [page, setPage] = useState(1);
  const totalPage = useRef(1);
  const totalResults = useRef(0);
  const [isLoading, setIsloading] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const chunk = 7;
  const [arrMovie, setArrMovie] = useState([]);
  const fetchSearch = async () => {
    var Search = await fetchPageSearch(params.keyword, page);
    totalPage.current = Search.total_pages;
    totalResults.current = Search.total_results;
    if(totalPage.current==page){  
      setIsEnd(true);
    }
    if (Search.results.length != 0) {
      var tempArrMovie = arrMovie;
      while (Search.results.length != 0) {
        if (tempArrMovie.length != 0) {
          if (tempArrMovie[tempArrMovie.length - 1].length != chunk) {
            var chunked = Search.results.splice(0, (chunk - tempArrMovie[tempArrMovie.length - 1].length));
            tempArrMovie[tempArrMovie.length - 1].push(chunked)
          } else {
            var chunked = Search.results.splice(0, chunk);
            tempArrMovie.push(chunked)
          }
        } else {
          var chunked = Search.results.splice(0, chunk);
          tempArrMovie.push(chunked)
        }
      }
      console.log(tempArrMovie,"oke")
      setArrMovie(tempArrMovie);
      setIsloading(false);
    }
  }
  useEffect(() => {
    setIsloading(true);
    fetchSearch();
  }, [page]);
  useEffect(() => {
    const mainElement = document.querySelector('.main');
    let prevScrollPos = mainElement.scrollTop;
    const handleScroll = () => {
      const currentScrollPos = mainElement.scrollTop;
      if (currentScrollPos > prevScrollPos) {
        if (!isLoading) {
          if ((currentScrollPos + mainElement.clientHeight) >= (mainElement.scrollHeight - 3)) {
            if (page < totalPage.current) {
              setPage((current) => current + 1);
            }
          }
        }
      }
      prevScrollPos = currentScrollPos;
    };
    mainElement.addEventListener("scroll", handleScroll);
    return () => mainElement.removeEventListener("scroll", handleScroll);
  })

  return (
    <div className='w-full h-full mt-14'>
      {arrMovie.length == 0 && !isLoading ? <div className='w-full flex items-center justify-center text-white text-opacity-30 font-bold text-lg'><FontAwesomeIcon icon={faSearch} className='pr-3' /><h2>Not Found...</h2></div> : null}
      {
        arrMovie.length != 0 ?
          <section className='mt-5'>
            <Header Title={`Found ${totalResults.current} Movie...`} />
            {arrMovie.map((arrFilm, findex) => {
              return (
                <div className='mb-10' key={findex}>
                  <FilmCarrousel>
                    {
                      arrFilm.map((film, index) => {
                        return <FilmCard key={index} Id={film.id} Title={film.original_title || film.original_name} landscape={false} Desc={film.overview} Thumb={film.poster_path} Poster={film.backdrop_path} Rating={film.vote_average} Genres={film.genre_names} IsAdult={film.adult} Type={film.media_type} />
                      })
                    }
                  </FilmCarrousel>
                </div>
              )
            })}
          </section> : null
        // arrMovie.length != 0 ?
        //   <section className='mt-5 w-full'>
        //     <Header Title={`Found ${totalResults.current} Movie...`} />
        //     <div className='w-full flex flex-wrap mt-5 gap-4 px-4'>
        //       {arrMovie.map((film, findex) => {
        //         return <FilmCard key={findex} Id={film.id} Title={film.original_title || film.original_name} landscape={false} Desc={film.overview} Thumb={film.poster_path} Poster={film.backdrop_path} Rating={film.vote_average} Genres={film.genre_names} IsAdult={film.adult} Type={film.media_type} />
        //       })}
        //     </div>
        //   </section> : null
      }
      {/* {
        ArrTv.length != 0 ?
          <section className='mt-5'>
            <Header Title={"Tv"} />
            {
              ArrTv.map((arrFilm, findex) => {
                return (
                  <div className='mb-3' key={findex}>
                    <FilmCarrousel>
                      {
                        arrFilm.map((film, index) => {
                          return <FilmCard key={index} Title={film.original_name} landscape={false} Desc={film.overview} Thumb={film.poster_path} Rating={film.vote_average} Genres={film.genre_names} />
                        })
                      }
                    </FilmCarrousel>
                  </div>
                )
              })
            }

            <div className='h-40'></div>
          </section> : null
      } */}
      {isEnd?<h6 className='text-white font-bold text-center'>End...</h6>:null}
      <div className={`${!isLoading ? "hidden" : null} flex items-center justify-center w-full mt-4`}>
        <div className='my-loader'></div>
      </div>
      <div className='h-40'></div>
    </div>
  )
}

export default Search