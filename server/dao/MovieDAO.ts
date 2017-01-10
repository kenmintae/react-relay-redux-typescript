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
                .populate('actors')
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

    public addMovie(movie: any): Bluebird<any> {
        return new Bluebird((resolve: Function, reject: Function) => {
            const _movie = new this.Movie(movie);

            _movie
                .save((error, movie) => {
                    if (error) return reject(this.createFailureResponse(error));
                    return resolve(this.createSuccessResponse(movie));
                });
        });
    }

    public updateMovie(movie: any): Bluebird<any> {
        return new Bluebird((resolve: Function, reject: Function) => {
            const _query = {id: movie.id};
            const _set = {
                $set: movie
            };

            this.Movie
                .findOneAndUpdate(_query, _set)
                .exec((error, updated) => {
                    if (error) return reject(this.createFailureResponse(error));
                    return resolve(this.createSuccessResponse(updated));
                });
        });
    }

    public removeMovie(movie: any): Bluebird<any> {
        return new Bluebird((resolve: Function, reject: Function) => {

            this.Movie
                .findByIdAndRemove(movie.id)
                .exec((error, deleted) => {
                    if (error) return reject(this.createFailureResponse(error));
                    return resolve(this.createSuccessResponse(deleted));
                });
        });
    }

    private createSuccessResponse(movie: any) {
        return {
            success: true,
            movie: movie
        }
    }

    private createFailureResponse(message?: string) {
        return {
            success: false,
            message: message
        }
    }
}
