import { Component, OnInit } from '@angular/core';
import { CollapseAnimationFade } from '../../../../../shared/animations';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss'],
  animations: [CollapseAnimationFade]
})
export class AssignmentsComponent implements OnInit {
  thisWeekCollapsed: boolean = true;
  nextWeekCollapsed: boolean = false;
  laterCollapsed: boolean = false;
  noDueDateCollapsed: boolean = false;

  activeFilter: 'assigned' | 'missing' | 'done' = 'assigned';

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

  ngOnInit() {

  }
}
