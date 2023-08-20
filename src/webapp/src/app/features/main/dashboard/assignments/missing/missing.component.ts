import { Component } from '@angular/core';
import { CollapseAnimationFade } from 'src/app/shared/animations';

@Component({
  selector: 'app-missing',
  templateUrl: './missing.component.html',
  styleUrls: ['./missing.component.scss'],
  animations: [CollapseAnimationFade]
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
