import {MovieDAO} from '../dao/MovieDAO';
import MovieType from '../models/MovieGraphQLType';

const graphql = require('graphql');
const graphqlRelay = require('graphql-relay');
const movieDAO = new MovieDAO();

const MovieCreateMutation = graphqlRelay.mutationWithClientMutationId({
    name: 'MovieCreateMutation',
    inputFields: MovieType.MovieInput,
    outputFields: {
        movie: {
            type: MovieType.Movie,
            resolve: (movie) => {
                return movie
            }
        }
    },
    mutateAndGetPayload: async(input) => {
        try {
            const result: any = await movieDAO.addMovie(input);

            if (result.success) {
                return result.movie;
            }

            return {};
        } catch (error) {
            throw error;
        }
    }
});

const MovieUpdateMutation = graphqlRelay.mutationWithClientMutationId({
    name: 'MovieUpdateMutation',
    inputFields: MovieType.MovieInput,
    outputFields: {
        movie: {
            type: MovieType.Movie,
            resolve: (movie) => {
                return movie
            }
        }
    },
    mutateAndGetPayload: async(input) => {
        try {
            const result: any = await movieDAO.updateMovie(input);

            if (result.success) {
                return result.movie;
            }

            return {};
        } catch (error) {
            throw error;
        }
    }
});

const MovieRemoveMutation = graphqlRelay.mutationWithClientMutationId({
    name: 'MovieRemoveMutation',
    inputFields: MovieType.MovieInput,
    outputFields: {
        movie: {
            type: MovieType.Movie,
            resolve: (movie) => {
                return movie
            }
        }
    },
    mutateAndGetPayload: async(input) => {
        try {
            const result: any = await movieDAO.removeMovie(input);

            if (result.success) {
                return result.movie;
            }

            return {};
        } catch (error) {
            throw error;
        }
    }
});

export default {
    addMovie: MovieCreateMutation,
    updateMovie: MovieUpdateMutation,
    removeMovie: MovieRemoveMutation
};
