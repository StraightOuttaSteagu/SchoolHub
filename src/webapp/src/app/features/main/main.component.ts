import { Component } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { pageAnimation } from 'src/app/shared/animations';
import { AuthService } from 'src/app/core/services/auth.service';
import { Select } from '@ngxs/store';
import { AccountState } from 'src/app/core/state-management/account/account.state';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/core/state-management/account/account.service';
import { OrganizationService } from 'src/app/core/state-management/organization/organization.service';
import { OrganizationState } from 'src/app/core/state-management/organization/organization.state';
import { OrganizationModel } from 'src/app/core/state-management/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  @Select(AccountState.selectAccount) account$!: Observable<any>;

  @Select(OrganizationState.selectOrganizations) organizations$!: Observable<any>;

  @Select(OrganizationState.selectActiveOrganization) organization$!: Observable<any>;

  pageAnimation = pageAnimation;
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        
      },
    },
    {
      text: 'Add organization',
      role: 'confirm',
      handler: (alertData: any) => {
        this._organizationService.createOrganization({
          name: alertData.name,
          description: ''
        });
      },
    },
  ];
  public alertInputs = [
    {
      placeholder: 'Enter organization name',
      name: 'name'
    }
  ];
  classes: any[] = [
    {subject: 'Limba si literatura romana', teacher: 'Oteleanu lia', id: '1', theme: 'red'},
    {
      subject: 'Arte Vizuale si activitati practice extracuriculare',
      teacher: 'Oteleanu lia',
      id: '2',
      theme: 'default-theme'
    },
    {subject: 'Biologie', teacher: 'Oteleanu lia maximus superbus extremus susus amugus', id: '690', theme: 'green'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: '4200', theme: 'light-blue'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'msg', theme: 'orange'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'seg', theme: 'yellow'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'sdggsd', theme: 'pink'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'dsgd', theme: 'purple'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'dsbh', theme: 'blue'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'ghmhg', theme: 'blue'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'wtre', theme: 'blue'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'dfhw', theme: 'blue'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'erhj', theme: 'blue'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'rheje', theme: 'blue'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'werh', theme: 'blue'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'erhy', theme: 'blue'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'ethe5', theme: 'blue'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'wwth', theme: 'blue'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'hjjhh', theme: 'blue'},
  ];

  constructor(private _theme: ThemeService, private _auth: AuthService, private _accountService: AccountService, private _organizationService: OrganizationService) { }

  ngOnInit() {
    this._accountService.getAccount();
    this._organizationService.getOrganizations();
  }

  logOut(): void {
    this._auth.logOut();
  }

  setTheme(theme: string): void {
    this._theme.setTheme(theme);
  }

  getTheme(): string | null {
    return this._theme.getTheme();
  }

  getSecondaryTheme(): string | null {
    let themeClass = this.classes.filter(el => el.id == this.getSecondaryThemeID())[0];
    return themeClass?themeClass.theme:'default-theme';
  }

  getSecondaryThemeID(): string | null {
    return this._theme.getClassThemeID();
  }
  
  selectOrganization(organization: OrganizationModel): void {
    this._organizationService.setOrganization(organization);
  }
}

