import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { ClassModel, GradeModel, PostModel } from "../models";
import { CreateClass, DeleteClass, GetAnnouncements, GetAssignments, GetClass, GetClasses, GetGrades, SetActiveClass, UpdateClass } from "./class.actions";
import { ClassController } from "../../controllers/class.controller";
import { ClassObjectsController } from "../../controllers/class-objects.controller";

export interface ClassStateModel {
    activeClassId: number | null,
    classes: ClassModel[],
    announcements: PostModel[],
    assignments: PostModel[],
    grades: GradeModel[]
}

@State<ClassStateModel>({
    name: 'classstate',
    defaults: {
        activeClassId: null,
        classes: [],
        announcements: [],
        assignments: [],
        grades: []
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

    @Selector()
    static selectAnnouncements(state: ClassStateModel) {
        return state.announcements;
    }

    @Selector()
    static selectAssignments(state: ClassStateModel) {
        return {
            missing: [
                {
                    title: "This week",
                    data: state.assignments.filter(el => +(new Date(el.dueDate!)) < +(new Date()))
                },
                {
                    title: "Last week",
                    data: state.assignments.filter(el => +(new Date(el.dueDate!)) < +(new Date()))
                },
                {
                    title: "Other",
                    data: state.assignments.filter(el => +(new Date(el.dueDate!)) < +(new Date()))
                }
            ],
            assigned: [
                {
                    title: "This week",
                    data: state.assignments.filter(el => +(new Date(el.dueDate!)) >= +(new Date()))
                },
                {
                    title: "Next week",
                    data: state.assignments.filter(el => +(new Date(el.dueDate!)) >= +(new Date()))
                },
                {
                    title: "Other",
                    data: state.assignments.filter(el => +(new Date(el.dueDate!)) >= +(new Date()))
                },
                {
                    title: "No due date",
                    data: state.assignments.filter(el => +(new Date(el.dueDate!)) >= +(new Date()))
                }
            ],
            done: [
                {
                    title: "This week",
                    data: [

                    ]
                },
                {
                    title: "Last week",
                    data: [

                    ]
                },
                {
                    title: "Other",
                    data: [

                    ]
                }
            ]
        };
    }

    @Selector()
    static selectClassData(state: ClassStateModel) {
        const activeClass = state.classes.find(el => el.id === state.activeClassId);
        console.log(activeClass)
        return [...activeClass!.absences!, ...activeClass!.announcements!, ...activeClass!.assignments!, ...activeClass!.grades!].sort(el => +el.date);
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
    deleteClass(ctx: StateContext<ClassStateModel>, action: DeleteClass) {
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

    @Action(GetAnnouncements)
    getAnnouncements(ctx: StateContext<ClassStateModel>, action: GetAnnouncements) {
        this._classObjectsController.getAnnouncementsByClass(action.id).subscribe({
            next: (announcements) => {
                const state = ctx.getState();
                for (let announcement of announcements.data) {
                    const schoolClass = state.classes.find(el => el.id === action.id);
                    state.announcements.push({
                        attachments: [],
                        comments: [],
                        content: announcement.content,
                        title: announcement.title,
                        date: new Date(announcement.createdAt),
                        icon: (schoolClass?.icon ?? 'leaf'),
                        subject: (schoolClass?.subject ?? '-')
                    });
                }

                ctx.setState({
                    ...state
                });
            },
            error: () => {

            }
        });
    }

    @Action(GetAssignments)
    getAssignments(ctx: StateContext<ClassStateModel>, action: GetAssignments) {
        this._classObjectsController.getAssignmentsByClass(action.id).subscribe({
            next: (assignments) => {
                const state = ctx.getState();
                for (let assignment of assignments.data) {
                    const schoolClass = state.classes.find(el => el.id === action.id);
                    state.assignments.push({
                        attachments: [],
                        comments: [],
                        content: assignment.content,
                        title: assignment.title,
                        date: new Date(assignment.createdAt),
                        icon: (schoolClass?.icon ?? 'leaf'),
                        subject: (schoolClass?.subject ?? '-'),
                        dueDate: new Date(assignment.deadline)
                    });
                }

                ctx.setState({
                    ...state
                });
            },
            error: () => {

            }
        });
    }

    @Action(GetGrades)
    getGrades(ctx: StateContext<ClassStateModel>, action: GetGrades) {
        this._classObjectsController.getGradesByClass(action.id).subscribe({
            next: (grades) => {
                console.log(grades)
            },
            error: () => {

            }
        });
    }
}