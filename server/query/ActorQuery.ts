const graphql = require('graphql');
import {ActorDAO} from '../dao/ActorDAO';
import ActorType from '../models/ActorGraphQLType';

const actorDAO = new ActorDAO();

const ActorQuery = {
    actor: {
        type: ActorType.Actor,
        args: {
            id: {
                type: graphql.GraphQLID
            }
        },
        resolve: (root, args) => {
            return actorDAO.getActorById(args.id)
        }
    },
    actors: {
        type: new graphql.GraphQLList(ActorType.Actor),
        resolve: actorDAO.getActors()
    }
};

export default ActorQuery;
