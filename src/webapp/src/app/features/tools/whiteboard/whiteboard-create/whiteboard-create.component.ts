import { Component } from '@angular/core';

@Component({
  selector: 'app-whiteboard-create',
  templateUrl: './whiteboard-create.component.html',
  styleUrls: ['./whiteboard-create.component.scss']
})
export class WhiteboardCreateComponent {
  makerMode: 'canvas' | 'text' = 'canvas';
  private _color: string | null = null;

  getColor(): string | null {
    return this._color;
  }

  setColor(color: string | null): void {
    this._color = color;
  }
}
