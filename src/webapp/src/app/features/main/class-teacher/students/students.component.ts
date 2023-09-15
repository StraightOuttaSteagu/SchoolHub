import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
  activeStudent: any;
  data: any = [
    {
      name: 'Ion Glanetasu',
      grades: [
        {
          grade: 10,
          date: '12.12.2023'
        },
        {
          grade: 10,
          date: '12.12.2023'
        },
        {
          grade: 10,
          date: '12.12.2023'
        },
        {
          grade: 10,
          date: '12.12.2023'
        },
        {
          grade: 10,
          date: '12.12.2023'
        },
        {
          grade: 10,
          date: '12.12.2023'
        },
        {
          grade: 10,
          date: '12.12.2023'
        },
        {
          grade: 10,
          date: '12.12.2023'
        },
        {
          grade: 10,
          date: '12.12.2023'
        },
      ],
      absences: [
        {
          date: '12.12.2023',
          excused: false
        },
        {
          date: '12.12.2023',
          excused: true
        },
      ],
      percentage: 100,
    },
    {
      name: 'Ion Glanetasu',
      grades: [
        {
          grade: 10,
          date: '12.12.2023'
        },
        {
          grade: 10,
          date: '12.12.2023'
        },
        {
          grade: 10,
          date: '12.12.2023'
        },
      ],
      absences: [
        {
          date: '12.12.2023',
          excused: false
        },
        {
          date: '12.12.2023',
          excused: false
        },
      ],
      percentage: 100,
    },
    {
      name: 'Ion Glanetasu',
      grades: [
        {
          grade: 10,
          date: '12.12.2023'
        },
        {
          grade: 10,
          date: '12.12.2023'
        },
        {
          grade: 10,
          date: '12.12.2023'
        },
      ],
      absences: [
        {
          date: '12.12.2023',
          excused: false
        },
        {
          date: '12.12.2023',
          excused: false
        },
      ],
      percentage: 100,
    },
    {
      name: 'Ion Glanetasu',
      grades: [
        {
          grade: 10,
          date: '12.12.2023'
        },
        {
          grade: 10,
          date: '12.12.2023'
        },
        {
          grade: 10,
          date: '12.12.2023'
        },
      ],
      absences: [
        {
          date: '12.12.2023',
          excused: false
        },
        {
          date: '12.12.2023',
          excused: false
        },
      ],
      percentage: 100,
    },
    {
      name: 'Ion Glanetasu',
      grades: [
        {
          grade: 10,
          date: '12.12.2023'
        },
        {
          grade: 10,
          date: '12.12.2023'
        },
        {
          grade: 10,
          date: '12.12.2023'
        },
      ],
      absences: [
        {
          date: '12.12.2023',
          excused: false
        },
        {
          date: '12.12.2023',
          excused: false
        },
      ],
      percentage: 100,
    },
    {
      name: 'Ion Glanetasu',
      grades: [
        {
          grade: 10,
          date: '12.12.2023'
        },
        {
          grade: 10,
          date: '12.12.2023'
        },
        {
          grade: 10,
          date: '12.12.2023'
        },
      ],
      absences: [
        {
          date: '12.12.2023',
          excused: false
        },
        {
          date: '12.12.2023',
          excused: false
        },
      ],
      percentage: 100,
    },
    {
      name: 'Ion Glanetasu',
      grades: [
        {
          grade: 10,
          date: '12.12.2023'
        },
        {
          grade: 10,
          date: '12.12.2023'
        },
        {
          grade: 10,
          date: '12.12.2023'
        },
      ],
      absences: [
        {
          date: '12.12.2023',
          excused: false
        },
        {
          date: '12.12.2023',
          excused: false
        },
      ],
      percentage: 100,
    },
  ];
  gradePickerColumns = [
    {
      name: 'grade',
      options: [
        {
          text: '10',
          value: '10',
        },
        {
          text: '9',
          value: '9',
        },
        {
          text: '8',
          value: '8',
        },
        {
          text: '7',
          value: '7',
        },
        {
          text: '6',
          value: '6',
        },
        {
          text: '5',
          value: '5',
        },
        {
          text: '4',
          value: '4',
        },
        {
          text: '3',
          value: '3',
        },
        {
          text: '2',
          value: '2',
        },
        {
          text: '1',
          value: '1',
        },
      ],
    },
  ];
  currentGrade = '10';
  gradePickerButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Confirm',
      handler: (value: any) => {
        this.currentGrade = value.grade.value;
      },
    },
  ];
  protected readonly document = document;

  constructor(private _modal: ModalController) {
  }

  getOverallAverage(student: any): string {
    let average: number = 0;
    for (let grade of student.grades) {
      average += grade.grade;
    }
    average /= student.grades.length;
    return average.toFixed(2);
  }

  setActiveStudent(student: any) {
    this.activeStudent = student;
  }
}
