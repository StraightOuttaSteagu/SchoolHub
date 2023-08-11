import { Component } from '@angular/core';
import { CollapseAnimationFade } from 'src/app/shared/animations';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss'],
  animations: [CollapseAnimationFade]
})
export class DoneComponent {
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
