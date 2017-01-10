import * as R from 'ramda';
import MovieQuery from './query/MovieQuery';
import ActorQuery from './query/ActorQuery';
import MovieMutation from './mutation/MovieMutation';
import ActorMutation from './mutation/ActorMutation';

const graphql = require('graphql');

const RootQuery = new graphql.GraphQLObjectType({
    name: 'RootQuery',
    fields: R.merge(MovieQuery, ActorQuery)
});

const RootMutation = new graphql.GraphQLObjectType({
    name: 'RootMutation',
    fields: R.merge(MovieMutation, ActorMutation)
});

const GraphQLSchema = new graphql.GraphQLSchema({
    query: RootQuery
});

export default GraphQLSchema;
