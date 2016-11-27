const graphql = require('graphql');

const RootQuery = new graphql.GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        movies: {}
    }
});

const RootMutation = new graphql.GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        movies: {}
    }
});

const GraphQLSchema = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});

export default GraphQLSchema;
