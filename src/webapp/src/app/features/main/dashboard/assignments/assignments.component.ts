import { Component } from '@angular/core';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent {
  getHref(){
    return window.location.href;
  }

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

  titles = ["This week", "Next week", "Later"];
}
