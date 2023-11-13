
//Seatch

export const fetchPageSearch = async (query, page = 1, adult = true) => {
  if (query !== '') {
    const urlSearch = `${process.env.NEXT_PUBLIC_BaseUrl_TMDB}search/multi?query=${query}&include_adult=${adult}&language=en-US&page=${page}`;
    const optionsSearch = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
      }
    };

    try {
      const resSearch = await fetch(urlSearch, optionsSearch);
      const search = await resSearch.json();
      return search;
    } catch (error) {
      return { page: 0, results: [], total_pages: 0 };
    }
  } else {
    return { page: 0, results: [], total_pages: 0 };
  }
}
export const fetchSearchResults = async (query,page=1) => {
  if (query !== '') {
    const urlSearch = `${process.env.NEXT_PUBLIC_BaseUrl_TMDB}search/keyword?query=${query}&page=${page}`;
    const optionsSearch = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
      }
    };

    try {
      const resSearch = await fetch(urlSearch, optionsSearch);
      const search = await resSearch.json();
      return search.results;
    } catch (error) {
      return [];
    }
  } else {
    return [];
  }
}

// Other
export const getBase64ImageUrl = async(imageId)=> {
  const response = await fetch(`https://image.tmdb.org/t/p/original${imageId}`);
  const buffer = await response.arrayBuffer();
  const data = Buffer.from(buffer).toString('base64');
  return `data:image/webp;base64,${data}`;
}
export const fetchTrending = async () => {
  const urlTrending = `${process.env.NEXT_PUBLIC_BaseUrl_TMDB}trending/all/day?language=en-US`;
  const optionsTrending = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
    }
  };
  var resTrending = await fetch(urlTrending, optionsTrending);
  var trending = await resTrending.json()
  return trending;
}

// Movie Req

export const fetchMovieGenres = async () => {
  const urlMGenres = `${process.env.NEXT_PUBLIC_BaseUrl_TMDB}genre/movie/list?language=en`;
  const optionMGenres = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
    }
  };
  var resMGenres = await fetch(urlMGenres, optionMGenres);
  var data = await resMGenres.json();
  return data;
}
export const fetchPopulerMovie = async (page=1) => {
  const urlPopular = `${process.env.NEXT_PUBLIC_BaseUrl_TMDB}movie/popular?language=en-US&page${page}`;
  const optionsPopuler = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
    }
  };
  var resPopular = await fetch(urlPopular, optionsPopuler);
  var popular = await resPopular.json();
  return popular;
}
export const fetchNowPlayingMovie = async (page=1) => {
  const urlPopular = `${process.env.NEXT_PUBLIC_BaseUrl_TMDB}movie/now_playing?language=en-US&page${page}`;
  const optionsPopuler = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
    }
  };
  var resPopular = await fetch(urlPopular, optionsPopuler);
  var popular = await resPopular.json();
  return popular;
}
export const fetchTopRatedMovie = async (page=1) => {
  const urlPopular = `${process.env.NEXT_PUBLIC_BaseUrl_TMDB}movie/top_rated?language=en-US&page${page}`;
  const optionsPopuler = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
    }
  };
  var resPopular = await fetch(urlPopular, optionsPopuler);
  var popular = await resPopular.json();
  return popular;
}
export const fetchUpcomingMovie = async (page=1) => {
  const urlPopular = `${process.env.NEXT_PUBLIC_BaseUrl_TMDB}movie/upcoming?language=en-US&page=${page}`;
  const optionsPopuler = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
    }
  };
  var resPopular = await fetch(urlPopular, optionsPopuler);
  var popular = await resPopular.json();
  return popular;
}
export const fetchSimilarMovie = async (MovieId,page=1) => {
  const url = `${process.env.NEXT_PUBLIC_BaseUrl_TMDB}movie/${MovieId}/similar?language=en-US&page=${page}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
    }
  };
  var res = await fetch(url, options);
  var data = await res.json();
  return data;
}
export const fetchVideoMovie = async (MovieId) => {
  const url = `${process.env.NEXT_PUBLIC_BaseUrl_TMDB}movie/${MovieId}/videos?language=en-US`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
    }
  };
  var res = await fetch(url, options);
  var data = await res.json();
  return data.results;
}
export const fetchMovieDetail = async (MovieId) => {
  const url = `${process.env.NEXT_PUBLIC_BaseUrl_TMDB}movie/${MovieId}?language=en-US`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
    }
  };
  var res = await fetch(url, options);
  var data = await res.json();
  return data;
}

// TV Req

export const fetchTVGenres = async () => {
  const urlTVGenres = `${process.env.NEXT_PUBLIC_BaseUrl_TMDB}genre/tv/list?language=en`;
  const optionTVGenres = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
    }
  };
  var resTVGenres = await fetch(urlTVGenres, optionTVGenres);
  var data = await resTVGenres.json();
  return data;
}
export const fetchPopulerTV = async (page=1) => {
  const urlTrendingSeries = `${process.env.NEXT_PUBLIC_BaseUrl_TMDB}tv/popular?language=en-US&page=${page}`;
  const optionsTrendingSeries = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
    }
  };
  var resTrendingSeries = await fetch(urlTrendingSeries, optionsTrendingSeries);
  var trendingSeries = await resTrendingSeries.json();
  return trendingSeries;
}
export const fetchAiringTodayTV = async (page=1) => {
  const urlTrendingSeries = `${process.env.NEXT_PUBLIC_BaseUrl_TMDB}tv/airing_today?language=en-US&page=${page}`;
  const optionsTrendingSeries = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
    }
  };
  var resTrendingSeries = await fetch(urlTrendingSeries, optionsTrendingSeries);
  var trendingSeries = await resTrendingSeries.json();
  return trendingSeries;
}
export const fetchOnAirTV = async (page=1) => {
  const urlTrendingSeries = `${process.env.NEXT_PUBLIC_BaseUrl_TMDB}tv/on_the_air?language=en-US&page=${page}`;
  const optionsTrendingSeries = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
    }
  };
  var resTrendingSeries = await fetch(urlTrendingSeries, optionsTrendingSeries);
  var trendingSeries = await resTrendingSeries.json();
  return trendingSeries;
}
export const fetchTopRatedTV = async (page=1) => {
  const urlTrendingSeries = `${process.env.NEXT_PUBLIC_BaseUrl_TMDB}tv/top_rated?language=en-US&page=${page}`;
  const optionsTrendingSeries = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
    }
  };
  var resTrendingSeries = await fetch(urlTrendingSeries, optionsTrendingSeries);
  var trendingSeries = await resTrendingSeries.json();
  return trendingSeries;
}
export const fetchSimilarTV = async (TvId,page=1) => {
  const url = `${process.env.NEXT_PUBLIC_BaseUrl_TMDB}tv/${TvId}/similar?language=en-US&page=${page}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
    }
  };
  var res = await fetch(url, options);
  var data = await res.json();
  return data;
}
export const fetchTvDetail = async (TvId) => {
  const url = `${process.env.NEXT_PUBLIC_BaseUrl_TMDB}tv/${TvId}?language=en-US`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
    }
  };
  var res = await fetch(url, options);
  var data = await res.json();
  return data;
}
export const fetchVideoTv = async (TvId) => {
  const url = `${process.env.NEXT_PUBLIC_BaseUrl_TMDB}tv/${TvId}/videos?language=en-US`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
    }
  };
  var res = await fetch(url, options);
  var data = await res.json();
  return data.results;
}
