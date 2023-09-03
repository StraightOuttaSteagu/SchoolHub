import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, ViewDidEnter, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements ViewWillEnter, ViewWillLeave, ViewDidEnter {
  // The HTML for the classes will remain the same and the route will act as a filter that selects only some of the fields

  private _routerSubscription!: Subscription;

  data: any[] = [
    { title: 'Lorem ipsum', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies scelerisque nisi vitae dignissim. Maecenas auctor quam nec convallis consequat. Pellentesque pellentesque efficitur volutpat. In neque tellus, convallis sit amet leo sit amet, mattis fringilla mi. Suspendisse vel pharetra erat, non condimentum diam. ', attachments_num: 3, comments_num: 1, date: '16.09.2023, 12:09', type: 'announcements'},
    { title: 'Lorem ipsum dolor sit amet', content: 'Lorem Ipsum', attachments_num: 3, comments_num: 1, date: '16.09.2023, 21:30', due_date: '17.09.2023, 21:20', type: 'assignments'},
    { grade: '10', date: '6.09.2023', type: 'grades'},
    { date: '6.09.2023', excused: false, type: 'attendance'},
    { title: 'Lorem ipsum', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies scelerisque nisi vitae dignissim. Maecenas auctor quam nec convallis consequat. Pellentesque pellentesque efficitur volutpat. In neque tellus, convallis sit amet leo sit amet, mattis fringilla mi. Suspendisse vel pharetra erat, non condimentum diam. ', attachments_num: 3, comments_num: 1, date: '16.09.2023, 12:09', type: 'announcements'},
    { title: 'Lorem ipsum dolor sit amet', content: 'Lorem Ipsum', attachments_num: 3, comments_num: 1, date: '16.09.2023, 21:30', due_date: '17.09.2023, 21:20', type: 'assignments'},
  ]

  filteredData: any = [
    { title: 'Lorem ipsum', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies scelerisque nisi vitae dignissim. Maecenas auctor quam nec convallis consequat. Pellentesque pellentesque efficitur volutpat. In neque tellus, convallis sit amet leo sit amet, mattis fringilla mi. Suspendisse vel pharetra erat, non condimentum diam. ', attachments_num: 3, comments_num: 1, date: '16.09.2023, 12:09', type: 'announcements'},
    { title: 'Lorem ipsum dolor sit amet', content: 'Lorem Ipsum', attachments_num: 3, comments_num: 1, date: '16.09.2023, 21:30', due_date: '17.09.2023, 21:20', type: 'assignments'},

  ];

  constructor (private _route: ActivatedRoute, private _theme: ThemeService, private _menu: MenuController) { }

  ionViewWillEnter(): void {
    this._route.paramMap.subscribe(params => {
      let mode = params.get('mode');

      this.filteredData = mode=='general'?this.data:this.data.filter(el => el.type == mode);
      this._theme.setClassThemeID(params.get('id'));
    });
  }

  ionViewDidEnter(): void {
    this._menu.swipeGesture(false);
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
