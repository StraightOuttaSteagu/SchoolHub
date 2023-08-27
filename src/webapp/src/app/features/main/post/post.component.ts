import { Component } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  data = {
    assignment: true,
    classID: "690"
  }

  constructor (private _theme: ThemeService) { }

  ngOnInit(): void {
    this._theme.setClassThemeID(this.data.classID);
  }
}
