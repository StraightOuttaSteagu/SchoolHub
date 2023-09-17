import { Component } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';
import { MenuController, ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements ViewDidEnter {
  data = {
    assignment: true,
    classID: "690",
    postID: "myFirstPost",
    date: '12.12.2023, 11:50',
    dueDate: '14.12.2023, 23:59',
    title: 'Lorem ipsum dolor sit amet',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus fringilla vitae lacus nec malesuada. ' +
      'Morbi nisl nunc, aliquet sodales justo at, hendrerit ornare nisl. Donec malesuada volutpat enim, in faucibus ' +
      'felis pulvinar consequat. Sed congue commodo facilisis. Mauris ultricies enim rhoncus dolor aliquam hendrerit.' +
      'Donec pharetra ex tortor, a aliquet nulla faucibus sed. Proin malesuada ullamcorper ullamcorper. Nunc sit amet ' +
      'ligula vitae orci ultrices rhoncus a at arcu. Cras porttitor eros a imperdiet congue. Nulla est nisl, eleifend ' +
      'eget gravida consectetur, iaculis id libero. Duis a cursus arcu. Mauris egestas ex id venenatis tincidunt. Proin' +
      ' quis interdum nunc.',
    attachments: ['document.docx', 'spr.xlsx'],
    comments: [{
      author: 'Lia Liana Oteleanu',
      date: '12:30, 12.12.2023',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus fringilla vitae lacus nec malesuada. ' +
        'Morbi nisl nunc, aliquet sodales justo at, hendrerit ornare nisl. Donec malesuada volutpat enim, in faucibus '
    }, {
      author: 'Lia Liana Oteleanu',
      date: '12:31, 12.12.2023',
      content: 'idque no euripidis vehicula'
    }],
    uploaded: ['document.txt', 'document foarte extrem de important.txt', 'document.txt', 'document.txt', 'document.txt', 'document.txt']
  }

  constructor (private _theme: ThemeService, private _menu: MenuController) { }

  ngOnInit(): void {
    this._theme.setClassThemeID(this.data.classID);
  }

  ionViewDidEnter(): void {
    this._menu.swipeGesture(false);
  }
}
