import * as mongoose from 'mongoose';
import * as Bluebird from 'bluebird';
import * as R from 'ramda';
import ActorSchema from '../models/Actor';
(mongoose as any).Promise = Bluebird;

export class ActorDAO {
    private Actor;

    constructor() {
        if (R.contains('Actor', mongoose.modelNames())) {
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
                .exec((error, actor) => {
                    if (error) return reject(error);
                    return resolve(actor);
                });
        });
    }

    public addActor(actor: any): Bluebird<any> {
        return new Bluebird((resolve: Function, reject: Function) => {
            const _actor = new this.Actor(actor);

            _actor
                .save((error, movie) => {
                    if (error) return reject(this.createFailureResponse(error));
                    return resolve(this.createSuccessResponse(movie));
                });
        });
    }

    public updateActor(actor: any): Bluebird<any> {
        return new Bluebird((resolve: Function, reject: Function) => {
            const _query = {id: actor.id};
            const _set = {
                $set: actor
            };

            this.Actor
                .findOneAndUpdate(_query, _set)
                .exec((error, updated) => {
                    if (error) return reject(this.createFailureResponse(error));
                    return resolve(this.createSuccessResponse(updated));
                });
        });
    }

    public removeActor(actor: any): Bluebird<any> {
        return new Bluebird((resolve: Function, reject: Function) => {

            this.Actor
                .findByIdAndRemove(actor.id)
                .exec((error, deleted) => {
                    if (error) return reject(this.createFailureResponse(error));
                    return resolve(this.createSuccessResponse(deleted));
                });
        });
    }

    private createSuccessResponse(actor: any) {
        return {
            success: true,
            movie: actor
        }
    }

    private createFailureResponse(message?: string) {
        return {
            success: false,
            message: message
        }
    }
}
