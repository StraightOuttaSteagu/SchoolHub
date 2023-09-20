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
import { icons } from 'src/app/shared/icons';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  @Select(AccountState.selectAccount) account$!: Observable<any>;

  @Select(OrganizationState.selectOrganizations) organizations$!: Observable<any>;

  @Select(OrganizationState.selectActiveOrganization) organization$!: Observable<any>;

  icons: any = icons;

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
    {subject: 'Chimie', teacher: 'Oteleanu lia', id: '1', theme: 'red', icon: 'flask'},
    {
      subject: 'Biologie',
      teacher: 'Oteleanu lia',
      id: '2',
      theme: 'green',
      icon: 'leaf'
    },
    {subject: 'Informatică', teacher: 'Popescu Vlad', id: '690', theme: 'green', icon: 'computer'},
    {subject: 'Limba și literatura română', teacher: 'Nerariu George', id: 'msg', theme: 'orange', icon: 'books'},
    {subject: 'Matematică', teacher: 'Fălescu Cătălin', id: 'seg', theme: 'yellow', icon: 'compass'},
    {subject: 'Filozofie', teacher: 'Florea Adela', id: 'dsgd', theme: 'purple', icon: 'hat'},
    {subject: 'Fizică', teacher: 'Simedrea Alexandru', id: 'dsbh', theme: 'blue', icon: 'microscope'},
    {subject: 'Limba engleză', teacher: 'Cazacu Matei', id: 'ghmhg', theme: 'blue', icon: 'openBook'},
    {subject: 'Arte vizuale', teacher: 'Grozea Alexandru', id: 'wtre', theme: 'blue', icon: 'pencils'},
    {subject: 'Antreprenoriat', teacher: 'Ionescu Andrei', id: 'dfhw', theme: 'blue', icon: 'toDo'},
    {subject: 'Limba franceză', teacher: 'Olteanu Ionuț', id: 'erhj', theme: 'blue', icon: 'books'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'rheje', theme: 'blue', icon: 'books'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'werh', theme: 'blue', icon: 'leaf'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'erhy', theme: 'blue', icon: 'hat'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'ethe5', theme: 'blue', icon: 'compass'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'wwth', theme: 'blue', icon: 'pencils'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'hjjhh', theme: 'blue', icon: 'books'},
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
  protected readonly window = window;
}

