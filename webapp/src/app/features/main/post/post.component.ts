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
    title: 'CARIOTIPUL UMAN PATOLOGIC',
    content: `vă rog să parcurgeti materialul atașat și să rezolvați, pe caiete, exercitiile I, II, si III din primul test.
    Atașati poza cu rezolvarea pana la sfarsitul zilei de luni, 27.03. 
    Sa aveti spor!`,
    attachments: ['document.docx', 'spr.xlsx'],
    comments: [{
      author: 'Cazacu Matei',
      date: '12:30, 12.12.2023',
      content: `Putem să facem un proiect în schimbul exercițiilor?`
    }, {
      author: 'Lia Liana Oteleanu',
      date: '12:35, 12.12.2023',
      content: 'Desigur, poți face un proiect despre plante.'
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
