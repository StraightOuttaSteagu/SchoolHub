import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { elementModel, tableElements } from '../data';
import { activeCompound } from './models';
import { ChemistryCalculationsService } from './calculations.service';
import { executeCommand, getMass } from './reactions';
import { PopoverController } from '@ionic/angular';
import { ChemistryPopoverComponent } from './chemistry-popover/chemistry-popover.component';

@Component({
  selector: 'app-chemistry-play',
  templateUrl: './chemistry-play.component.html',
  styleUrls: ['./chemistry-play.component.scss'],
  animations: [
    trigger(
      'tableAnimation',
      [
        state(
          'true',
          style({
            top: '0'
          })
        ),
        state(
          'false',
          style({
            top: '100vh'
          })
        ),
        transition('true <=> false', [animate('200ms ease-in-out')]),
      ]
    )
  ]
})
export class ChemistryPlayComponent {

  private _pt!: SVGPoint;

  private _action: 'move' | null = null;

  private _actionDetails: any = null;

  compounds: activeCompound[] = [];

  tableOpen: boolean = false;

  spawn: string[] = [];

  tableElements: elementModel[] = tableElements;

  elementSize: number = 4.5;

  constructor (private _calculations: ChemistryCalculationsService, private _popoverController: PopoverController) { }

  ngOnInit(): void {
    this._pt = (document.getElementById('play') as unknown as SVGSVGElement).createSVGPoint();
  }

  addElement(element: elementModel): void {
    this.spawn.push(element.symbol);
  }

  spawnElementMouseDown(index: number, e: any): void {

    this.updatePt(e);

    let eventX = this._pt.x, eventY = this._pt.y;

    this._action = 'move';
    this._actionDetails = {
      target: this.compounds.length,
      x: eventX,
      y: eventY,
      origin: [eventX, eventY]
    }

    this.compounds.push({
      formula: this.spawn[index],
      x: eventX,
      y: eventY
    });

    this.spawn.splice(index, 1);
  }

  playMouseMove(e: any): void {
    if (this._action) {
      this.updatePt(e);
      let eventX = this._pt.x, eventY = this._pt.y;
      switch(this._action) {
        case 'move':
          this._calculations.updateMove(this.compounds[this._actionDetails.target], eventX, eventY, this._actionDetails);
      }
    }
  }

  playMouseUp(): void {
    if (this._action === 'move') {
      this._action = null;
      for (let i = 0; i < this.compounds.length; i++) {
        if (this._actionDetails.target != i && this.overlapBoxes(i, this._actionDetails.target)) {
          const result = executeCommand(this.compounds[i].formula + ' + ' + this.compounds[this._actionDetails.target].formula) ?? [];

          if (!result.length) return;

          for (let j = 0; j < result.length; j++) {
            this.compounds.push({
              formula: result[j],
              x: this.compounds[this._actionDetails.target].x,
              y: this.compounds[this._actionDetails.target].y + (64 * j)
            });
          }
          this.compounds[this._actionDetails.target].formula = result[0];
          this.compounds.splice(this._actionDetails.target, 1);
          this.compounds.splice(i, 1);
        }
      }
    }
  }

  overlapBoxes(c1: number, c2: number): boolean {
    const compoundContainer = document.getElementById('compoundContainer');

    const rect1 = compoundContainer?.children[c1].getBoundingClientRect()!;
    const rect2 = compoundContainer?.children[c2].getBoundingClientRect()!;

    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
  }
 
  compoundMouseDown(e: any, i: number) {

    this.updatePt(e);

    let eventX = this._pt.x, eventY = this._pt.y;

    this._action = 'move';
    
    this._actionDetails = {
      target: i,
      x: eventX,
      y: eventY,
      origin: [eventX, eventY]
    }
  }

  updatePt(e: any): any {
    this._pt.x = e.clientX; this._pt.y = e.clientY;
    this._pt = this._pt.matrixTransform((document.getElementById('play') as any).getScreenCTM().inverse());  
	}

  isNumber(char: string): boolean {
    return !isNaN(parseInt(char));
  }

  toArray(formula: string): string[] {
    return formula.split('');
  }

  async displayPopover(e: any, i: number): Promise<void> {

    this.updatePt(e);

    let eventX = this._pt.x, eventY = this._pt.y;

    if (this._actionDetails.origin && this.pyth(eventX, eventY, this._actionDetails.origin[0], this._actionDetails.origin[1]) > 10) return;
    
    const popover = await this._popoverController.create({
      component: ChemistryPopoverComponent,
      event: e,
      componentProps: {
        data: {
          formula: this.compounds[i].formula,
          mass: Math.round(getMass(this.compounds[i].formula) * 100) / 100,
          elements: this.compounds[i].formula.replace(')', '').replace('(', '').replace(/\d+/g, '').split(/(?=[A-Z])/)
        },
        'show-backdrop': false
      }
    });

    await popover.present();
  }

  pyth(x1: number, y1: number, x2: number, y2: number){
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  }
}
