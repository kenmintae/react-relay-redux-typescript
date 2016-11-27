import Node from '../interface/Node';
const graphql = require('graphql');

const Actor = new graphql.GraphQLObjectType({
    name: 'Actor',
    description: 'An Actor',
    fields: () => ({
        id: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLID)
        },
        firstName: {
            type: graphql.GraphQLString
        },
        lastName: {
            type: graphql.GraphQLString
        },
        type: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString)
        }
    }),
    interfaces: () => [Node]
});

const ActorInput = new graphql.GraphQLObjectType({
    name: 'ActorInput',
    fields: () => ({
        firstName: {
            type: graphql.GraphQLString
        },
        lastName: {
            type: graphql.GraphQLString
        }
    })
});

export default {
    Actor: Actor,
    ActorInput: ActorInput
};
