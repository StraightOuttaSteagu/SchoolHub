import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { elementModel, tableElements, compoundModel } from '../data';

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

  private _action: 'move' | null = null;

  private _actionDetails: any = null;

  compounds: compoundModel[] = [];

  tableOpen: boolean = false;

  spawn: string[] = [];

  tableElements: elementModel[] = tableElements;

  elementSize: number = 4.5;

  addElement(element: elementModel): void {
    this.spawn.push(element.symbol);
  }

  spawnElementMouseDown(index: number): void {
    this._action = 'move';
    this.spawn.splice(index, 1);

    this.compounds.push({});
  }
}
