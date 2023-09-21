import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { ClassModel } from "../models";
import { CreateClass, DeleteClass, GetClass, GetClasses, UpdateClass } from "./class.actions";
import { ClassController } from "../../controllers/class.controller";

export interface ClassStateModel {
    activeClass: ClassModel,
    classes: string[]
}

@State<ClassStateModel>({
    name: 'classstate',
    defaults: {
        activeClass: {

        },
        classes: []
    }
})
@Injectable()
export class ClassState {
    
    constructor (private _classController: ClassController) { }

    @Selector()
    static selectClass(state: ClassStateModel) {
        return state.classes;
    }

    @Selector()
    static selectClasses(state: ClassStateModel) {
        return state.activeClass;
    }

    @Action(GetClasses)
    getClasses(ctx: StateContext<ClassStateModel>, action: GetClasses) {
        return this._classController.getClasses(action.organizationId).subscribe({
            next: (classes: string[]) => {
                const state = ctx.getState();

                ctx.setState({
                    ...state,
                    classes: classes
                });
            },

            error: (err) => {
                console.log(err);
            }
        });
    }

    @Action(GetClass)
    getClass(ctx: StateContext<ClassStateModel>, action: GetClass) {
        return this._classController.getClass(action.id).subscribe({
            next: (activeClass: ClassModel) => {
                const state = ctx.getState();

                ctx.setState({
                    ...state,
                    activeClass: activeClass
                });
            },

            error: (err) => {
                console.log(err);
            }
        });
    }

    @Action(CreateClass)
    createClass(ctx: StateContext<ClassStateModel>, action: CreateClass) {
        return this._classController.createClass(action.payload).subscribe({
            next: (/**??? */) => {
                
            },

            error: (err) => {
                console.log(err);
            }
        });
    }

    @Action(UpdateClass)
    updateClass(ctx: StateContext<ClassStateModel>, action: UpdateClass) {
        return this._classController.updateClass(action.payload).subscribe({
            next: (/**??? */) => {
                
            },

            error: (err) => {
                console.log(err);
            }
        });
    }

    @Action(DeleteClass)
    DeleteClass(ctx: StateContext<ClassStateModel>, action: DeleteClass) {
        return this._classController.deleteClass(action.id).subscribe({
            next: (/**??? */) => {
                
            },

            error: (err) => {
                console.log(err);
            }
        });
    }
}