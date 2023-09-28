import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-absences-accordion',
  templateUrl: './absences-accordion.component.html',
  styleUrls: ['./absences-accordion.component.scss']
})
export class AbsencesAccordionComponent {
  @Input() item: any;
}
