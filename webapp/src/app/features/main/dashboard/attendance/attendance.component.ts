import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DashboardState } from 'src/app/core/state-management/dashboard/dashboard.state';
import { AbsenceModel } from 'src/app/core/state-management/models';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent {
  @Select(DashboardState.selectAnnouncements) attendance$!: Observable<AbsenceModel[]>;
}


/**
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
 */