import { Component } from '@angular/core';

@Component({
  selector: 'app-missing',
  templateUrl: './missing.component.html',
  styleUrls: ['../assignment-type.scss']
})
export class MissingComponent {
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
