import ActorType from '../models/ActorGraphQLType';
import MovieType from '../models/MovieGraphQLType';
const graphql = require('graphql');

const Node = new graphql.GraphQLInterfaceType({
    name: 'Node',
    description: 'An object with an ID',
    fields: () => ({
        id: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLID),
            description: 'The global unique ID of an object'
        },
        type: {
            type: new graphql.GraphQLNonNull(graphql.GraphQLString),
            description: 'The type of the object'
        }
    }),
    resolveType: (obj) => {
        switch (obj.type) {
            case 'Actor':
                return ActorType.Actor;
            case 'Movie':
                return MovieType.Movie;
        }
    }
});

export default Node;
