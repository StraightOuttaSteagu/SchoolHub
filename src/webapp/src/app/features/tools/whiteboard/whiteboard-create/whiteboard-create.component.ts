import { Component } from '@angular/core';

@Component({
  selector: 'app-whiteboard-create',
  templateUrl: './whiteboard-create.component.html',
  styleUrls: ['./whiteboard-create.component.scss']
})
export class WhiteboardCreateComponent {
  canvasMode: boolean = true;

  doubleColor: boolean = false;

  stretchMode: boolean = true;

  color: string | null = null;

  addPunctuation(char: string): void {
    console.log(char);
  }

  glue(): void {
    console.log('glue');
  }

  capitalise(): void {
    console.log('capitalise');
  }

  newPage(): void {
    console.log('new page');
  }

  deletePage(): void {
    console.log('delete page');
  }

  clearPage(): void {
    console.log('clear page');
  }

  saveLesson(): void {
    console.log('save lesson');
    console.log(this.color);
  }

  canvasMouseDown(): void {
    console.log('canvasMouseDown')
  }

  canvasMouseUp(): void {
    console.log('canvasMouseUp')
  }

  canvasMouseMove(): void {
    console.log('canvasMouseMove')
  }

  textMouseDown(): void {
    console.log('textMouseDown')
  }

  textMouseUp(): void {
    console.log('textMouseUp')
  }

  textMouseMove(): void {
    console.log('textMouseMove')
  }
}
