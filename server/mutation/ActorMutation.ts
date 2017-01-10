import {ActorDAO} from '../dao/ActorDAO';
import ActorType from '../models/ActorGraphQLType';

const graphql = require('graphql');
const graphqlRelay = require('graphql-relay');
const actorDAO = new ActorDAO();

const ActorCreateMutation = graphqlRelay.mutationWithClientMutationId({
    name: 'ActorCreateMutation',
    inputFields: ActorType.ActorInput,
    outputFields: {
        movie: {
            type: ActorType.Actor,
            resolve: (movie) => {
                return movie
            }
        }
    },
    mutateAndGetPayload: async(input) => {
        try {
            const result: any = await actorDAO.addActor(input);

            if (result.success) {
                return result.movie;
            }

            return {};
        } catch (error) {
            throw error;
        }
    }
});

const ActorUpdateMutation = graphqlRelay.mutationWithClientMutationId({
    name: 'ActorUpdateMutation',
    inputFields: ActorType.ActorInput,
    outputFields: {
        movie: {
            type: ActorType.Actor,
            resolve: (movie) => {
                return movie
            }
        }
    },
    mutateAndGetPayload: async(input) => {
        try {
            const result: any = await actorDAO.updateActor(input);

            if (result.success) {
                return result.Actor;
            }

            return {};
        } catch (error) {
            throw error;
        }
    }
});

const ActorRemoveMutation = graphqlRelay.mutationWithClientMutationId({
    name: 'ActorRemoveMutation',
    inputFields: ActorType.ActorInput,
    outputFields: {
        movie: {
            type: ActorType.Actor,
            resolve: (movie) => {
                return movie
            }
        }
    },
    mutateAndGetPayload: async(input) => {
        try {
            const result: any = await actorDAO.removeActor(input);

            if (result.success) {
                return result.actor;
            }

            return {};
        } catch (error) {
            throw error;
        }
    }
});

export default {
    addActor: ActorCreateMutation,
    updateActor: ActorUpdateMutation,
    removeActor: ActorRemoveMutation
};
