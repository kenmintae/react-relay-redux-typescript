import * as Hapi from 'hapi';
import GraphQLSchema from './schema';
import {startDatabase} from './database';
import {createInitialData} from './mock-data';
const hapi = require('hapi');
const GraphQL = require('hapi-graphql');
const server = new Hapi.Server();

startDatabase();
createInitialData();


server.connection({
    host: 'localhost',
    port: '3000'
});

server.register([
    {
        register: GraphQL,
        options: {
            route: {
                path: '/graphql'
            },
            query: () => {
                return {
                    schema: GraphQLSchema,
                    graphiql: true,
                    formatError: (error) => ({
                        message: error.message,
                        locations: error.locations,
                        stack: error.stack
                    })
                }
            }
        }
    }
])
    .catch((error) => {
        console.log(error);
        throw error;
    });

server.on('response', function (request) {
    server.log('info', request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.url.path + ' --> ' + request.response.statusCode);
});

server.start((error) => {
    if (error) {
        throw error;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
