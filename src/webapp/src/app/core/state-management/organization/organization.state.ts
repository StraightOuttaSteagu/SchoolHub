import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { OrganizationModel } from "../models";
import { OrganizationController } from "../../controllers/organization.controller";
import { GetOrganizations, GetOrganization, CreateOrganization, UpdateOrganization, DeleteOrganization, SetOrganization } from "./organization.actions";

export interface OrganizationStateModel {
    activeOrganization: OrganizationModel,
    organizations: OrganizationModel[]
}

@State<OrganizationStateModel>({
    name: 'organizationstate',
    defaults: {
        activeOrganization: {
            name: '',
            description: ''
        },
        organizations: []
    }
})
@Injectable()
export class OrganizationState {
    
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
            next: (organizations: OrganizationModel[]) => {
                const state = ctx.getState();

                let activeOrganization: any = localStorage.getItem('activeOrganization');

                console.log(organizations.map(el => el.id))

                if (activeOrganization === null || !organizations.map(el => String(el.id)).includes(activeOrganization)) {
                    localStorage.setItem('activeOrganization', organizations[0].id ?? '-1');

                    activeOrganization = organizations[0];
                } else {
                    activeOrganization = organizations.filter(el => el.id == activeOrganization)[0];
                }

                ctx.setState({
                    activeOrganization,
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
            next: (val) => {
                const state = ctx.getState();

                state.organizations.push(action.payload);

                ctx.setState({
                    ...state
                })
            },

            error: (err) => {
                console.log(err);
            }
        });
    }

    @Action(UpdateOrganization)
    updateOrganization(ctx: StateContext<OrganizationStateModel>, action: UpdateOrganization) {
        return this._organizationController.updateOrganization(action.payload, action.id).subscribe({
            next: (/**??? */) => {
                
            },

            error: (err) => {
                console.log(err);
            }
        });
    }

    @Action(SetOrganization)
    setOrganization(ctx: StateContext<OrganizationStateModel>, action: SetOrganization) {
        const state = ctx.getState();

        ctx.setState({
            ...state,
            activeOrganization: action.organization
        })
    }
}