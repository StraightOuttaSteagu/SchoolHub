import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, ViewDidEnter } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UpdateAccount } from 'src/app/core/state-management/account/account.actions';
import { AccountService } from 'src/app/core/state-management/account/account.service';
import { AccountState } from 'src/app/core/state-management/account/account.state';
import { AccountModel } from 'src/app/core/state-management/models';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.scss']
})
export class SettingsComponent implements ViewDidEnter {

  @Select(AccountState.selectAccount) account$!: Observable<any>;

  editable: boolean = false;

  accountForm: FormGroup = this._fb.group({
    login: [{value: '', disabled: true}, [Validators.required]],
    firstName: [{value: '', disabled: true}, [Validators.required]],
    lastName: [{value: '', disabled: true}, [Validators.required]],
    email: [{value: '', disabled: true}, [Validators.required]]
  })

  constructor(private _menu: MenuController, private _fb: FormBuilder, private _accountSerivce: AccountService) { }

  ngOnInit() {
    this.account$.subscribe({
      next: (account) => {
        this.accountForm.setValue({
          login: account.login,
          firstName: account.firstName,
          lastName: account.lastName,
          email: account.email
        });
      }
    });
  }

  ionViewDidEnter(): void {
    this._menu.swipeGesture(false);
  }

  submit(): void {
    this.editable = !this.editable;
    this.accountForm.controls['firstName'][this.editable ? 'enable' : 'disable']({emitEvent: false});
    this.accountForm.controls['lastName'][this.editable ? 'enable' : 'disable']({emitEvent: false});
    this.accountForm.controls['email'][this.editable ? 'enable' : 'disable']({emitEvent: false});
    if (!this.editable) {
      const accountModel: AccountModel = this.accountForm.getRawValue();
      this._accountSerivce.updateAccount(accountModel);
    }
  }
}
