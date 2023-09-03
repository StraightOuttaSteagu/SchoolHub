import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MathService {
  pyth(x1: number, y1: number, x2: number, y2: number){
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  }
  
  angFromPoint(originX: number, originY: number, pointX: number, pointY: number){
    let ang = Math.asin((originY - pointY) / this.pyth(originX, originY, pointX, pointY));
    if (pointY <= originY && pointX <= originX){
      return Math.PI - ang;
    } else if (pointY >= originY && pointX <= originX){
      return -Math.PI - ang;
    }
    return ang;
  }
  
  xFromAng(origin: number, radius: number, angle: number){
    let r = radius * Math.cos(angle) + origin;
    return isNaN(r)?origin:r;
  }
  
  yFromAng(origin: number, radius: number, angle: number){
    let r = radius * Math.sin(angle) + origin;
    return isNaN(r)?origin:r;
  }
  
  contained(x: number, y: number, lx: number, ly: number, w: number, h: number){
    return x >= lx && x <= lx + w && y >= ly && y <= ly + h;
  }
}