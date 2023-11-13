import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { divalentElements, tableElements } from './data';
import { activeCompound, elementModel } from './models';
import { ChemistryCalculationsService } from './calculations.service';
import { Reaction } from './reactions';
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

  PI: number = Math.PI;

  velocity: number = 200;

  private _pt!: SVGPoint;

  private _action: 'move' | null = null;

  private _actionDetails: any = null;

  private _reaction: Reaction = new Reaction();

  compounds: activeCompound[] = [];

  tableOpen: boolean = false;

  spawn: string[] = [];

  tableElements: elementModel[] = tableElements;

  shells: number[] = [1];

  activeElement: elementModel = tableElements.find(el => el.symbol === 'H')!;

  elementSize: number = 4.5;

  themes: any = {
    'Alkali metals': '#ecbe59',
    'Alkaline earth metals': '#dee955',
    'Lanthanides': '#ec77a3',
    'Actinides': '#c686cc',
    'Transition metals': '#fd8572',
    'Post-transition metals': '#4cddf3',
    'Other nonmetals': '#52ee61',
    'Noble gases': '#759fff',
    'Metalloids': '#3aefb6'
  };

  constructor (private _calculations: ChemistryCalculationsService, private _popoverController: PopoverController) { }

  ngOnInit(): void {
    this._pt = (document.getElementById('play') as unknown as SVGSVGElement).createSVGPoint();
  }

  addElement(element: elementModel): void {
    this.spawn.push(divalentElements.includes(element.symbol) ? element.symbol + '2' : element.symbol);
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
          const result = this._reaction.executeCommand(this.compounds[i].formula + ' + ' + this.compounds[this._actionDetails.target].formula)[0] ?? [];

          if (!result.length) return;

          console.log(result, 1)

          const previousOrigin = [this.compounds[this._actionDetails.target].x, this.compounds[this._actionDetails.target].y];

          if (i > this._actionDetails.target) {
            this.compounds.splice(this._actionDetails.target, 1);
            this.compounds.splice(i - 1, 1);
          } else {
            this.compounds.splice(this._actionDetails.target, 1);
            this.compounds.splice(i, 1);
          }


          for (let j = 0; j < result.length; j++) {
            console.log(result[j], j);
            this.compounds.push({
              formula: result[j],
              x: previousOrigin[0],
              y: previousOrigin[1] + (64 * j)
            });
          }

          return;
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
          mass: Math.round(this._reaction.getMass(this.compounds[i].formula) * 100) / 100,
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

  getRange(length: number): number[] {
    return Array.from({ length }, (_, i) => i);
  }

  selectActiveElement(element: elementModel) {
    this.activeElement = element;
    this.shells = [];

    const shellValues = [2, 8, 8, 18, 18, 32, 32];

    for (let remaining = this.activeElement.Z, i = 0; remaining; i++) {
      if (shellValues[i] <= remaining) {
        this.shells.push(shellValues[i]);
        remaining -= shellValues[i];
      } else {
        if (remaining) {
          this.shells.push(remaining);
          break;
        }
      }
    }
    this.shells.reverse();
  }
}
