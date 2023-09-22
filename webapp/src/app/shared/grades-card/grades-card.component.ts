import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-grades-card',
  templateUrl: './grades-card.component.html',
  styleUrls: ['./grades-card.component.scss']
})
export class GradesCardComponent {
  @Input() item: any;

  calculateAverage(item: any): number {
    let avg = 0;
    for (let grade of item) {
      avg += grade.grade;
    }
    return avg / item.length;
  }
}
