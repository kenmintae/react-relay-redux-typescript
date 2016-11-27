import * as mongoose from 'mongoose';
import * as Bluebird from 'bluebird';
import * as R from 'ramda';
import MovieSchema from '../models/Movie';
(mongoose as any).Promise = Bluebird;

export class MovieDAO {
    private Movie;

    constructor() {
        if (R.contains('Movie', mongoose.modelNames())) {
            this.Movie = mongoose.model('Movie');
        } else {
            this.Movie = mongoose.model('Movie', MovieSchema);
        }
    }

    public getModel() {
        return this.Movie;
    }

    public getMovies(): Bluebird<any> {
        return new Bluebird((resolve: Function, reject: Function) => {

            this.Movie
                .find({})
                .populate({
                    path: 'actors'
                })
                .exec((error, movies) => {
                    if (error) return reject(error);
                    return resolve(movies);
                });
        });
    }

    public getMovieById(id: string): Bluebird<any> {
        return new Bluebird((resolve: Function, reject: Function) => {
            let query = {
                id: id
            };
            this.Movie
                .findOne(query)
                .populate({
                    path: 'actors'
                })
                .exec((error, movie) => {
                    if (error) return reject(error);
                    return resolve(movie);
                });
        });
    }
}
