const graphql = require('graphql');
import {MovieDAO} from '../dao/MovieDAO';
import MovieType from '../models/MovieGraphQLType';

const movieDAO = new MovieDAO();

const MovieQuery = {
    movie: {
        type: MovieType.Movie,
        args: {
            id: {
                type: graphql.GraphQLID
            }
        },
        resolve: (root, args) => {
            return movieDAO.getMovieById(args.id)
        }
    },
    movies: {
        type: new graphql.GraphQLList(MovieType.Movie),
        resolve: movieDAO.getMovies()
    }
};

export default MovieQuery;