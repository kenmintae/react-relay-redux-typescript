import * as mongoose from 'mongoose';
import * as Bluebird from 'bluebird';
import * as R from 'ramda';
import ActorSchema from '../models/Actor';
(mongoose as any).Promise = Bluebird;

export class ActorDAO {
    private Actor;

    constructor() {
        if (R.contains('Movie', mongoose.modelNames())) {
            this.Actor = mongoose.model('Actor');
        } else {
            this.Actor = mongoose.model('Actor', ActorSchema);
        }
    }

    public getModel() {
        return this.Actor;
    }

    public getActors(): Bluebird<any> {
        return new Bluebird((resolve: Function, reject: Function) => {

            this.Actor
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

    public getActorById(id: string): Bluebird<any> {
        return new Bluebird((resolve: Function, reject: Function) => {
            let query = {
                id: id
            };
            this.Actor
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
