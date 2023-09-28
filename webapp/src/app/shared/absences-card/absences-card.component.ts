import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-absences-card',
  templateUrl: './absences-card.component.html',
  styleUrls: ['./absences-card.component.scss']
})
export class AbsencesCardComponent {
  @Input() item: any;
}
