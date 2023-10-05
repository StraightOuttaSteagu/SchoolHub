import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleFormat'
})
export class titleFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (value.includes('announcements')) {
        return "1 new announcement";
    }

    if (value.includes('assignments')) {
        return "No new assignments";
    }

    if (value.includes('grades')) {
        return "Overall average: 10";
    }

    if (value.includes('attendance')) {
        return "3 unexcused absences";
    }

    return "";
  }
}