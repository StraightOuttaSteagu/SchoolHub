import { Injectable } from '@angular/core';
import { activeCompound } from './models';

@Injectable({
  providedIn: 'root'
})
export class ChemistryCalculationsService {
  updateMove(compound: activeCompound, eventX: number, eventY: number, details: { x: number, y: number}): void {
    compound.x += eventX - details.x;
    compound.y += eventY - details.y;

    details.x = eventX, details.y = eventY;
  }
}