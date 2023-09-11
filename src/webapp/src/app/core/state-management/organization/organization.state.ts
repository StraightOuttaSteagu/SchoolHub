import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { OrganizationModel } from "../models";
import { OrganizationController } from "../../controllers/organization.controller";
import { GetOrganizations, GetOrganization, CreateOrganization, UpdateOrganization, DeleteOrganization } from "./organization.actions";

export interface OrganizationStateModel {
    activeOrganization: OrganizationModel,
    organizations: string[]
}

@State<OrganizationStateModel>({
    name: 'accountstate',
    defaults: {
        activeOrganization: {

        },
        organizations: []
    }
})
@Injectable()
export class AccountState {
    
    constructor (private _organizationController: OrganizationController) { }

    @Selector()
    static selectOrganizations(state: OrganizationStateModel) {
        return state.organizations;
    }

    @Selector()
    static selectActiveOrganization(state: OrganizationStateModel) {
        return state.activeOrganization;
    }

    @Action(GetOrganizations)
    getOrganizations(ctx: StateContext<OrganizationStateModel>) {
        return this._organizationController.getOrganizations().subscribe({
            next: (organizations: string[]) => {
                const state = ctx.getState();

                ctx.setState({
                    ...state,
                    organizations: organizations
                });
            },

            error: (err) => {
                console.log(err);
            }
        });
    }

    @Action(GetOrganization)
    getOrganization(ctx: StateContext<OrganizationStateModel>, action: GetOrganization) {
        return this._organizationController.getOrganization(action.id).subscribe({
            next: (activeOrganization: OrganizationModel) => {
                const state = ctx.getState();

                ctx.setState({
                    ...state,
                    activeOrganization: activeOrganization
                });
            },

            error: (err) => {
                console.log(err);
            }
        });
    }

    @Action(CreateOrganization)
    createOrganization(ctx: StateContext<OrganizationStateModel>, action: CreateOrganization) {
        return this._organizationController.createOrganization(action.payload).subscribe({
            next: (/**??? */) => {
                
            },

            error: (err) => {
                console.log(err);
            }
        });
    }

    @Action(UpdateOrganization)
    updateOrganization(ctx: StateContext<OrganizationStateModel>, action: UpdateOrganization) {
        return this._organizationController.updateOrganization(action.payload).subscribe({
            next: (/**??? */) => {
                
            },

            error: (err) => {
                console.log(err);
            }
        });
    }

    @Action(DeleteOrganization)
    DeleteOrganization(ctx: StateContext<OrganizationStateModel>, action: DeleteOrganization) {
        return this._organizationController.deleteOrganization(action.id).subscribe({
            next: (/**??? */) => {
                
            },

            error: (err) => {
                console.log(err);
            }
        });
    }
}