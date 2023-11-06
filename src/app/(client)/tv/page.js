import FilmCarrousel from '@/components/utilities/FilmCarrousel';
import FilmCard from '@/components/utilities/FlimCard';
import Header from '@/components/utilities/Header';
import { fetchAiringTodayTV, fetchOnAirTV, fetchPopulerTV, fetchTVGenres, fetchTopRatedTV } from '@/lib/api';
import React from 'react'

const Tv = async () => {

    const suffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          // Swap elements array[i] and array[j]
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

    const mappingGenres = (arrTarget, arrGenre) => {
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

    var TVGenres = await fetchTVGenres();

    var populerTv = await fetchPopulerTV();
    populerTv.results =suffleArray(mappingGenres(populerTv, TVGenres));
    var onAirTv = await fetchOnAirTV();
    onAirTv.results = suffleArray(mappingGenres(onAirTv, TVGenres));
    var topRatedTv = await fetchTopRatedTV();
    topRatedTv.results = suffleArray(mappingGenres(topRatedTv, TVGenres));
    var AiringTv = await fetchAiringTodayTV();
    AiringTv.results = suffleArray(mappingGenres(AiringTv, TVGenres));
    return (
        <div className='w-full h-full mt-14'>
            <section className='mt-5'>
                <Header Title={"Populer TV - Series"} />
                <FilmCarrousel>
                    {
                        populerTv.results.map((film, index) => {
                            return <FilmCard key={index} Id={film.id} Poster={film.backdrop_path} Title={film.original_name} landscape={false} Desc={film.overview} Thumb={film.poster_path} Rating={film.vote_average} Genres={film.genre_names} IsAdult={film.adult} Type='tv' />
                        })
                    }
                </FilmCarrousel>
            </section>
            <section className='mt-5'>
                <Header Title={"On Air"} />
                <FilmCarrousel>
                    {
                        onAirTv.results.map((film, index) => {
                            return <FilmCard key={index} Id={film.id} Poster={film.backdrop_path} Title={film.original_name} landscape={false} Desc={film.overview} Thumb={film.poster_path} Rating={film.vote_average} Genres={film.genre_names} IsAdult={film.adult} Type='tv' />
                        })
                    }
                </FilmCarrousel>
            </section>
            <section className='mt-5'>
                <Header Title={"Airing Today"} />
                <FilmCarrousel>
                    {
                        AiringTv.results.map((film, index) => {
                            return <FilmCard key={index} Id={film.id} Poster={film.backdrop_path} Title={film.original_name} landscape={false} Desc={film.overview} Thumb={film.poster_path} Rating={film.vote_average} Genres={film.genre_names} IsAdult={film.adult} Type='tv' />
                        })
                    }
                </FilmCarrousel>
            </section>
            <section className='mt-5'>
                <Header Title={"Top Rated"} />
                <FilmCarrousel>
                    {
                        topRatedTv.results.map((film, index) => {
                            return <FilmCard key={index} Id={film.id} Poster={film.backdrop_path} Title={film.original_name} landscape={false} Desc={film.overview} Thumb={film.poster_path} Rating={film.vote_average} Genres={film.genre_names} IsAdult={film.adult} Type='tv' />
                        })
                    }
                </FilmCarrousel>
            </section>
            <div className='h-40'></div>
        </div>
    )
}

export default Tv