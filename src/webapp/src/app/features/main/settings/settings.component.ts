import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, ViewDidEnter } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UpdateAccount } from 'src/app/core/state-management/account/account.actions';
import { AccountState } from 'src/app/core/state-management/account/account.state';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.scss']
})
export class SettingsComponent implements ViewDidEnter {

  @Select(AccountState.selectAccount) account$!: Observable<any>;

  editable: boolean = false;

  accountForm: FormGroup = this._fb.group({
    firstName: [{value: '', disabled: true}, [Validators.required]],
    lastName: [{value: '', disabled: true}, [Validators.required]],
    email: [{value: '', disabled: true}, [Validators.required]]
  })

  constructor(private _menu: MenuController, private _fb: FormBuilder, private _store: Store) { }

  ngOnInit() {
    this.account$.subscribe({
      next: (account) => {
        this.accountForm.setValue({
          firstName: account.firstName,
          lastName: account.lastName,
          email: account.email
        });
      }
    })
  }

  ionViewDidEnter(): void {
    this._menu.swipeGesture(false);
  }

  submit(): void {
    this.editable = !this.editable;
    if (this.editable) {
      this.accountForm.controls['firstName'].enable();
      this.accountForm.controls['lastName'].enable();
      this.accountForm.controls['email'].enable();
    } else {
      this._store.dispatch(new UpdateAccount(this.accountForm.getRawValue()));

      this.accountForm.controls['firstName'].disable();
      this.accountForm.controls['lastName'].disable();
      this.accountForm.controls['email'].disable();
    }
  }
}
