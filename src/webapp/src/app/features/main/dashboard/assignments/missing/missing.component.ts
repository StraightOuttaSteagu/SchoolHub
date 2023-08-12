import { Component } from '@angular/core';
import { CollapseAnimationFade } from 'src/app/shared/animations';

@Component({
  selector: 'app-missing',
  templateUrl: './missing.component.html',
  styleUrls: ['./missing.component.scss'],
  animations: [CollapseAnimationFade]
})
export class MissingComponent {
  thisWeekCollapsed: boolean = true;
  nextWeekCollapsed: boolean = false;
  laterCollapsed: boolean = false;
  noDueDateCollapsed: boolean = false;

  data = [
    {
      title: 'Lorem Ipsum',
      dueDate: '15.07.2023',
      createDate: '14.07.2023',
      class: 'Biologie',
      assigned: 'assigned'
    },
    {
      title: 'Lorem Ipsum',
      dueDate: '15.07.2023',
      createDate: '14.07.2023',
      class: 'Biologie',
      assigned: 'missing'
    },
    {
      title: 'Lorem Ipsum',
      dueDate: '15.07.2023',
      createDate: '14.07.2023',
      class: 'Biologie',
      assigned: 'done'
    }
  ];
}