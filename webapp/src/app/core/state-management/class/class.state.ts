import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { ClassModel } from "../models";
import { CreateClass, DeleteClass, GetClass, GetClasses, SetActiveClass, UpdateClass } from "./class.actions";
import { ClassController } from "../../controllers/class.controller";
import { ClassObjectsController } from "../../controllers/class-objects.controller";

export interface ClassStateModel {
    activeClassId: number | null,
    classes: ClassModel[]
}

@State<ClassStateModel>({
    name: 'classstate',
    defaults: {
        activeClassId: null,
        classes: []
    }
})
@Injectable()
export class ClassState {
    
    constructor (private _classController: ClassController, private _classObjectsController: ClassObjectsController) { }

    @Selector()
    static selectClass(state: ClassStateModel) {
        return state.classes.find(el => el.id === state.activeClassId) ?? { name: '' };
    }

    @Selector()
    static selectClasses(state: ClassStateModel) {
        return state.classes;
    }

    @Action(GetClasses)
    getClasses(ctx: StateContext<ClassStateModel>, action: GetClasses) {
        return this._classController.getClasses(action.organizationId).subscribe({
            next: (classes: { data: ClassModel[] }) => {
                const state = ctx.getState();

                ctx.setState({
                    ...state,
                    classes: classes.data
                });
            },

            error: (err) => {
                console.log(err);
            }
        });
    }

    @Action(GetClass)
    getClass(ctx: StateContext<ClassStateModel>, action: GetClass) {
        return this._classController.getClass(action.id, action.organizationId).subscribe({
            next: (activeClass: ClassModel) => {
                
                console.log(activeClass)
            },

            error: (err) => {
                console.log(err);
            }
        });
    }

    @Action(CreateClass)
    createClass(ctx: StateContext<ClassStateModel>, action: CreateClass) {
        return this._classController.createClass(action.organizationId, action.payload).subscribe({
            next: (schoolClass: ClassModel) => {
                const state = ctx.getState();

                const classes = state.classes;

                classes.push(schoolClass);

                ctx.setState({
                    ...state,
                    classes
                });
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

    @Action(SetActiveClass)
    setActiveClass(ctx: StateContext<ClassStateModel>, action: SetActiveClass) {
        const state = ctx.getState();

        ctx.setState({
            ...state,
            activeClassId: action.id
        });
        return;
    }
}