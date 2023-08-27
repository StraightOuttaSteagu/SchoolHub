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

  data: any[] = [
    { title: 'Lorem ipsum', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies scelerisque nisi vitae dignissim. Maecenas auctor quam nec convallis consequat. Pellentesque pellentesque efficitur volutpat. In neque tellus, convallis sit amet leo sit amet, mattis fringilla mi. Suspendisse vel pharetra erat, non condimentum diam. ', attachments_num: 3, comments_num: 1, date: '16.09.2023, 12:09', type: 'announcement'},
    { title: 'Lorem ipsum dolor sit amet', content: 'Lorem Ipsum', attachments_num: 3, comments_num: 1, date: '16.09.2023, 21:30', due_date: '17.09.2023, 21:20', type: 'assignment'},
    { grade: '10', date: '6.09.2023', type: 'grade'},
    { date: '6.09.2023', excused: false, type: 'absence'},
    { title: 'Lorem ipsum', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies scelerisque nisi vitae dignissim. Maecenas auctor quam nec convallis consequat. Pellentesque pellentesque efficitur volutpat. In neque tellus, convallis sit amet leo sit amet, mattis fringilla mi. Suspendisse vel pharetra erat, non condimentum diam. ', attachments_num: 3, comments_num: 1, date: '16.09.2023, 12:09', type: 'announcement'},
    { title: 'Lorem ipsum dolor sit amet', content: 'Lorem Ipsum', attachments_num: 3, comments_num: 1, date: '16.09.2023, 21:30', due_date: '17.09.2023, 21:20', type: 'assignment'},
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
