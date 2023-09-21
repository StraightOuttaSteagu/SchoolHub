import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {

  mode: 'assigned' | 'missing' | 'done' = 'assigned';

  data: any = {
    missing: [
      {
        title: "This week",
        data: [
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done'
          },
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done'
          }
        ]
      },
      {
        title: "Last week",
        data: [
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done'
          },
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done'
          }
        ]
      },
      {
        title: "Other",
        data: [
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done'
          },
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done'
          }
        ]
      }
    ],
    assigned: [
      {
        title: "This week",
        data: [
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done'
          },
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done'
          }
        ]
      },
      {
        title: "Next week",
        data: [
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done'
          },
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done'
          }
        ]
      },
      {
        title: "Later",
        data: [
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done'
          },
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done'
          }
        ]
      },
      {
        title: "No due date",
        data: [
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done'
          },
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done'
          }
        ]
      }
    ],
    done: [
      {
        title: "This week",
        data: [
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done'
          },
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done'
          }
        ]
      },
      {
        title: "Last week",
        data: [
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done'
          },
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done'
          }
        ]
      },
      {
        title: "Other",
        data: [
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done'
          },
          {
            title: 'Lorem Ipsum',
            dueDate: '15.07.2023',
            createDate: '14.07.2023',
            class: 'Biologie',
            assigned: 'done'
          }
        ]
      }
    ]
  }

  constructor (private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    let mode: string | null = this._route.snapshot.paramMap.get('mode');
    if (mode == 'assigned' || mode == 'missing' || mode == 'done'){
      this.mode = mode;
      return;
    }
    this._router.navigate(['assignments/assigned']);
    this.mode = 'assigned';
  }

  getHref(): string {
    return window.location.href;
  }

  updateMode(): void{
    let value: string = (<HTMLInputElement>document.getElementById('segment')).value;
    if (value == 'assigned' || value == 'missing' || value == 'done'){
      this.mode = value;
    }
  }
}
