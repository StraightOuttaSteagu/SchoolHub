import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DashboardState } from 'src/app/core/state-management/dashboard/dashboard.state';
import { GradeModel } from 'src/app/core/state-management/models';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})
export class GradesComponent {
  @Select(DashboardState.selectGrades) grades$!: Observable<GradeModel[]>;

  calculateAverage(item: any): number {
    let avg = 0;
    for (let grade of item) {
      avg += grade.grade;
    }
    return avg / item.length;
  }
}

/**
 {
      title: 'Limba și literatura română',
      grades: [
        {
          grade: 10,
          date: '17.05.2023'
        },
        {
          grade: 9,
          date: '18.05.2023'
        },
        {
          grade: 7,
          date: '20.05.2023'
        }
      ]
    },
    {
      title: 'Matematică',
      grades: [
        {
          grade: 10,
          date: '20.09.2023'
        }
      ]
    },
    {
      title: 'Biologie',
      grades: [
        {
          grade: 7,
          date: '15.11.2022'
        },
        {
          grade: 9,
          date: '25.03.2023'
        }
      ]
    },
    {
      title: 'Geografie',
      grades: [
        {
          grade: 10,
          date: '18.06.2023'
        },
        {
          grade: 2,
          date: '12.09.2023'
        },
        {
          grade: 9,
          date: '05.05.2023'
        }
      ]
    },
    {
      title: 'Engleză',
      grades: [
        {
          grade: 10,
          date: '17.05.2023'
        },
        {
          grade: 9,
          date: '18.05.2023'
        },
        {
          grade: 7,
          date: '20.05.2023'
        }
      ]
    },
    {
      title: 'Matematică',
      grades: [
        {
          grade: 10,
          date: '20.09.2023'
        }
      ]
    },
    {
      title: 'Biologie',
      grades: [
        {
          grade: 7,
          date: '15.11.2022'
        },
        {
          grade: 9,
          date: '25.03.2023'
        }
      ]
    },
    {
      title: 'Chimie',
      grades: [
        {
          grade: 10,
          date: '18.06.2023'
        },
        {
          grade: 2,
          date: '12.09.2023'
        },
        {
          grade: 9,
          date: '05.05.2023'
        }
      ]
    },
    {
      title: 'Sport',
      grades: [
        {
          grade: 10,
          date: '17.05.2023'
        },
        {
          grade: 9,
          date: '18.05.2023'
        },
        {
          grade: 7,
          date: '20.05.2023'
        }
      ]
    },
    {
      title: 'Fizică',
      grades: [
        {
          grade: 10,
          date: '20.09.2023'
        }
      ]
    },
    {
      title: 'Logică',
      grades: [
        {
          grade: 7,
          date: '15.11.2022'
        },
        {
          grade: 9,
          date: '25.03.2023'
        }
      ]
    },
    {
      title: 'Filozofie',
      grades: [
        {
          grade: 10,
          date: '18.06.2023'
        },
        {
          grade: 2,
          date: '12.09.2023'
        },
        {
          grade: 9,
          date: '05.05.2023'
        }
      ]
    }
 */