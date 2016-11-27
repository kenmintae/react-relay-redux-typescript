const graphql = require('graphql');
import {ActorDAO} from '../dao/ActorDAO';
import ActorType from '../models/ActorGraphQLType';

const actorDAO = new ActorDAO();

const ActorQuery = {
    actors: {
        type: ActorType.Actor,
        args: {
            id: {
                type: graphql.GraphQLID
            }
        },
        resolve: (root, args) => {
            return actorDAO.getActors()
        }
    }
};

export default ActorQuery;
