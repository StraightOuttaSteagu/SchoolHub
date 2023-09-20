import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss'],
})
export class AssignmentsComponent implements OnInit {
  mode: 'to-review' | 'reviewed' = 'to-review';

  data: any = {
    'to-review': [
      {
        title: 'Work in progress',
        data: [
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done',
          },
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done',
          },
        ],
      },
      {
        title: 'No due date',
        data: [
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done',
          },
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done',
          },
        ],
      },
      {
        title: 'Finished',
        data: [
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done',
          },
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done',
          },
        ],
      },
    ],
    reviewed: [
      {
        title: 'This week',
        data: [
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done',
          },
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done',
          },
        ],
      },
      {
        title: 'Last week',
        data: [
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done',
          },
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done',
          },
        ],
      },
      {
        title: 'Earlier',
        data: [
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done',
          },
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done',
          },
        ],
      },
      {
        title: 'No due date',
        data: [
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done',
          },
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done',
          },
        ],
      },
    ],
  };

  constructor(private _route: ActivatedRoute, private _router: Router) {}

  ngOnInit(): void {
    let mode: string | null = this._route.snapshot.paramMap.get('mode');
    if (mode == 'to-review' || mode == 'reviewed') {
      this.mode = mode;
      return;
    }
    this._router.navigate(['teacher/assignments/to-review']);
    this.mode = 'to-review';
  }

  getHref(): string {
    return window.location.href;
  }

  updateMode(): void {
    let value: string = (<HTMLInputElement>document.getElementById('segment')).value;
    if (value == 'to-review' || value == 'reviewed') {
      this.mode = value;
    }
  }
}
