import FilmCarrousel from '@/components/utilities/FilmCarrousel';
import FilmCard from '@/components/utilities/FlimCard';
import Header from '@/components/utilities/Header';
import Navbar from '@/components/utilities/Navbar'
import Poster from '@/components/utilities/Poster'
import { fetchMovieGenres, fetchPopulerMovie, fetchPopulerTV, fetchTVGenres, fetchTrending, fetchUpcomingMovie, fetchVideoMovie } from '@/lib/api';
import Image from 'next/image';
import React from 'react'

const Beranda = async () => {
  var MGenres = await fetchMovieGenres();

  var TVGenres = await fetchTVGenres();
  const mappingGenres =(arrTarget,arrGenre)=>{
    var data = arrTarget.results.map((item)=>{
      var obj = item;
      var genre_names = [];
      item.genre_ids.forEach((x)=>{
        var gen = arrGenre.genres.find(g=>g.id==x);
        if(gen!=undefined){
          genre_names.push(gen.name);
        }
      });
      obj.genre_names = genre_names
      return obj;
    });
    return data;
  }
  var popular = await fetchPopulerMovie();
  popular.results = mappingGenres(popular,MGenres);

  var trending = await fetchTrending();
  trending.results = trending.results.map((item)=>{
    var obj = item;
    var genre_names = [];
    item.genre_ids.forEach((x)=>{
      if(item.media_type=="movie"){
        var gen = MGenres.genres.find(g=>g.id==x);
        if(gen!=undefined){
          genre_names.push(gen.name);
        }
      }else{
        var gen = TVGenres.genres.find(g=>g.id==x);
        if(gen!=undefined){
          genre_names.push(gen.name);
        }
      }
    });
    obj.genre_names = genre_names
    return obj;
  });

  var upcomingMovie = await fetchUpcomingMovie();
  upcomingMovie.results = mappingGenres(upcomingMovie,MGenres);

  var trendingSeries = await fetchPopulerTV();
  trendingSeries.results = mappingGenres(trendingSeries,TVGenres);

  var poster = popular.results[Math.floor(Math.random()* ((popular.results.length-1) - 0 + 1)) + 0];
  var ytId = null;
  if(poster){
    var posterVideo = await fetchVideoMovie(poster.id);
    if(posterVideo&&posterVideo.length!=0){
      var videoIndex =  Math.floor(Math.random()* ((posterVideo.length-1) - 0 + 1)) + 0;
      ytId = posterVideo[videoIndex].key;
    }
  }

  return (
    <div>
      <section>
        <Poster Id={poster.id} Thumb={poster.backdrop_path} Title={poster.original_title} Desc={poster.overview} Type={poster.media_type} Genres={poster.genre_names} Rating={poster.vote_average} Video={ytId} />
      </section>
      <section className='-mt-10 relative z-50'>
        <Header Title={"Trending Now"} />
        <FilmCarrousel>
          {
            trending.results.map((film, index) => {
              return <FilmCard key={index} Id={film.id} Poster={film.backdrop_path} Title={film.original_title||film.original_name} landscape={false} Desc={film.overview} Thumb={film.poster_path} Rating={film.vote_average} Genres={film.genre_names} IsAdult={film.adult} Type={film.media_type} />
            })
          }
        </FilmCarrousel>
      </section>
      <section className='mt-5'>
        <Header Title={"Populer Movie"} />
        <FilmCarrousel>
          {
            popular.results.map((film, index) => {
              return <FilmCard key={index} Id={film.id} Poster={film.backdrop_path} Title={film.original_title} landscape={false} Desc={film.overview} Thumb={film.poster_path} Rating={film.vote_average} Genres={film.genre_names} IsAdult={film.adult} />
            })
          }
        </FilmCarrousel>
      </section>
      <section className='mt-5'>
        <Header Title={"Populer TV - Series"} />
        <FilmCarrousel>
          {
            trendingSeries.results.map((film, index) => {
              return <FilmCard key={index} Id={film.id} Poster={film.backdrop_path} Title={film.original_name} landscape={false} Desc={film.overview} Thumb={film.poster_path} Rating={film.vote_average} Genres={film.genre_names} IsAdult={film.adult} Type='tv' />
            })
          }
        </FilmCarrousel>
      </section>
      <section className='mt-5'>
        <Header Title={"Upcoming Movie"} />
        <FilmCarrousel>
          {
            upcomingMovie.results.map((film, index) => {
              return <FilmCard key={index} Id={film.id} Poster={film.backdrop_path} Title={film.original_title} landscape={false} Desc={film.overview} Thumb={film.poster_path} Rating={film.vote_average} Genres={film.genre_names} IsAdult={film.adult} />
            })
          }
        </FilmCarrousel>
      </section>
      <div className='h-40'></div>
    </div>
  )
}

export default Beranda