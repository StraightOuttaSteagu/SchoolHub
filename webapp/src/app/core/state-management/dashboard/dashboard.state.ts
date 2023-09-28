import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AbsenceModel, GradeModel, PostModel } from "../models";
import { Injectable } from "@angular/core";
import { GetAbsencesByOrganization, GetAnnouncementsByOrganization, GetAssignmentsByOrganization, GetGradesByOrganization } from "./dashboard.actions";
import { OrganizationController } from "../../controllers/organization.controller";


export interface DashboardStateModel {
    announcements: PostModel[],
    assignments: PostModel[],
    grades: GradeModel[],
    absences: AbsenceModel[]
}

@State<DashboardStateModel>({
    name: 'classstate',
    defaults: {
        announcements: [],
        assignments: [],
        grades: [],
        absences: []
    }
})
@Injectable()
export class DashboardState {

    constructor (private _organizationController: OrganizationController) { }

    @Selector()
    static selectAnnouncements(state: DashboardStateModel) {
        return state.announcements;
    }

    @Selector()
    static selectAssignments(state: DashboardStateModel) {
        return state.assignments;
    }

    @Selector()
    static selectAbsences(state: DashboardStateModel) {
        return state.absences;
    }

    @Selector()
    static selectGrades(state: DashboardStateModel) {
        return state.grades;
    }
    

    @Action(GetAnnouncementsByOrganization)
    getAnnouncements(ctx: StateContext<DashboardStateModel>, action: GetAnnouncementsByOrganization) {
        return this._organizationController.getAnnouncementsByOrganization(action.id).subscribe({
            next: (announcements: PostModel[]) => {
                const state = ctx.getState();

                ctx.setState({
                    ...state,
                    announcements
                });
            }
        });
    }

    @Action(GetAssignmentsByOrganization)
    getAssignments(ctx: StateContext<DashboardStateModel>, action: GetAssignmentsByOrganization) {
        return this._organizationController.getAssignmentsByOrganization(action.id).subscribe({
            next: (assignments: PostModel[]) => {
                const state = ctx.getState();

                ctx.setState({
                    ...state,
                    assignments
                });
            }
        });
    }

    @Action(GetGradesByOrganization)
    getGrades(ctx: StateContext<DashboardStateModel>, action: GetGradesByOrganization) {
        return this._organizationController.getGradesByOrganization(action.id).subscribe({
            next: (grades: GradeModel[]) => {
                const state = ctx.getState();

                ctx.setState({
                    ...state,
                    grades
                });
            }
        });
    }

    @Action(GetAbsencesByOrganization)
    getAbsences(ctx: StateContext<DashboardStateModel>, action: GetAbsencesByOrganization) {
        return this._organizationController.getAbsencesByOrganization(action.id).subscribe({
            next: (absences: AbsenceModel[]) => {
                const state = ctx.getState();

                ctx.setState({
                    ...state,
                    absences
                });
            }
        });
    }
}