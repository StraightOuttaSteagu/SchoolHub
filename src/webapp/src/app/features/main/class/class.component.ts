import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClassService } from 'src/app/core/services/class.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {
  // The HTML for the classes will remain the same and the route will act as a filter that selects only some of the fields

  private _RouteSubscription: Subscription | undefined;

  data = [
    { content: 'Lorem Ipsum', type: 'announcement'},
    { content: 'Lorem Ipsum', type: 'announcement'},
    { content: 'Lorem Ipsum', type: 'announcement'},
    { content: 'Lorem Ipsum', type: 'announcement'},
    { content: 'Lorem Ipsum', type: 'announcement'},
    { content: 'Lorem Ipsum', type: 'announcement'}
  ]

  constructor (private _route: ActivatedRoute, private _class: ClassService) { }

  ngOnInit(): void {
    this._RouteSubscription = this._route.paramMap
      .subscribe((params: ParamMap) => {
        this._class.setClassID(params.get('id'));
      });
  }

  getType() { 
    console.log(this._route.snapshot.paramMap.get('mode'));
  }

  getClassID(): string | null {
    return this._class.getClassID();
  }

  deleteClassID(): void {
    this._class.setClassID(null);
  }

  ngOnDestroy(): void {
    // Unsubscribe from the route parameter subscription to avoid memory leaks
    if (this._RouteSubscription) {
      this._RouteSubscription.unsubscribe();
    }
  }

  getHref(): string {
    return window.location.href;
  }
}
