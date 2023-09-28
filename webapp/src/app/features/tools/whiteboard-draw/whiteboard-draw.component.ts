import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-whiteboard-draw',
  templateUrl: './whiteboard-draw.component.html',
  styleUrls: ['./whiteboard-draw.component.scss']
})
export class WhiteboardDrawComponent {

  paths: any[] = [];

  private _bufferSize: number = 12; // Smoothness

  private _pt!: SVGPoint;

  private _buffer: any[] = [];

  private _strPath: string = "";

  private _drawing: boolean = false;

  private _dragging: boolean = false;

  lines: { x1: number, y1: number, x2: number, y2: number }[] = [];

  line: { x1: number, y1: number, x2: number, y2: number } = { x1: -100, y1: -100, x2: -100, y2: -100 };

  private _initRect: { x: number, y: number } = { x: 0, y: 0 };

  private _initEll: { x: number, y: number } = { x: 0, y: 0 };

  private _initDrag: { x: number, y: number } = { x: 0, y: 0 };

  rect: { x: number, y: number, width: number, height: number } = { x: -100, y: -100, width: 0, height: 0 };

  rects: { x: number, y: number, width: number, height: number }[] = [];

  ell: { x: number, y: number, width: number, height: number } = { x: -100, y: -100, width: 0, height: 0 };

  ells: { x: number, y: number, width: number, height: number }[] = [];

  drawingMode: string = 'pen';

  viewOffset: { x: number, y: number } = { x: 0, y: 0 };

  previousOffset: { x: number, y: number } = { x: 0, y: 0 };

  zoom: number = 1;
  
  ngOnInit(): void {
    this._pt = (document.getElementById('canvas') as unknown as SVGSVGElement).createSVGPoint();
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event: any) {
    event.preventDefault();
  }

  zooming(event: any) {
    if (this.zoom + .2 * event.deltaY / 100 > 0 && this.zoom + .2 * event.deltaY / 100 < 10) {
      this.zoom += .2 * event.deltaY / 100;
    }
  }

  canvasMouseDown(e: any): void {
    if (e.button === 0) {
      switch(this.drawingMode) {
        case 'pen':
          this.drawPen(e);
          break;
  
        case 'line':
          this.drawLine(e);
          break;
  
        case 'rect':
          this.drawRect(e);
          break;
  
        case 'ell':
          this.drawEll(e);
          break;
      }
      this._drawing = true;
    } else if (e.button === 1) {
      this.updatePt(e);

      let eventX = this._pt.x, eventY = this._pt.y;

      this._dragging = true;

      this.previousOffset = {
        x: this.viewOffset.x,
        y: this.viewOffset.y
      };

      this._initDrag = {
        x: e.clientX * this.zoom,
        y: e.clientY * this.zoom
      };
    } else {
      this.zoom += .2;
    }
  }

  drawLine(e: any): void {
    this.updatePt(e);

    let eventX = this._pt.x, eventY = this._pt.y;

    this.line = {
      x1: eventX,
      y1: eventY,
      x2: eventX,
      y2: eventY
    };
  }

  drawPen(e: any): void {
    this.updatePt(e);

    let eventX = this._pt.x, eventY = this._pt.y;

    this._buffer = [];

    this.appendToBuffer({
      x: eventX,
      y: eventY
    });

    this._strPath = "M" + eventX + " " + eventY;

    this.paths.push(this._strPath);
  }

  drawRect(e: any): void {
    this.updatePt(e);

    let eventX = this._pt.x, eventY = this._pt.y;

    this.rect = {
      x: eventX,
      y: eventY,
      width: eventX,
      height: eventY
    };

    this._initRect = { x: eventX, y: eventY };
  }

  drawEll(e: any): void {
    this.updatePt(e);

    let eventX = this._pt.x, eventY = this._pt.y;

    this.ell = {
      x: eventX,
      y: eventY,
      width: eventX,
      height: eventY
    };

    this._initEll = { x: eventX, y: eventY };
  }

  canvasMouseUp(e: any): void {
    this._drawing = false;
    this._dragging = false;

    switch (this.drawingMode) {
      case 'pen':
        break;

      case 'line':
        this.lines.push({
          x1: this.line.x1,
          y1: this.line.y1,
          x2: this.line.x2,
          y2: this.line.y2
        });

        this.line = { x1: -100, y1: -100, x2: -100, y2: -100 };

        break;

      case 'rect':
        this.rects.push({
          x: this.rect.x,
          y: this.rect.y,
          width: this.rect.width,
          height: this.rect.height
        });

        this.rect = { x: -100, y: -100, width: 0, height: 0 };
        this._initRect = { x: -100, y: -100 }

        break;

      case 'ell':
        this.ells.push({
          x: this.ell.x,
          y: this.ell.y,
          width: this.ell.width,
          height: this.ell.height
        });

        this.ell = { x: -100, y: -100, width: 0, height: 0 };
        this._initEll = { x: -100, y: -100 }

        break;
    }
  }

  canvasMouseMove(e: any): void {
    if (this._dragging) {
      this.updatePt(e);

      let eventX = this._pt.x, eventY = this._pt.y;
      console.log(eventX)

      this.viewOffset.x -= e.clientX * this.zoom - this._initDrag.x;
      this.viewOffset.y -= e.clientY * this.zoom - this._initDrag.y;

      this._initDrag.x = e.clientX * this.zoom, this._initDrag.y = e.clientY * this.zoom;
      
      return;
    }

    if (this._drawing) {
      this.updatePt(e);

      let eventX = this._pt.x, eventY = this._pt.y;

      switch (this.drawingMode) {
        case 'pen':
          this.appendToBuffer({
            x: eventX,
            y: eventY
          });

          this.updatePath();

          break;

        case 'line':
          this.line.x2 = eventX, this.line.y2 = eventY;

          break;

        case 'rect':
          this.rect = {
            x: Math.min(this._initRect.x, eventX),
            y: Math.min(this._initRect.y, eventY),
            width: Math.abs(this._initRect.x - eventX),
            height: Math.abs(this._initRect.y - eventY)
          }

          break;

        case 'ell':
          this.ell = {
            x: Math.min(this._initEll.x, eventX),
            y: Math.min(this._initEll.y, eventY),
            width: Math.abs(this._initEll.x - eventX),
            height: Math.abs(this._initEll.y - eventY)
          }

          break;
      }
    }
  }

  appendToBuffer(pt: { x: number, y: number }): void {
    this._buffer.push(pt);
    while (this._buffer.length > this._bufferSize) {
        this._buffer.shift();
    }
  }

  updatePath(): void {
    let pt = this.getAveragePoint(0);

    if (pt) {
      this._strPath += " L" + pt.x + " " + pt.y;

      var tmpPath = "";
      for (var offset = 2; offset < this._buffer.length; offset += 2) {
        pt = this.getAveragePoint(offset)!;
        tmpPath += " L" + pt.x + " " + pt.y;
      }

      this.paths[this.paths.length - 1] = this._strPath + tmpPath;
    }
  }

  getAveragePoint(offset: number): { x: number, y: number } | null {
    var len = this._buffer.length;
    if (len % 2 === 1 || len >= this._bufferSize) {
      var totalX = 0;
      var totalY = 0;
      var pt, i;
      var count = 0;
      for (i = offset; i < len; i++) {
        count++;
        pt = this._buffer[i];
        totalX += pt.x;
        totalY += pt.y;
      }
      return {
        x: totalX / count,
        y: totalY / count
      }
    }

    return null;
  }

  updatePt(e: any): any {
    this._pt.x = e.clientX; this._pt.y = e.clientY;
    this._pt = this._pt.matrixTransform((document.getElementById('canvas') as any).getScreenCTM().inverse());  
	}
}
