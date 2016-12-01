import * as R from 'ramda';
import MovieQuery from './query/MovieQuery';
import ActorQuery from './query/ActorQuery';

const graphql = require('graphql');

const RootQuery = new graphql.GraphQLObjectType({
    name: 'RootQuery',
    fields: R.merge(MovieQuery, ActorQuery)
});

/*const RootMutation = new graphql.GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        movies: {}
    }
});*/

const GraphQLSchema = new graphql.GraphQLSchema({
    query: RootQuery
});

export default GraphQLSchema;
