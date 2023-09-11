import { Injectable } from '@angular/core';
import { wordObject } from "./objects";
import { MathService } from './math.service';

@Injectable({
  providedIn: 'root'
})
export class ElementCalculationsService {

  constructor (private _math: MathService) { }

  getSize(text: string, modifier: number = 64): number {
    let measure = document.getElementById('measure') as HTMLElement;
		measure.innerHTML = text;
		return + (measure.clientWidth + 1) * modifier / 32; //To get Y value, use +(measure.clientHeight + 1)*modifier/64 (or 25, idk)
	}

  getPathLength(index: number): number {
    return (document.querySelector(`#p${index}`) as SVGPathElement).getTotalLength();
  }
  
  updateClipPath(word: wordObject): void {
    let radius = this._math.pyth(word.startX + word.endX, word.startY + word.endY, word.startX, word.startY),
      ang = -this._math.angFromPoint(word.startX, word.startY, word.startX + word.endX, word.startY + word.endY),
      ang2 = -this._math.angFromPoint(word.startX + word.endX, word.startY + word.endY, word.startX, word.startY);

    word.temp = {
      clipLine0X: this._math.xFromAng(word.startX, radius*2, ang),
      clipLine0Y: this._math.yFromAng(word.startY, radius*2,ang),
      clipLine1X: this._math.xFromAng(word.startX, radius, ang + Math.PI/4),
      clipLine1Y: this._math.yFromAng(word.startY, radius, ang + Math.PI/4),
      clipLine2X: this._math.xFromAng(word.startX + word.endX,radius*2, ang2),
      clipLine2Y: this._math.yFromAng(word.startY + word.endY,radius*2, ang2)
    }
  }

  updateMove(word: wordObject, eventX: number, eventY: number, details: { x: number, y: number}): void {
    word.startX += eventX - details.x;
    word.startY += eventY - details.y;

    details.x = eventX, details.y = eventY;

    this.updateClipPath(word);
  }

  updateBend(word: wordObject, eventX: number, eventY: number): void {
    let mid = [word.endX/2, word.endY/2], radius = this._math.pyth(word.endX, word.endY, 0, 0)/1.5;

    if (this._math.pyth(mid[0], mid[1], eventX - word.startX, eventY - word.startY) < radius){
      word.focusX = eventX - word.startX, word.focusY = eventY - word.startY;
    } else {
      let ang = this._math.angFromPoint(mid[0], mid[1], eventX - word.startX, eventY - word.startY);
      word.focusX = this._math.xFromAng(mid[0], radius, ang), word.focusY = this._math.yFromAng(mid[1], radius, -ang);
    }

    this.updateClipPath(word);
  }

  updateStretch(word: wordObject, scale: boolean, eventX: number, eventY: number, details: { length: number, angle: number }): void { //{ focusX: number, focusY: number, endX: number, endY: number }
    let s = this.getSize(word.content, !scale?word.fontSize:64)/2;

    if (isNaN(s)) {
      s = this.getSize(word.content, 32);
    }

    if (this._math.pyth(word.startX, word.startY, eventX, eventY) > s){
      word.endX = eventX - word.startX, word.endY = eventY - word.startY;
    } else {
      let ang = -this._math.angFromPoint(word.startX, word.startY, eventX, eventY);
      word.endX = this._math.xFromAng(0, s, ang), word.endY = this._math.yFromAng(0, s, ang);
    }

    let d = this._math.pyth(0, 0, word.endX, word.endY), ang = -this._math.angFromPoint(0, 0, word.endX, word.endY) + details.angle;
    word.focusX = this._math.xFromAng(0, details.length * d, ang);
    word.focusY = this._math.yFromAng(0, details.length * d, ang);

    if (scale){
      word.fontSize = this._math.pyth(0, 0, word.endX, word.endY) / s * 64;
    }

    this.updateClipPath(word);
  }

  stretchAngle(word: wordObject): number {
    return this._math.angFromPoint(0, 0, word.endX, word.endY) - this._math.angFromPoint(0, 0, word.focusX, word.focusY);
  }

  stretchLength(word: wordObject): number {
    return Math.sqrt((word.focusX ** 2 + word.focusY ** 2) / (word.endX ** 2 + word.endY ** 2));
  }

  updateSelectBox(eventX: number, eventY: number, details: { x: number, y: number }): { x: number, y: number, width: number, height: number } {
    return {
      x: Math.min(details.x, eventX),
      y: Math.min(details.y, eventY),
      width: Math.abs(details.x - eventX),
      height: Math.abs(details.y - eventY)
    }
  }

  updateGroupMove(eventX: number, eventY: number, details: {x: number, y: number, targets: wordObject[]}): void {
    for (let word of <wordObject[]>details.targets) {
      word.startX = word.startX + eventX - details.x;
      word.startY = word.startY + eventY - details.y;

      this.updateClipPath(word);
    }

    details.x = eventX,
    details.y = eventY
  }

  updateGroupRotate(eventX: number, eventY: number, details: {x: number, y: number, distances: {startDistance: number, focusDistance: number, endDistance: number}[], angles: {startAngle: number, focusAngle: number, endAngle: number}[], targets: wordObject[]}, rotationCircleThumb: {x: number, y: number}): void {
    let ang = -this._math.angFromPoint(details.x, details.y, eventX, eventY);
    rotationCircleThumb.x = this._math.xFromAng(details.x, 60, ang);
    rotationCircleThumb.y = this._math.yFromAng(details.y, 60, ang);

    ang += Math.PI/2;

    details.targets.forEach((word, index) => {
      let x = this._math.xFromAng(details.x, details.distances[index].startDistance, details.angles[index].startAngle + ang), y = this._math.yFromAng(details.y, details.distances[index].startDistance, details.angles[index].startAngle + ang);
      
      word.startX = x,
      word.startY = y,
      word.focusX = this._math.xFromAng(details.x, details.distances[index].focusDistance, details.angles[index].focusAngle + ang) - x,
      word.focusY = this._math.yFromAng(details.y, details.distances[index].focusDistance, details.angles[index].focusAngle + ang) - y,
      word.endX = this._math.xFromAng(details.x, details.distances[index].endDistance, details.angles[index].endAngle + ang) - x,
      word.endY = this._math.yFromAng(details.y, details.distances[index].endDistance, details.angles[index].endAngle + ang) - y
      
      this.updateClipPath(word);
    });
  }

  groupRotateDistances(initX: number, initY: number, words: wordObject[]): {startDistance: number, focusDistance: number, endDistance: number}[] {
    return words.map(word =>
      ({
        startDistance: this._math.pyth(initX, initY, word.startX, word.startY),
        focusDistance: this._math.pyth(initX, initY, word.startX + word.focusX, word.startY + word.focusY),
        endDistance: this._math.pyth(initX, initY, word.startX + word.endX, word.startY + word.endY)
      })
    );
  }

  groupRotateAngles(initX: number, initY: number, words: wordObject[]): {startAngle: number, focusAngle: number, endAngle: number}[] {
    return words.map(word => 
      ({
        startAngle: -this._math.angFromPoint(initX, initY, word.startX, word.startY),
        focusAngle: -this._math.angFromPoint(initX, initY, word.startX + word.focusX, word.startY + word.focusY),
        endAngle: -this._math.angFromPoint(initX, initY, word.startX + word.endX, word.startY + word.endY)
      })
    );
  }

  updateGroupSize(eventX: number, details: {x: number, y: number, angle: number, distance: number, length: number, origins: {startX: number, startY: number, focusX: number, focusY: number, endX: number, endY: number, fontSize: number}[], targets: wordObject[]}, scaleThumb: {x: number, y: number}): void {
    let radius = details.distance + (eventX - details.length) / Math.cos(details.angle), mod = radius / details.distance * 2;

    for (let word of details.origins) {
      if (word.fontSize * mod < 55.59) {
        return;
      }
    }

    scaleThumb.x = this._math.xFromAng(details.x, radius, -details.angle) - 5, scaleThumb.y = this._math.yFromAng(details.y, radius, -details.angle) - 5;

    details.targets.forEach((word, index) => {
      word.startX = (details.origins[index].startX - details.x) * mod + details.x;
      word.startY = (details.origins[index].startY - details.y) * mod + details.y;
      word.focusX = details.origins[index].focusX * mod;
      word.focusY = details.origins[index].focusY * mod;
      word.endX = details.origins[index].endX * mod;
      word.endY = details.origins[index].endY * mod;
      word.fontSize = details.origins[index].fontSize * mod;
    });
  }

  getMedium(words: wordObject[]): { x: number, y: number } {
    let x = 0, y = 0;
    for (let word of words) {
      x += word.startX * 3 + word.focusX + word.endX;
      y += word.startY * 3 + word.focusY + word.endY;
    }

    return  {
      x: x / words.length / 3,
      y: y / words.length / 3
    }
  }
}