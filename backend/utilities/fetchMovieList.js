import axios from 'axios';

export const fetchYTSMovieList = async (page = 1) => {
    const limit = 24;
    const { OMDB_KEY, TORRENT_API } = process.env;

    let res = await axios
        .get(`${TORRENT_API}?sort_by=year&page=${page}&limit=${limit}&`)
    if (res.status !== 200)
        throw new Error('Could not fetch movie list!');
    if (!res.data.data.movies)
        throw new Error('Page does not exist');
    const movieList = res.data.data.movies;
    let movies = [];
    await Promise.all(movieList.map(async movie => {
        res = await axios.get(`http://www.omdbapi.com/?i=${movie.imdb_code}&apikey=${OMDB_KEY}`)
        if (res.status !== 200)
            throw new Error(`Could not fetch movie data from ${movie.imdb_code}!`);
        movies = [...movies, {imdb_code: movie.imdb_code,
            hash: `${movie.torrents[0].hash}`,
            omdb_data: res.data}]
    }))
    return movies;
}
