import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-grades-accordion',
  templateUrl: './grades-accordion.component.html',
  styleUrls: ['./grades-accordion.component.scss']
})
export class GradesAccordionComponent {
  @Input() item: any;

  calculateAverage(item: any): number {
    let avg = 0;
    for (let grade of item) {
      avg += grade.grade;
    }
    return avg / item.length;
  }
}
