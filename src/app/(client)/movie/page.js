import FilmCarrousel from '@/components/utilities/FilmCarrousel'
import FilmCard from '@/components/utilities/FlimCard'
import Header from '@/components/utilities/Header'
import { fetchMovieGenres, fetchNowPlayingMovie, fetchPopulerMovie, fetchTopRatedMovie, fetchUpcomingMovie } from '@/lib/api'
import React from 'react'

const Movie = async () => {
  const suffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // Swap elements array[i] and array[j]
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const mappingGenres = (arrTarget, arrGenre) => {
    console.log(arrTarget, "Target")
    var data = arrTarget.results.map((item) => {
      var obj = item;
      var genre_names = [];
      item.genre_ids.forEach((x) => {
        var gen = arrGenre.genres.find(g => g.id == x);
        if (gen != undefined) {
          genre_names.push(gen.name);
        }
      });
      obj.genre_names = genre_names
      return obj;
    });
    return data;
  }
  var MGenres = await fetchMovieGenres();

  var popularMovie = await fetchPopulerMovie();
  popularMovie.results = suffleArray(mappingGenres(popularMovie, MGenres));
  var playingNowMovie = await fetchNowPlayingMovie();
  playingNowMovie.results = suffleArray(mappingGenres(playingNowMovie, MGenres));

  var topRatedMovie = await fetchTopRatedMovie();
  topRatedMovie.results = suffleArray(mappingGenres(topRatedMovie, MGenres));
  var upcomingMovie = await fetchUpcomingMovie();
  upcomingMovie.results = suffleArray(mappingGenres(upcomingMovie, MGenres));

  return (
    <div className='w-full h-full mt-14'>
      <section className='mt-5'>
        <Header Title={"Trending Now"} />
        <FilmCarrousel>
          {
            popularMovie.results.map((film, index) => {
              return <FilmCard key={index} Id={film.id} Poster={film.backdrop_path} Title={film.original_title} landscape={false} Desc={film.overview} Thumb={film.poster_path} Rating={film.vote_average} Genres={film.genre_names} IsAdult={film.adult} Type={film.media_type} />
            })
          }
        </FilmCarrousel>
      </section>
      <section className='mt-5'>
        <Header Title={"Now Playing"} />
        <FilmCarrousel>
          {
            playingNowMovie.results.map((film, index) => {
              return <FilmCard key={index} Id={film.id} Poster={film.backdrop_path} Title={film.original_title} landscape={false} Desc={film.overview} Thumb={film.poster_path} Rating={film.vote_average} Genres={film.genre_names} IsAdult={film.adult} Type={film.media_type} />
            })
          }
        </FilmCarrousel>
      </section>
      <section className='mt-5'>
        <Header Title={"Top Rated"} />
        <FilmCarrousel>
          {
            topRatedMovie.results.map((film, index) => {
              return <FilmCard key={index} Id={film.id} Poster={film.backdrop_path} Title={film.original_title} landscape={false} Desc={film.overview} Thumb={film.poster_path} Rating={film.vote_average} Genres={film.genre_names} IsAdult={film.adult} Type={film.media_type} />
            })
          }
        </FilmCarrousel>
      </section>
      <section className='mt-5'>
        <Header Title={"Upcoming"} />
        <FilmCarrousel>
          {
            upcomingMovie.results.map((film, index) => {
              return <FilmCard key={index} Id={film.id} Poster={film.backdrop_path} Title={film.original_title} landscape={false} Desc={film.overview} Thumb={film.poster_path} Rating={film.vote_average} Genres={film.genre_names} IsAdult={film.adult} Type={film.media_type} />
            })
          }
        </FilmCarrousel>
      </section>
    </div>
  )
}

export default Movie