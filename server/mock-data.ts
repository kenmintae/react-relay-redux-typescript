import {MovieDAO} from '../server/dao/MovieDAO';
import {ActorDAO} from '../server/dao/ActorDAO';

import * as mongoose from 'mongoose';
import * as R from 'ramda';
import ActorSchema from '../server/models/Actor';
import MovieSchema from '../server/models/Movie';

export function createInitialData() {
    const Movie = new MovieDAO().getModel();
    const Actor = new ActorDAO().getModel();
    const ActorModel = R.contains('Actor', mongoose.modelNames()) ? mongoose.model('Actor') : mongoose.model('Actor', ActorSchema);
    const MovieModel = R.contains('Movie', mongoose.modelNames()) ? mongoose.model('Movie') : mongoose.model('Movie', MovieSchema);

    ActorModel.remove({});
    MovieModel.remove({});

    const actor1 = new Actor({
        firstName: 'Tim',
        lastName: 'Robbins'
    });

    const actor2 = new Actor({
        firstName: 'Morgan',
        lastName: 'Freeman'
    });

    const actor3 = new Actor({
        firstName: 'Kate',
        lastName: 'Winslet'
    });

    const actor4 = new Actor({
        firstName: 'Leonardo',
        lastName: 'DiCaprio'
    });

    const actor5 = new Actor({
        firstName: 'Angelina',
        lastName: 'Jolie'
    });

    const actor6 = new Actor({
        firstName: 'Brad',
        lastName: 'Pitt'
    });

    const movie1 = new Movie({
        title: 'The Shawshank Redemption',
        director: 'Frank Darabont',
        actors: [actor1, actor2]
    });

    const movie2 = new Movie({
        title: 'Titanic',
        director: 'James Cameron',
        actors: [actor3, actor4]
    });

    const movie3 = new Movie({
        title: 'Mr. & Mrs. Smith',
        director: 'Doug Liman',
        actors: [actor5, actor6]
    });

    actor1.save();
    actor2.save();
    actor3.save();
    actor4.save();
    actor5.save();
    actor6.save();

    movie1.save();
    movie2.save();
    movie3.save();
}