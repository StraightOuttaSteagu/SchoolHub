import { Component } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent {
  data: any = [
    {
      title: 'Limba si Literatura Romana',
      attendance: [
        {
          date: '17.05.2023',
          excused: true,
        },
        {
          date: '17.05.2023',
          excused: true
        },
        {
          date: '17.05.2023',
          excused: true
        },
        {
          date: '17.05.2023',
          excused: false
        },
        {
          date: '17.05.2023',
          excused: true,
        },
        {
          date: '17.05.2023',
          excused: true
        },
        {
          date: '17.05.2023',
          excused: true
        },
        {
          date: '17.05.2023',
          excused: false
        },
        {
          date: '17.05.2023',
          excused: false
        },
        {
          date: '17.05.2023',
          excused: true,
        },
        {
          date: '17.05.2023',
          excused: true
        },
        {
          date: '17.05.2023',
          excused: true
        },
        {
          date: '17.05.2023',
          excused: false
        },
        {
          date: '17.05.2023',
          excused: false
        },
        {
          date: '17.05.2023',
          excused: true,
        },
        {
          date: '17.05.2023',
          excused: true
        },
        {
          date: '17.05.2023',
          excused: true
        },
        {
          date: '17.05.2023',
          excused: false
        }
      ]
    },
    {
      title: 'Biologie',
      attendance: [
        {
          date: '17.05.2023',
          excused: true
        }
      ]
    },
    {
      title: 'Biologie',
      attendance: [
        {
          date: '17.05.2023',
          excused: false
        }
      ]
    },
    {
      title: 'Biologie',
      attendance: [
        {
          date: '17.05.2023',
          excused: true
        }
      ]
    },
    {
      title: 'Biologie',
      attendance: [
        {
          date: '17.05.2023',
          excused: false
        }
      ]
    },
    {
      title: 'Biologie',
      attendance: [
        {
          date: '17.05.2023',
          excused: true
        }
      ]
    },
    {
      title: 'Biologie',
      attendance: [
        {
          date: '17.05.2023',
          excused: false
        }
      ]
    }
  ];
}
