import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements ViewWillEnter, ViewWillLeave {
  // The HTML for the classes will remain the same and the route will act as a filter that selects only some of the fields

  private _routerSubscription!: Subscription;

  data = [
    { content: 'Lorem Ipsum', type: 'announcement'},
    { content: 'Lorem Ipsum', type: 'announcement'},
    { content: 'Lorem Ipsum', type: 'announcement'},
    { content: 'Lorem Ipsum', type: 'announcement'},
    { content: 'Lorem Ipsum', type: 'announcement'},
    { content: 'Lorem Ipsum', type: 'announcement'}
  ]

  constructor (private _route: ActivatedRoute, private _theme: ThemeService) { }

  ionViewWillEnter(): void {
    this._route.paramMap.subscribe(params => {
      console.log(params.get('id'))
      this._theme.setClassThemeID(params.get('id'));
    });
  }

  ionViewWillLeave(): void {
    if (this._routerSubscription) {
      this._routerSubscription.unsubscribe();
    }

    this._theme.setClassThemeID(null);
  }

  getHref(): string {
    return window.location.href;
  }

  getClassThemeID(): string | null {
    return this._theme.getClassThemeID();
  }
}
