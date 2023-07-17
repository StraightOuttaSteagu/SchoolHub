import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-line-logo',
  templateUrl: './line-logo.component.html',
  styleUrls: ['./line-logo.component.scss']
})
export class LineLogoComponent {
  @Input() h: string = '100px';
}
