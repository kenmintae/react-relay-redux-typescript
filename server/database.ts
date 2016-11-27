import * as mongoose from 'mongoose';

export function startDatabase() {
    mongoose.connect('mongodb://localhost/react_relay_redux_starter');
    mongoose.connection.on('error', () => console.error(`An error occurred with the DB connection: ${this.connection}`));
}