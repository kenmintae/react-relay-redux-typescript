import Node from '../interface/Node';
import ActorType from './ActorGraphQLType';
const graphql = require('graphql');

const _Movie = new graphql.GraphQLObjectType({
    name: 'Movie',
    description: 'A Movie',
    fields: () => ({
        id: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLID)
        },
        title: {
            type: graphql.GraphQLString
        },
        director: {
            type: graphql.GraphQLString
        },
        actors: {
            type: new graphql.GraphQLList(ActorType.Actor)
        },
        type: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        }
    }),
    interfaces: () => [Node]
});

const _MovieInput = new graphql.GraphQLObjectType({
    name: 'MovieInput',
    fields: () => ({
        title: {
            type: graphql.GraphQLString
        },
        director: {
            type: graphql.GraphQLString
        },
        actors: {
            type: new graphql.GraphQLList(ActorType.Actor)
        }
    })
});

export default {
    Movie: _Movie,
    MovieInput: _MovieInput
};
