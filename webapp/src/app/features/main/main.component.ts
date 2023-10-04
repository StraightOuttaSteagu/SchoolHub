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
import { ClassService } from 'src/app/core/state-management/class/class.service';
import { colors } from 'src/app/shared/colors';
import { ClassState } from 'src/app/core/state-management/class/class.state';
import { HttpTestService } from 'src/app/core/tests/http-test.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  @Select(AccountState.selectAccount) account$!: Observable<any>;

  @Select(OrganizationState.selectOrganizations) organizations$!: Observable<any>;

  @Select(OrganizationState.selectActiveOrganization) organization$!: Observable<any>;

  organization: any;

  @Select(ClassState.selectClasses) classes$!: Observable<any>;

  @Select(ClassState.selectClass) class$!: Observable<any>;

  classForm: FormGroup = this._fb.group({
    name: [' ', [Validators.required]],
    identifier: [' ', [Validators.required]],
    subject: [' ', [Validators.required]]
  });

  icons: any = icons;
  colors: any = colors;

  selectedColor: number = 0;
  selectedIcon: number = 0;
  protected readonly document = document;
  protected readonly Object = Object;

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
          name: alertData.name
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
    {subject: 'Chimie', teacher: 'Oteleanu lia', id: '1', theme: 'yellow', icon: 'flask'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: '2', theme: 'green', icon: 'leaf'},
    {subject: 'Informatică', teacher: 'Popescu Vlad', id: '690', theme: 'blue', icon: 'computer'},
    {subject: 'Limba și literatura română', teacher: 'Nerariu George', id: 'msg', theme: 'yellow', icon: 'books'},
    {subject: 'Matematică', teacher: 'Fălescu Cătălin', id: 'seg', theme: 'blue', icon: 'compass'},
    {subject: 'Filozofie', teacher: 'Florea Adela', id: 'dsgd', theme: 'purple', icon: 'hat'},
    {subject: 'Fizică', teacher: 'Simedrea Alexandru', id: 'dsbh', theme: 'purple', icon: 'microscope'},
    {subject: 'Limba engleză', teacher: 'Cazacu Matei', id: 'ghmhg', theme: 'blue', icon: 'openBook'},
    {subject: 'Arte vizuale', teacher: 'Grozea Alexandru', id: 'wtre', theme: 'green', icon: 'pencils'},
    {subject: 'Antreprenoriat', teacher: 'Ionescu Andrei', id: 'dfhw', theme: 'yellow', icon: 'toDo'},
    {subject: 'Limba franceză', teacher: 'Olteanu Ionuț', id: 'erhj', theme: 'purple', icon: 'books'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'rheje', theme: 'blue', icon: 'books'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'werh', theme: 'blue', icon: 'leaf'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'erhy', theme: 'blue', icon: 'hat'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'ethe5', theme: 'blue', icon: 'compass'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'wwth', theme: 'blue', icon: 'pencils'},
    {subject: 'Biologie', teacher: 'Oteleanu lia', id: 'hjjhh', theme: 'blue', icon: 'books'},
  ];

  constructor(
    private _test: HttpTestService,
    private _theme: ThemeService,
    private _auth: AuthService,
    private _accountService: AccountService,
    private _organizationService: OrganizationService,
    private _classService: ClassService,
    private _fb: FormBuilder
    ) { }

  ngOnInit() {
   //this._test.post('/api/classes/1/posts', {
   // "title": "fdasfsda",
   // "content": "fdasfsa",
   // "type": "assignment",
   // "deadline": "2024-09-28T05:27:20Z"
   // }).subscribe({
   //  next: (post) => {
   //    console.log(post);
   //  },
   //  error: (e) => {
   //    console.log(e);
   //  }
   //});
    this._accountService.getAccount();
    this._organizationService.getOrganizations();
    this.organization$.subscribe({
      next: (organization) => {
        if (organization.id !== undefined) {
          this.organization = organization;
          this._classService.getClasses(organization.id);
        }
      }
    });

    this.classes$.subscribe({
      next: (x) => {
        console.log(x)
        for (let id of x.map((el: any) => el.id)) {
          this._classService.getAnnouncements(id);
          this._classService.getAssignments(id);
          this._classService.getGrades(id);
        }
      }
    })
  }

  logOut(): void {
    this._auth.logout();
  }

  setTheme(theme: string): void {
    this._theme.setTheme(theme);
  }

  getTheme(): string | null {
    return this._theme.getTheme();
  }

  getSecondaryTheme(): string | null {
    let themeClass = this.classes.filter(el => el.id == this.getSecondaryThemeID())[0];
    return themeClass ? themeClass.theme : 'default-theme';
  }

  getSecondaryThemeID(): string | null {
    return this._theme.getClassThemeID();
  }

  selectOrganization(organization: OrganizationModel): void {
    this._organizationService.setOrganization(organization);
  }

  createClass(): void {
    if (this.classForm.valid) {
      this._classService.createClass(this.organization.id, {
        icon: this.Object.keys(icons)[this.selectedIcon],
        theme: colors[this.selectedColor + 1],
        name: this.classForm.controls["name"].value,
        identifier: this.classForm.controls["identifier"].value,
        subject: this.classForm.controls["subject"].value
      });
    }
  }

  protected readonly window = window;
}

