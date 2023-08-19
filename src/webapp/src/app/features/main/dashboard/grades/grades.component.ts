import { Component } from '@angular/core';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})
export class GradesComponent {
  data: any = [
    {
      title: 'Limba si Literatura Romana a pogorului afgan',
      grades: [
        {
          grade: 2,
          date: '17.05.2023'
        },
        {
          grade: 10,
          date: '17.05.2023'
        },
        {
          grade: 4,
          date: '17.05.2023'
        },
        {
          grade: 3,
          date: '17.05.2023'
        },
        {
          grade: 2,
          date: '17.05.2023'
        },
        {
          grade: 10,
          date: '17.05.2023'
        },
        {
          grade: 4,
          date: '17.05.2023'
        },
        {
          grade: 3,
          date: '17.05.2023'
        },
        {
          grade: 2,
          date: '17.05.2023'
        },
        {
          grade: 10,
          date: '17.05.2023'
        },
        {
          grade: 4,
          date: '17.05.2023'
        },
        {
          grade: 3,
          date: '17.05.2023'
        }
      ]
    },
    {
      title: 'Bioloiie',
      grades: [
        {
          grade: 10,
          date: '17.05.2023'
        }
      ]
    },
    {
      title: 'Biologie',
      grades: [
        {
          grade: 10,
          date: '17.05.2023'
        }
      ]
    },
    {
      title: 'Biologie',
      grades: [
        {
          grade: 10,
          date: '17.05.2023'
        }
      ]
    },
    {
      title: 'Biologie',
      grades: [
        {
          grade: 10,
          date: '17.05.2023'
        }
      ]
    },
    {
      title: 'Biologie',
      grades: [
        {
          grade: 10,
          date: '17.05.2023'
        }
      ]
    },
    {
      title: 'Biologie',
      grades: [
        {
          grade: 10,
          date: '17.05.2023'
        }
      ]
    },
    {
      title: 'Biologie',
      grades: [
        {
          grade: 10,
          date: '17.05.2023'
        }
      ]
    },
    {
      title: 'Biologie',
      grades: [
        {
          grade: 10,
          date: '17.05.2023'
        }
      ]
    },
    {
      title: 'Biologie',
      grades: [
        {
          grade: 10,
          date: '17.05.2023'
        }
      ]
    },
    {
      title: 'Biologie',
      grades: [
        {
          grade: 10,
          date: '17.05.2023'
        }
      ]
    },
    {
      title: 'Biologie',
      grades: [
        {
          grade: 10,
          date: '17.05.2023'
        }
      ]
    },
    {
      title: 'Educatie plastica',
      grades: [
        {
          grade: 10,
          date: '17.05.2023'
        }
      ]
    },
  ];

  calculateAverage(item: any): number {
    let avg = 0;
    for (let grade of item) {
      avg += grade.grade;
    }
    return avg / item.length;
  }
}

